import produce from 'immer';

import { settings } from 'settings';
import { Flight } from 'types';

interface FlightFilter {
  timestamp: number,
  location: string,
};

export const calculateValidFlights = (
  currFlightPath: Flight[],
  nextActiveFlightIndex: number,
  setValidFlights: (flights?: Flight[]) => void,
  flights?: Flight[],
): void => {
  let start, end;
  // There should be 3 possibilities
  if (nextActiveFlightIndex === -1) {
    // 1.) No need to filter (when activeFlight is cleared and flightPath is empty)
    if (!currFlightPath.length) {
      setValidFlights(flights);
      return;
    }
    // 2.) No start (when activeFlight is cleared but flightPath has values)
    end = {
      timestamp: currFlightPath[0].departureTime,
      location: currFlightPath[0].origin,
    };
  }
  // 3.) No end (when activeFlight is the last item in the flightPath)
  if (nextActiveFlightIndex === currFlightPath.length - 1) {
    start = {
      timestamp: currFlightPath[nextActiveFlightIndex].arrivalTime,
      location: currFlightPath[nextActiveFlightIndex].destination,
    };
  }
  setValidFlights(_filterFlights(flights, start, end));
};

export const checkEarlierFlightsAvailable = (
  startingFlight: Flight,
  flights?: Flight[],
): boolean => {
  if (flights) {
    const { departureTime: timestamp, origin: location } = startingFlight;
    return !!(_filterFlights(flights, undefined, { timestamp, location}).length);
  }

  return false;
};

const _filterFlights = (
  flights?: Flight[],
  start?: FlightFilter,
  end?: FlightFilter,
): Flight[] => {
  if (flights) {
    return produce<Flight[]>(flights, draft => {
      if (start) {
        return draft.filter(x =>
            x.origin === start.location &&
            x.departureTime > (start.timestamp + settings.REQUIRED_DOWNTIME_IN_SECS),
        );
      } else if (end) {
        return draft.filter(x =>
          x.destination === end.location &&
          (x.arrivalTime + settings.REQUIRED_DOWNTIME_IN_SECS) < end.timestamp,
        );
      }
    });
  }

  return [];
};
