import AircraftsApi from 'api/aircrafts';
import FlightsApi from 'api/flights';
import { AirCraft, AirCraftData, Flight } from 'types';
import { settings } from 'settings';

export const initializeAircraftData = async (
  setAircrafts: (aircrafts: AirCraft[]) => void,
  setActiveAircraft: (aircraft: AirCraft) => void,
  setAircraftDataMap: (aircraftDataMap: Record<string, AirCraftData>) => void,
) => {
  const aircrafts = await AircraftsApi.get();
  setAircrafts(aircrafts);
  // default active aircraft to the first aircraft in the list
  if (aircrafts?.length >= 1) setActiveAircraft(aircrafts[0]);
  setAircraftDataMap(_initializeAircraftDataMap(aircrafts));
};

export const initializeFlightData = async (
  setFlights: (flights: Flight[]) => void,
  setValidFlights: (flights: Flight[]) => void,
) => {
  const flightData = await FlightsApi.get();
  const cleanedFlights = _cleanFlightData(flightData);
  setFlights(cleanedFlights);
  setValidFlights(cleanedFlights);
};

// Populates a map with the default data for each aircraft in the given list of aircrafts
const _initializeAircraftDataMap = (aircrafts: AirCraft[]): Record<string, AirCraftData> => {
  const updatedAircraftDataMap = {} as Record<string, AirCraftData>;
  for (let index = 0; index < aircrafts.length; index++) {
    const aircraft = aircrafts[index];
    updatedAircraftDataMap[aircraft.ident] = { flightPath: [], aircraftUsage: 0 };
  }
  return updatedAircraftDataMap;
}

/*
  Cleans any bad data from the given list of flights--any flights violating the midnight
  grounding requirements
*/
const _cleanFlightData = (flightData: Flight[]): Flight[] => {
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
const _sortFlights = (flightA: Flight, flightB: Flight): number => {
  if (flightA.departureTime < flightB.departureTime) return -1;
  if (flightB.departureTime < flightA.departureTime) return 1;
  return 0;
};
