import aircrafts from 'api/aircrafts.json';
import flights from 'api/flights.json';
import { AirCraft, Flight } from 'types';
import { settings } from 'settings';

export const initializeAircrafts = (
  setAircrafts: (aircrafts: AirCraft[]) => void,
  setActiveAircraft: (aircraft: AirCraft) => void,
) => {
  setAircrafts(aircrafts);
  // default active aircraft to the first aircraft in the list
  if (aircrafts?.length >= 1) setActiveAircraft(aircrafts[0]);
};

export const initializeFlights = (
  setFlights: (flights: Flight[]) => void,
  setValidFlights: (flights: Flight[]) => void,
) => {
  const cleanedFlights = _cleanFlightData(flights);
  setFlights(cleanedFlights);
  setValidFlights(cleanedFlights);
};

/*
  Cleans any bad data from the given list of flights--any flights violating the midnight
  grounding requirements
*/
export const _cleanFlightData = (flightData: Flight[]): Flight[] => {
  const sortedFlights = flightData.sort((a: Flight, b: Flight) => _sortFlights(a, b));
  return sortedFlights.filter(
    (x: Flight) => (
      !settings.MIDNIGHT_TIMESTAMPS.includes(x.departureTime) &&
      !settings.MIDNIGHT_TIMESTAMPS.includes(x.arrivalTime)
    ),
  );
};

/*
  sorts flights by departure time to make it easier for the user to pick the earliest flight to
  ideally optimize their schedule
*/
export const _sortFlights = (flightA: Flight, flightB: Flight): number => {
  if (flightA.departureTime < flightB.departureTime) return -1;
  if (flightB.departureTime < flightA.departureTime) return 1;
  return 0;
};
