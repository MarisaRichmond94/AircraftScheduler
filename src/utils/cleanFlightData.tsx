import { settings } from 'settings';
import { Flight } from 'types';
import { sortFlights } from 'utils/sortFlights';

/*
  Cleans any bad data from the given list of flights--any flights violating the midnight
  grounding requirements
*/
export const cleanFlightData = (flightData: Flight[]): Flight[] => {
  const sortedFlights = flightData.sort((a: Flight, b: Flight) => sortFlights(a, b));
  return sortedFlights.filter(
    (x: Flight) => (
      !settings.MIDNIGHT_TIMESTAMPS.includes(x.departureTime) &&
      !settings.MIDNIGHT_TIMESTAMPS.includes(x.arrivalTime)
    ),
  );
};
