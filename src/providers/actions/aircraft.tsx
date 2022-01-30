import produce from 'immer';

import { AirCraft, AirCraftData, Flight } from 'types';

export const storeAirCraftData = (
  aircraftDataMap: Record<string, AirCraftData>,
  activeAircraft: AirCraft,
  flightPath: Flight[],
  aircraftUsage: number,
  setAircraftDataMap: (aircraftDataMap: Record<string, AirCraftData>) => void,
): Record<string, AirCraftData> => {
  const updatedAircraftDataMap = produce<Record<string, AirCraftData>>(
    aircraftDataMap, draft => {
      draft[activeAircraft.ident] = { flightPath, aircraftUsage };
    }
  );
  setAircraftDataMap(updatedAircraftDataMap);

  return updatedAircraftDataMap;
};

export const loadAirCraftData = (
  airCraftData: AirCraftData,
  setAircraftUsage: (aircraftUsage: number) => void,
  setActiveFlight: (activeFlight: Flight) => void,
  setFlightPath: (flightPath: Flight[]) => void,
  recalculateValidFlights: (flightPath: Flight[], nextActiveFlightIndex: number) => void,
): void => {
  const { flightPath, aircraftUsage } = airCraftData;
  setFlightPath(flightPath);
  const nextActiveFlightIndex = flightPath.length - 1;
  setActiveFlight(flightPath[nextActiveFlightIndex]);
  setAircraftUsage(aircraftUsage);
  recalculateValidFlights(flightPath, nextActiveFlightIndex);
};
