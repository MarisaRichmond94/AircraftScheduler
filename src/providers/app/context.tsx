import { createContext } from 'react';

import { AirCraft, AirCraftData, Flight } from 'types';

interface AppContextType {
  activeAircraft?: AirCraft,
  activeFlight?: Flight,
  aircrafts?: AirCraft[],
  aircraftDataMap: Record<string, AirCraftData>,
  aircraftUsage: number,
  earlierFlightsAvailable: boolean,
  flightPath: Flight[],
  validFlights?: Flight[],
  addToFlightPath: (flight: Flight) => void,
  removeFromFlightPath: (flightId: string) => void,
  setActiveFlight: (flight?: Flight) => void,
  updateActiveAircraft: (aircraft: AirCraft) => void,
}

const AppContext = createContext<undefined | AppContextType>(undefined);

export default AppContext;
