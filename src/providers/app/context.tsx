import { createContext } from 'react';

import { AirCraft, Flight } from 'types';

interface AppContextType {
  activeAircraft?: AirCraft,
  activeFlight?: Flight,
  aircrafts?: AirCraft[],
  flightPath: Flight[],
  validFlights?: Flight[],
  addToFlightPath: (flight: Flight) => void,
  removeFromFlightPath: (flightId: string) => void,
  setActiveFlight: (flight: Flight) => void,
}

const AppContext = createContext<undefined | AppContextType>(undefined);

export default AppContext;
