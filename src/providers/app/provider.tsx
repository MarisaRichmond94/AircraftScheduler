import { useCallback, useEffect, useState } from 'react';

import { usePrevious } from 'hooks/usePrevious';
import {
  addToFlightPath, removeFromFlightPath, updateFlightPathData,
  calculateValidFlights,
  initializeAircraftData, initializeFlightData,
  loadAirCraftData, storeAirCraftData,
} from 'providers/actions';
import AppContext from 'providers/app/context';
import { AirCraft, AirCraftData, Flight, UpdateFlightPathTypes } from 'types';

const AppProvider = (props: object) => {
  // back-end state (should not be mutated because it is the source of truth)
  const [aircrafts, setAircrafts] = useState<undefined | AirCraft[]>();
  const [flights, setFlights] = useState<undefined | Flight[]>();
  // front-end state (can be mutated using the back-end source of truth state above)
  const [activeAircraft, setActiveAircraft] = useState<undefined | AirCraft>();
  const [aircraftDataMap, setAircraftDataMap] = (
    useState<Record<string, AirCraftData>>({})
  );
  const [activeFlight, setActiveFlight] = useState<undefined | Flight>();
  const [aircraftUsage, setAircraftUsage] = useState(0);
  const [earlierFlightsAvailable, setEarlierFlightsAvailable] = useState(false);
  const [flightPath, setFlightPath] = useState<Flight[]>([]);
  const [validFlights, setValidFlights] = useState<undefined | Flight[]>();
  const prevActiveFlightId = usePrevious(activeFlight?.ident);

  useEffect(() => {
    async function initialize() {
      await initializeAircraftData(setAircrafts, setActiveAircraft, setAircraftDataMap);
      await initializeFlightData(setFlights, setValidFlights);
    }
    initialize();
  }, []);

  /*
    any time the flight path is changed, we need to either a.) reset the flight path data if the
    updated flight path is empty or b.) update the data being calculated using the flight path,
    such as the total aircraft usage and whether or not earlier flights are available
  */
  useEffect(() => {
    flights && flightPath.length
      ? updateFlightPathData(flightPath, flights, setEarlierFlightsAvailable, setAircraftUsage)
      : _resetFlightPath();
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

  const updateFlightPath = useCallback((flight: Flight, type: UpdateFlightPathTypes): void => {
    switch (type) {
      case UpdateFlightPathTypes.add:
        addToFlightPath(flightPath, flight, setActiveFlight, setFlightPath, activeFlight);
        break;
      case UpdateFlightPathTypes.remove:
      default:
        removeFromFlightPath(flight.ident, flightPath, setActiveFlight, setFlightPath, activeFlight);
        break;
    }
  }, [activeFlight, flightPath]);

  const _resetActiveAircraftData = useCallback(() => {
    setFlightPath([]);
    setActiveFlight(undefined);
    setAircraftUsage(0);
    setEarlierFlightsAvailable(false);
    setValidFlights(flights);
  }, [flights]);

  const _resetFlightPath = (): void => {
    setEarlierFlightsAvailable(false);
    setAircraftUsage(0);
  };

  const updateActiveAircraft = useCallback((nextActiveAircraft: AirCraft) => {
    if (activeAircraft) {
      // Store flight path and aircraft usage for the current active aircraft
      const updatedAircraftDataMap = storeAirCraftData(
        aircraftDataMap, activeAircraft, flightPath, aircraftUsage, setAircraftDataMap,
      );
      /* If there is already existing data for the next aircraft in the map, use that data;
      Otherwise, reset state related to the active aircraft to the default settings. */
      nextActiveAircraft && updatedAircraftDataMap[nextActiveAircraft.ident]
        ? loadAirCraftData(
          updatedAircraftDataMap[nextActiveAircraft.ident],
          setAircraftUsage, setActiveFlight, setFlightPath,
          recalculateValidFlights,
        )
        : _resetActiveAircraftData();
    }
    setActiveAircraft(nextActiveAircraft);
  }, [
    activeAircraft, aircraftDataMap, aircraftUsage, flightPath, // variable dependencies
    recalculateValidFlights, _resetActiveAircraftData, // function dependencies
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
    setActiveFlight,
    updateActiveAircraft,
    updateFlightPath,
  };

  return <AppContext.Provider value={value} {...props} />;
};

export default AppProvider;
