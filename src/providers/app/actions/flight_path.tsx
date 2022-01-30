import produce from 'immer';

import { Flight } from 'types';

export const addToFlightPath = (
  flightPath: Flight[],
  nextFlight: Flight,
  setActiveFlight: (activeFlight: Flight) => void,
  setFlightPath: (flightPath: Flight[]) => void,
  activeFlight?: Flight,
): void => {
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
