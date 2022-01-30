import { AirCraft, AirCraftData, Flight } from 'types';
import { settings } from 'settings';

// populates the aircraft data map with default values for each aircraft
export const initializeAircraftDataMap = (aircraftData: AirCraft[]): Record<string, AirCraftData> => {
  const updatedAircraftDataMap = {} as Record<string, AirCraftData>;
  for (let index = 0; index < aircraftData.length; index++) {
    const aircraft = aircraftData[index];
    updatedAircraftDataMap[aircraft.ident] = { flightPath: [], aircraftUsage: 0 };
  }
  return updatedAircraftDataMap;
}

export const cleanFlightData = (flightData: Flight[]): Flight[] => {
  const sortedFlights = flightData.sort((a: Flight, b: Flight) => _sortFlights(a, b));
  return sortedFlights.filter(
    (x: Flight) => (
      !settings.MIDNIGHT_TIMESTAMPS.includes(x.departureTime) &&
      !settings.MIDNIGHT_TIMESTAMPS.includes(x.arrivalTime)
    ),
  );
};

const _sortFlights = (flightA: Flight, flightB: Flight): number => {
  if (flightA.departureTime < flightB.departureTime) return -1;
  if (flightB.departureTime < flightA.departureTime) return 1;
  return 0;
};
