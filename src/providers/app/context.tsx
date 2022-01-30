import { createContext } from 'react';

import { AirCraft, Flight, UpdateFlightPathTypes } from 'types';

interface AppContextType {
  activeAircraft?: AirCraft,
  activeFlight?: Flight,
  aircrafts?: AirCraft[],
  aircraftUsage: number,
  earlierFlightsAvailable: boolean,
  flightPath: Flight[],
  validFlights?: Flight[],
  setActiveFlight: (flight?: Flight) => void,
  updateFlightPath: (flight: Flight, type: UpdateFlightPathTypes) => void,
}

const AppContext = createContext<undefined | AppContextType>(undefined);

export default AppContext;
