export interface AirCraft {
  base: string,
  economySeats: number,
  ident: string,
  type: string,
};

export interface Flight {
  arrivalTime: number,
  departureTime: number,
  destination: string,
  ident: string,
  origin: string,
  readableArrival: string,
  readableDeparture: string,
};

export interface AirCraftData {
  flightPath: Flight[],
  aircraftUsage: number,
};

export enum UpdateFlightPathTypes {
  add = 'add',
  remove = 'remove',
};
