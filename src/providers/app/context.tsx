import { createContext } from 'react';

import { AirCraft, AirCraftData, Flight, UpdateFlightPathTypes } from 'types';

interface AppContextType {
  activeAircraft?: AirCraft,
  activeFlight?: Flight,
  aircrafts?: AirCraft[],
  aircraftDataMap: Record<string, AirCraftData>,
  aircraftUsage: number,
  earlierFlightsAvailable: boolean,
  flightPath: Flight[],
  validFlights?: Flight[],
  setActiveFlight: (flight?: Flight) => void,
  updateActiveAircraft: (aircraft: AirCraft) => void,
  updateFlightPath: (flight: Flight, type: UpdateFlightPathTypes) => void,
}

const AppContext = createContext<undefined | AppContextType>(undefined);

export default AppContext;
