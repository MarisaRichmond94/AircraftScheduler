import { Flight } from 'types';

/*
  sorts flights by departure time to make it easier for the user to pick the earliest flight to
  ideally optimize their schedule
*/
export const sortFlights = (flightA: Flight, flightB: Flight): number => {
  if (flightA.departureTime < flightB.departureTime) return -1;
  if (flightB.departureTime < flightA.departureTime) return 1;
  return 0;
};
