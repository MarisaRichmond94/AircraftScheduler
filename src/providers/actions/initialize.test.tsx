import aircrafts from 'api/aircrafts.json';
import flights from 'api/flights.json';
import * as initialize from 'providers/actions/initialize';

describe('initialize actions', () => {
  describe('initializeAircrafts', () => {
    it('initialize aircrafts with results and set active aircraft to the first aircraft', () => {
      const setAircrafts = jest.fn();
      const setActiveAircraft = jest.fn();
      initialize.initializeAircrafts(setAircrafts, setActiveAircraft);
      expect(setAircrafts).toHaveBeenCalledTimes(1);
      expect(setAircrafts).toHaveBeenCalledWith(aircrafts);
      expect(setActiveAircraft).toHaveBeenCalledTimes(1);
      expect(setActiveAircraft).toHaveBeenCalledWith(aircrafts[0]);
    });
  });

  describe('initializeFlights', () => {
    it('initializes flights with results after cleaning the flight data', () => {
      const setFlights = jest.fn();
      const setValidFlights = jest.fn();
      initialize.initializeFlights(setFlights, setValidFlights);
      expect(setFlights).toHaveBeenCalledTimes(1);
      expect(setValidFlights).toHaveBeenCalledTimes(1);
    });
  });

  describe('_cleanFlightData', () => {
    it('filters out midnight departure time to maintain midnight grounding compliance', () => {
      const input = [
        {
          "ident": "AS132",
          "departureTime": 54000,
          "arrivalTime": 57300,
          "readableDeparture": "15:00",
          "readableArrival": "15:55",
          "origin": "EGAA",
          "destination": "EGCC"
        },
        {
          "ident": "MIDNIGHT_DEPARTURE",
          "departureTime": 0,
          "arrivalTime": 25500,
          "readableDeparture": "24:00",
          "readableArrival": "07:05",
          "origin": "LIPZ",
          "destination": "EGCC"
        }
      ];
      const actual = initialize._cleanFlightData(input);
      expect(actual.length).toBeLessThan(flights.length);
    });

    it('filters out midnight arrival time to maintain midnight grounding compliance', () => {
      const input = [
        {
          "ident": "AS132",
          "departureTime": 54000,
          "arrivalTime": 57300,
          "readableDeparture": "15:00",
          "readableArrival": "15:55",
          "origin": "EGAA",
          "destination": "EGCC"
        },
        {
          "ident": "MIDNIGHT_ARRIVAL",
          "departureTime": 25500,
          "arrivalTime": 86400,
          "readableDeparture": "07:05",
          "readableArrival": "24:00",
          "origin": "LIPZ",
          "destination": "EGCC"
        }
      ];
      const actual = initialize._cleanFlightData(input);
      expect(actual.length).toBeLessThan(flights.length);
    });

    it('returns list of flights sorted by departureTime timestamp', () => {
      const input = [
        {
          "ident": "AS1328",
          "departureTime": 25500,
          "arrivalTime": 30300,
          "readableDeparture": "07:05",
          "readableArrival": "08:25",
          "origin": "LIPZ",
          "destination": "LSGG"
        },
        {
          "ident": "AS1327",
          "departureTime": 18600,
          "arrivalTime": 23400,
          "readableDeparture": "05:10",
          "readableArrival": "06:30",
          "origin": "LSGG",
          "destination": "LIPZ"
        },
        {
          "ident": "AS1573",
          "departureTime": 24000,
          "arrivalTime": 28500,
          "readableDeparture": "06:40",
          "readableArrival": "07:55",
          "origin": "LIPZ",
          "destination": "EGAA"
        }
      ];
      const expected = [
        {
          "ident": "AS1327",
          "departureTime": 18600,
          "arrivalTime": 23400,
          "readableDeparture": "05:10",
          "readableArrival": "06:30",
          "origin": "LSGG",
          "destination": "LIPZ"
        },
        {
          "ident": "AS1573",
          "departureTime": 24000,
          "arrivalTime": 28500,
          "readableDeparture": "06:40",
          "readableArrival": "07:55",
          "origin": "LIPZ",
          "destination": "EGAA"
        },
        {
          "ident": "AS1328",
          "departureTime": 25500,
          "arrivalTime": 30300,
          "readableDeparture": "07:05",
          "readableArrival": "08:25",
          "origin": "LIPZ",
          "destination": "LSGG"
        }
      ];
      const actual = initialize._cleanFlightData(input);
      expect(JSON.stringify(actual)).toBe(JSON.stringify(expected));
    });
  });
});
