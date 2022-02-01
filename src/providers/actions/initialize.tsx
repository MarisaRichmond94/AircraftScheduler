import aircrafts from 'api/aircrafts.json';
import flights from 'api/flights.json';
import { AirCraft, Flight } from 'types';
import { cleanFlightData } from 'utils/cleanFlightData';

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
  const cleanedFlights = cleanFlightData(flights);
  setFlights(cleanedFlights);
  setValidFlights(cleanedFlights);
};
