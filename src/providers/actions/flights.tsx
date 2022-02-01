import { Flight } from 'types';
import { filterFlights } from 'utils/filterFlights';

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
  setValidFlights(filterFlights(flights, start, end));
};

export const checkEarlierFlightsAvailable = (
  startingFlight: Flight,
  flights?: Flight[],
): boolean => {
  if (flights) {
    const { departureTime: timestamp, origin: location } = startingFlight;
    return !!(filterFlights(flights, undefined, { timestamp, location}).length);
  }

  return false;
};
