import flights from 'api/flights.json';
import * as module from 'providers/actions/flights';
import { Flight } from 'types';
import * as utils from 'utils/filterFlights';

describe('flight actions', () => {
  describe('calculateValidFlights', () => {
    it('resets valid flights to full list of flights when the flight path is empty', () => {
      const flightPath = [] as Flight[];
      const nextActiveFlightIndex = -1;
      const setValidFlights = jest.fn();
      module.calculateValidFlights(flightPath, nextActiveFlightIndex, setValidFlights, flights);
      expect(setValidFlights).toHaveBeenCalledWith(flights);
    });

    it('calls filter flights with end time when no active flight but flight path exists', () => {
      const expectedValidFlights = [] as Flight[];
      const spy = jest.spyOn(utils, 'filterFlights').mockImplementation(() => expectedValidFlights);
      try{
        const flightPath = [
          {
            arrivalTime: 23400,
            departureTime: 18600,
            destination: 'LIPZ',
            ident: 'AS1327',
            origin: 'LSGG',
            readableArrival: '06:30',
            readableDeparture: '05:10',
          },
          {
            arrivalTime: 30300,
            departureTime: 25500,
            destination: 'LSGG',
            ident: 'AS1328',
            origin: 'LIPZ',
            readableArrival: '08:25',
            readableDeparture: '07:05',
          }
        ];
        const expectedEnd = { 'location': 'LSGG', 'timestamp': 18600 };
        const nextActiveFlightIndex = -1;
        const setValidFlights = jest.fn();
        module.calculateValidFlights(flightPath, nextActiveFlightIndex, setValidFlights, flights);
        expect(spy).toHaveBeenCalledWith(flights, undefined, expectedEnd);
        expect(setValidFlights).toHaveBeenCalledWith(expectedValidFlights);
      } finally {
        spy.mockRestore();
      }
    });

    it('calls filter flights with start time when active flight is found', () => {
      const expectedValidFlights = [] as Flight[];
      const spy = jest.spyOn(utils, 'filterFlights').mockImplementation(() => expectedValidFlights);
      try{
        const flightPath = [
          {
            arrivalTime: 23400,
            departureTime: 18600,
            destination: 'LIPZ',
            ident: 'AS1327',
            origin: 'LSGG',
            readableArrival: '06:30',
            readableDeparture: '05:10',
          },
          {
            arrivalTime: 30300,
            departureTime: 25500,
            destination: 'LSGG',
            ident: 'AS1328',
            origin: 'LIPZ',
            readableArrival: '08:25',
            readableDeparture: '07:05',
          }
        ];
        const expectedStart = { 'location': 'LSGG', 'timestamp': 30300 };
        const nextActiveFlightIndex = 1;
        const setValidFlights = jest.fn();
        module.calculateValidFlights(flightPath, nextActiveFlightIndex, setValidFlights, flights);
        expect(spy).toHaveBeenCalledWith(flights, expectedStart, undefined);
        expect(setValidFlights).toHaveBeenCalledWith(expectedValidFlights);
      } finally {
        spy.mockRestore();
      }
    });
  });

  describe('checkEarlierFlightsAvailable', () => {
    it('returns false if given no flights', () => {
      const flightsGiven = [] as Flight[];
      const actual = module.checkEarlierFlightsAvailable(flights[0], flightsGiven);
      expect(actual).toBeFalsy();
    });

    it('returns false if filter returns empty array', () => {
      const expectedRes = [] as Flight[];
      const spy = jest.spyOn(utils, 'filterFlights').mockImplementation(() => expectedRes);
      try {
        const startFlight = flights[0];
        const actual = module.checkEarlierFlightsAvailable(startFlight, flights);
        expect(spy).toHaveBeenCalledWith(
          flights, undefined, { timestamp: startFlight.departureTime, location: startFlight.origin }
        )
        expect(actual).toBeFalsy();
      } finally {
        spy.mockRestore();
      }
    });

    it('returns true if filter returns array with length', () => {
      const expectedRes = flights;
      const spy = jest.spyOn(utils, 'filterFlights').mockImplementation(() => expectedRes);
      try {
        const startFlight = flights[0];
        const actual = module.checkEarlierFlightsAvailable(startFlight, flights);
        expect(spy).toHaveBeenCalledWith(
          flights, undefined, { timestamp: startFlight.departureTime, location: startFlight.origin }
        )
        expect(actual).toBeTruthy();
      } finally {
        spy.mockRestore();
      }
    });
  });
});
