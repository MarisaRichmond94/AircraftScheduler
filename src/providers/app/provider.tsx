import produce from 'immer';
import { useCallback, useEffect, useState } from 'react';

import AircraftsApi from 'api/aircrafts';
import FlightsApi from 'api/flights';
import { usePrevious } from 'hooks/usePrevious';
import {
  calculateValidFlights,
  checkAircraftUsage,
  checkEarlierFlightsAvailable,
  cleanFlightData,
  initializeAircraftDataMap,
} from 'providers/app/actions';
import AppContext from 'providers/app/context';
import { AirCraft, AirCraftData, Flight } from 'types';

const AppProvider = (props: object) => {
  // back-end state (should not be mutated because it is the source of truth)
  const [aircrafts, setAircrafts] = useState<undefined | AirCraft[]>();
  const [flights, setFlights] = useState<undefined | Flight[]>();
  // front-end state (can be mutated using the back-end source of truth state above)
  const [activeAircraft, setActiveAircraft] = useState<undefined | AirCraft>();
  const [aircraftDataMap, setAircraftDataMap] = (
    useState<Record<string, AirCraftData>>({})
  );
  // state that should be updated/reset on active aircraft mutation
  const [activeFlight, setActiveFlight] = useState<undefined | Flight>();
  const [aircraftUsage, setAircraftUsage] = useState(0);
  const [earlierFlightsAvailable, setEarlierFlightsAvailable] = useState(false);
  const [flightPath, setFlightPath] = useState<Flight[]>([]);
  const [validFlights, setValidFlights] = useState<undefined | Flight[]>();
  // derived variables
  const prevActiveFlightId = usePrevious(activeFlight?.ident);

  // on mount useEffect populates back-end source of truth data
  useEffect(() => {
    async function populateInitialData() {
      const aircraftData = await AircraftsApi.get();
      setAircrafts(aircraftData);
      if (aircraftData?.length >= 1) setActiveAircraft(aircraftData[0]);
      setAircraftDataMap(initializeAircraftDataMap(aircraftData));
      const flightData = await FlightsApi.get();
      const cleanedFlights = cleanFlightData(flightData);
      setFlights(cleanedFlights);
      setValidFlights(cleanedFlights);
    }
    populateInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // any time the flight path is changed, we need to check if earlier flights are available
  // and recalculate the usage percentage
  useEffect(() => {
    if (flightPath.length) {
      const updatedEarlierFlightsAvail = checkEarlierFlightsAvailable(flightPath[0], flights);
      setEarlierFlightsAvailable(updatedEarlierFlightsAvail);
      const updatedAircraftUsage = checkAircraftUsage(flightPath);
      setAircraftUsage(updatedAircraftUsage);
    } else {
      setEarlierFlightsAvailable(false);
      setAircraftUsage(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flightPath]);

  const recalculateValidFlights = useCallback(
    (currFlightPath: Flight[], nextActiveFlightIndex: number): void => {
      calculateValidFlights(currFlightPath, nextActiveFlightIndex, setValidFlights, flights);
    },
    [flights],
  );

  // recalculates valid flights when active flight changes
  useEffect(() => {
    if (activeFlight?.ident !== prevActiveFlightId) {
      let activeFlightIndex = -1;
      if (flightPath && activeFlight) {
        activeFlightIndex = flightPath.findIndex(entry => entry.ident === activeFlight.ident);
      }
      recalculateValidFlights(flightPath, activeFlightIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFlight, prevActiveFlightId]);

  const addToFlightPath = useCallback((nextFlight: Flight): void => {
    const position = activeFlight
      ? flightPath.findIndex(x => x.ident === activeFlight.ident) + 1
      : 0;
    if (position !== -1) {
      const updatedFlightPath = produce<Flight[]>(flightPath, draft => {
        draft.splice(position, 0, nextFlight);
      });
      setFlightPath(updatedFlightPath);
      // set active flight to the last flight in the path
      setActiveFlight(updatedFlightPath[updatedFlightPath.length - 1]);
    }
  }, [activeFlight, flightPath]);

  const removeFromFlightPath = useCallback((flightId: string): void => {
    const updatedFlightPath = produce<Flight[]>(flightPath, draft => {
      return draft.filter(flight => flight.ident !== flightId);
    });
    setFlightPath(updatedFlightPath);
    if (activeFlight && activeFlight.ident === flightId) {
      // update the active flight if the deleted flight was the active flight
      const nextActiveFlight = updatedFlightPath.length
        ? updatedFlightPath[updatedFlightPath.length - 1] // set active flight to the last flight
        : undefined; // set active flight to undefined if there are no flights in the path
      setActiveFlight(nextActiveFlight);
    }
  }, [activeFlight, flightPath]);

  const resetActiveAircraftData = useCallback(() => {
    setFlightPath([]);
    setActiveFlight(undefined);
    setAircraftUsage(0);
    setEarlierFlightsAvailable(false);
    setValidFlights(flights);
  }, [flights]);

  const updateActiveAircraft = useCallback((nextActiveAircraft: AirCraft) => {
    if (activeAircraft) {
      const updatedAircraftToFlightPathMap = produce<Record<string, AirCraftData>>(
        aircraftDataMap, draft => {
          draft[activeAircraft.ident] = { flightPath, aircraftUsage };
        }
      );
      setAircraftDataMap(updatedAircraftToFlightPathMap);

      if (nextActiveAircraft && updatedAircraftToFlightPathMap[nextActiveAircraft.ident]) {
        const nextAircraftData = updatedAircraftToFlightPathMap[nextActiveAircraft.ident];
        setFlightPath(nextAircraftData.flightPath);
        const nextActiveFlightIndex = nextAircraftData.flightPath.length - 1;
        setActiveFlight(nextAircraftData.flightPath[nextActiveFlightIndex]);
        setAircraftUsage(nextAircraftData.aircraftUsage);
        recalculateValidFlights(nextAircraftData.flightPath, nextActiveFlightIndex);
      } else {
        resetActiveAircraftData();
      }
      setActiveAircraft(nextActiveAircraft);
    }
  }, [
    activeAircraft, aircraftDataMap, aircraftUsage, flightPath, // variable dependencies
    recalculateValidFlights, resetActiveAircraftData, // function dependencies
  ]);

  const value = {
    activeAircraft,
    activeFlight,
    aircrafts,
    aircraftDataMap,
    aircraftUsage,
    earlierFlightsAvailable,
    flightPath,
    validFlights,
    addToFlightPath,
    removeFromFlightPath,
    setActiveFlight,
    updateActiveAircraft,
  };

  return <AppContext.Provider value={value} {...props} />;
};

export default AppProvider;
