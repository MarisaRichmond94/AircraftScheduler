import produce from 'immer';

import { checkEarlierFlightsAvailable } from 'providers/actions/flights';
import { Flight } from 'types';
import { checkAircraftUsage } from 'utils/checkAircraftUsage';

export const addToFlightPath = (
  flightPath: Flight[],
  nextFlight: Flight,
  setActiveFlight: (activeFlight: Flight) => void,
  setFlightPath: (flightPath: Flight[]) => void,
  activeFlight?: Flight,
): void => {
  const position = activeFlight ? flightPath.findIndex(x => x.ident === activeFlight.ident) : 0;
  if (position !== -1) {
    const updatedFlightPath = activeFlight
      ? produce<Flight[]>(flightPath, draft => { draft.splice(position + 1, 0, nextFlight); })
      : [nextFlight];
    setFlightPath(updatedFlightPath);
    // set active flight to the last flight in the path
    setActiveFlight(updatedFlightPath[updatedFlightPath.length - 1]);
  } else {
    throw Error('activeFlight was not found in flight path');
  }
};

export const removeFromFlightPath = (
  flightId: string,
  flightPath: Flight[],
  setActiveFlight: (activeFlight?: Flight) => void,
  setFlightPath: (flightPath: Flight[]) => void,
  activeFlight?: Flight,
): void => {
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
};

export const updateFlightPathData = (
  flightPath: Flight[],
  flights: Flight[],
  setEarlierFlightsAvailable: (earlierFlightsAvailable: boolean) => void,
  setAircraftUsage: (aircraftUsage: number) => void,
): void => {
  const updatedEarlierFlightsAvail = checkEarlierFlightsAvailable(flightPath[0], flights);
  setEarlierFlightsAvailable(updatedEarlierFlightsAvail);
  const updatedAircraftUsage = checkAircraftUsage(flightPath);
  setAircraftUsage(updatedAircraftUsage);
};
