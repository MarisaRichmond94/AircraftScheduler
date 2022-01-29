import { useCallback, useEffect, useState } from 'react';

import AircraftsApi from 'api/aircrafts';
import FlightsApi from 'api/flights';
import { usePrevious } from 'hooks/usePrevious';
import AppContext from 'providers/app/context';
import { AirCraft, Flight } from 'types';

interface FlightFilter {
  timestamp: number,
  location: string,
};

const AppProvider = (props: object) => {
  const [activeAircraft, setActiveAircraft] = useState<undefined | AirCraft>();
  const [activeFlight, setActiveFlight] = useState<undefined | Flight>();
  const [aircrafts, setAircrafts] = useState<undefined | AirCraft[]>();
  const [flightPath, setFlightPath] = useState<Flight[]>([]);
  const [flights, setFlights] = useState<undefined | Flight[]>();
  const [validFlights, setValidFlights] = useState<undefined | Flight[]>();

  const prevActiveFlightId = usePrevious(activeFlight?.ident);

  const sortFlights = (flightA: Flight, flightB: Flight): number => {
    if (flightA.departureTime < flightB.departureTime) return -1;
    if (flightB.departureTime < flightA.departureTime) return 1;
    return 0;
  };

  // filter flights between one to two timestamp/location combos
  const filterFlightsBetweenTimestamps = (start?: FlightFilter, end?: FlightFilter): void => {

  }

  useEffect(() => {
    async function populateInitialData() {
      const aircraftData = await AircraftsApi.get();
      setAircrafts(aircraftData);
      if (aircraftData?.length >= 1) setActiveAircraft(aircraftData[0]);

      const flightData = await FlightsApi.get();
      const sortedFlights = flightData.sort((a: Flight, b: Flight) => sortFlights(a, b));
      setFlights(sortedFlights);
      setValidFlights(sortedFlights);
    }

    populateInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (activeFlight?.ident !== prevActiveFlightId) {
      const activeFlightIndex = flightPath?.findIndex(entry => entry.ident === activeFlight.ident);
      // @TODO - get data to call filterFlightsBetweenTimestamps
      // There should be four states
      // 1.) No start (when activeFlight is cleared but flightPath has values)
      // 2.) No end (when activeFlight is the last item in the flightPath)
      // 3.) Start and end (when activeFlight is in the middle of the flightPath)
      // 4.) No need to filter (when activeFlight is cleared and flightPath is empty)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFlight, prevActiveFlightId]);

  const addToFlightPath = useCallback((flight: Flight): void => {
    const position = activeFlight ? flightPath.findIndex(x => x.ident === activeFlight.ident) : 0;
    if (position !== -1) {
      const flightPathCopy = [ ...flightPath ];
      flightPathCopy.splice(position, 0, flight);
      setFlightPath(flightPathCopy);
      setActiveFlight(flight);
    }
  }, [activeFlight, flightPath]);

  const removeFromFlightPath = useCallback((flightId: string): void => {
    const flightPathCopy = [ ...flightPath ];
    setFlightPath(flightPathCopy.filter(flight => flight.ident !== flightId));
  }, [flightPath]);

  const value = {
    activeAircraft,
    activeFlight,
    aircrafts,
    flightPath,
    validFlights,
    addToFlightPath,
    removeFromFlightPath,
    setActiveFlight,
  };

  return <AppContext.Provider value={value} {...props} />;
};

export default AppProvider;
