import { useCallback, useEffect, useState } from 'react';

import { usePrevious } from 'hooks/usePrevious';
import {
  addToFlightPath, removeFromFlightPath, updateFlightPathData,
  calculateValidFlights,
  initializeAircrafts, initializeFlights,
} from 'providers/actions';
import AppContext from 'providers/app/context';
import { AirCraft, Flight, UpdateFlightPathTypes } from 'types';

const AppProvider = (props: object) => {
  // back-end state (should not be mutated because it is the source of truth)
  const [aircrafts, setAircrafts] = useState<undefined | AirCraft[]>();
  const [flights, setFlights] = useState<undefined | Flight[]>();
  // front-end state (can be mutated using the back-end source of truth state above)
  const [activeAircraft, setActiveAircraft] = useState<undefined | AirCraft>();
  const [activeFlight, setActiveFlight] = useState<undefined | Flight>();
  const [aircraftUsage, setAircraftUsage] = useState(0);
  const [earlierFlightsAvailable, setEarlierFlightsAvailable] = useState(false);
  const [flightPath, setFlightPath] = useState<Flight[]>([]);
  const [validFlights, setValidFlights] = useState<undefined | Flight[]>();
  const prevActiveFlightId = usePrevious(activeFlight?.ident);

  useEffect(() => {
    async function initialize() {
      initializeAircrafts(setAircrafts, setActiveAircraft);
      initializeFlights(setFlights, setValidFlights);
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

  const _resetFlightPath = (): void => {
    setEarlierFlightsAvailable(false);
    setAircraftUsage(0);
  };

  const value = {
    activeAircraft,
    activeFlight,
    aircrafts,
    aircraftUsage,
    earlierFlightsAvailable,
    flightPath,
    validFlights,
    setActiveFlight,
    updateFlightPath,
  };

  return <AppContext.Provider value={value} {...props} />;
};

export default AppProvider;
