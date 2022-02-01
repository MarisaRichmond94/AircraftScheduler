import flights from 'api/flights.json';
import * as module from 'providers/actions/flight_path';
import { Flight } from 'types';

describe('flight path actions', () => {
  describe('addToFlightPath', () => {
    it('updates a flight path when there is already an active flight', () => {
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
      const nextFlight = {
        arrivalTime: 43500,
        departureTime: 37800,
        destination: 'LIRF',
        ident: 'AS1343',
        origin: 'LSGG',
        readableArrival: '12:05',
        readableDeparture: '10:30',
      };
      const setActiveFlight = jest.fn();
      const setFlightPath = jest.fn();
      module.addToFlightPath(
        flightPath, nextFlight, setActiveFlight, setFlightPath, flightPath[1]
      );
      expect(setFlightPath).toHaveBeenCalledWith([...flightPath, nextFlight]);
      expect(setActiveFlight).toHaveBeenCalledWith(nextFlight);
    });

    it('updates a flight path when there is no active flight', () => {
      const flightPath = [] as Flight[];
      const nextFlight = {
        arrivalTime: 43500,
        departureTime: 37800,
        destination: 'LIRF',
        ident: 'AS1343',
        origin: 'LSGG',
        readableArrival: '12:05',
        readableDeparture: '10:30',
      };
      const setActiveFlight = jest.fn();
      const setFlightPath = jest.fn();
      module.addToFlightPath(
        flightPath, nextFlight, setActiveFlight, setFlightPath, undefined
      );
      expect(setFlightPath).toHaveBeenCalledWith([nextFlight]);
      expect(setActiveFlight).toHaveBeenCalledWith(nextFlight);
    });

    it('throws an error when the active flight is not found in the flight path', () => {
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
      const nextFlight = {
        arrivalTime: 43500,
        departureTime: 37800,
        destination: 'LIRF',
        ident: 'AS1343',
        origin: 'LSGG',
        readableArrival: '12:05',
        readableDeparture: '10:30',
      };
      const setActiveFlight = jest.fn();
      const setFlightPath = jest.fn();
      let errorMessage = '';
      try {
        module.addToFlightPath(
          flightPath, nextFlight, setActiveFlight, setFlightPath, flights[10]
        );
      } catch (exception: any) {
        errorMessage = exception.message;
      }
      expect(errorMessage).toBe('activeFlight was not found in flight path');
    });
  });

  describe('removeFromFlightPath', () => {
    it('updates active flight when the flight being remove from the path was prev active', () => {
      const flightId = 'AS1343';
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
        },
        {
          arrivalTime: 43500,
          departureTime: 37800,
          destination: 'LIRF',
          ident: 'AS1343',
          origin: 'LSGG',
          readableArrival: '12:05',
          readableDeparture: '10:30',
        }
      ];
      const setActiveFlight = jest.fn();
      const setFlightPath = jest.fn();
      const activeFlight = {
        arrivalTime: 43500,
        departureTime: 37800,
        destination: 'LIRF',
        ident: 'AS1343',
        origin: 'LSGG',
        readableArrival: '12:05',
        readableDeparture: '10:30',
      };
      module.removeFromFlightPath(
        flightId, flightPath, setActiveFlight, setFlightPath, activeFlight,
      );
      expect(setFlightPath).toHaveBeenCalledWith(flightPath.filter(x => x.ident !== flightId));
      expect(setActiveFlight).toHaveBeenCalledWith(flightPath[1]);
    });

    it('does not update active flight when the flight being removed was not active flight', () => {
      const flightId = 'AS1327';
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
        },
        {
          arrivalTime: 43500,
          departureTime: 37800,
          destination: 'LIRF',
          ident: 'AS1343',
          origin: 'LSGG',
          readableArrival: '12:05',
          readableDeparture: '10:30',
        }
      ];
      const setActiveFlight = jest.fn();
      const setFlightPath = jest.fn();
      const activeFlight = {
        arrivalTime: 43500,
        departureTime: 37800,
        destination: 'LIRF',
        ident: 'AS1343',
        origin: 'LSGG',
        readableArrival: '12:05',
        readableDeparture: '10:30',
      };
      module.removeFromFlightPath(
        flightId, flightPath, setActiveFlight, setFlightPath, activeFlight,
      );
      expect(setFlightPath).toHaveBeenCalledWith(flightPath.filter(x => x.ident !== flightId));
      expect(setActiveFlight).not.toHaveBeenCalled();
    });

    it('does not update active flight when there is no active flight to begin with', () => {
      const flightId = 'AS1327';
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
        },
        {
          arrivalTime: 43500,
          departureTime: 37800,
          destination: 'LIRF',
          ident: 'AS1343',
          origin: 'LSGG',
          readableArrival: '12:05',
          readableDeparture: '10:30',
        }
      ];
      const setActiveFlight = jest.fn();
      const setFlightPath = jest.fn();
      module.removeFromFlightPath(
        flightId, flightPath, setActiveFlight, setFlightPath, undefined,
      );
      expect(setFlightPath).toHaveBeenCalledWith(flightPath.filter(x => x.ident !== flightId));
      expect(setActiveFlight).not.toHaveBeenCalled();
    });

    describe('updateFlightPathData', () => {
      it('progresses as expected, checking for earlier flights and updating aircraft usage', () => {
        const flightPath = [
          {
            arrivalTime: 43500,
            departureTime: 37800,
            destination: 'LIRF',
            ident: 'AS1343',
            origin: 'LSGG',
            readableArrival: '12:05',
            readableDeparture: '10:30',
          }
        ];
        const flights = [
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
          },
          {
            arrivalTime: 43500,
            departureTime: 37800,
            destination: 'LIRF',
            ident: 'AS1343',
            origin: 'LSGG',
            readableArrival: '12:05',
            readableDeparture: '10:30',
          }
        ];
        const setEarlierFlightsAvailable = jest.fn();
        const setAircraftUsage = jest.fn(() => true);
        module.updateFlightPathData(
          flightPath, flights, setEarlierFlightsAvailable, setAircraftUsage,
        );
        expect(setEarlierFlightsAvailable).toHaveBeenCalledWith(true);
        expect(setAircraftUsage).toHaveBeenCalledTimes(1);
      });
    });

    describe('_checkAircraftUsage', () => {
      it('returns 0 if the flight path is empty', () => {
        const actual = module._checkAircraftUsage([] as Flight[]);
        expect(actual).toBe(0);
      });

      it('adds up flight durations to get total aircraft usage given flight path', () => {
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
          },
          {
            arrivalTime: 43500,
            departureTime: 37800,
            destination: 'LIRF',
            ident: 'AS1343',
            origin: 'LSGG',
            readableArrival: '12:05',
            readableDeparture: '10:30',
          }
        ];
        const actual = module._checkAircraftUsage(flightPath);
        expect(actual).toBe(18);
      });
    });
  });
});
