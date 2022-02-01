import { sortFlights } from 'utils/sortFlights';

describe('sortFlights', () => {
  it('returns -1 when flightA has a earlier departure time than flightB', () => {
    const flightB = {
      "ident": "AS132",
      "departureTime": 54000,
      "arrivalTime": 57300,
      "readableDeparture": "15:00",
      "readableArrival": "15:55",
      "origin": "EGAA",
      "destination": "EGCC"
    };
    const flightA = {
      "ident": "MIDNIGHT_DEPARTURE",
      "departureTime": 0,
      "arrivalTime": 25500,
      "readableDeparture": "24:00",
      "readableArrival": "07:05",
      "origin": "LIPZ",
      "destination": "EGCC"
    };
    const actual = sortFlights(flightA, flightB);
    expect(actual).toEqual(-1);
  });

  it('returns 1 when flightB has a earlier departure time than flightA', () => {
    const flightA = {
      "ident": "AS132",
      "departureTime": 54000,
      "arrivalTime": 57300,
      "readableDeparture": "15:00",
      "readableArrival": "15:55",
      "origin": "EGAA",
      "destination": "EGCC"
    };
    const flightB = {
      "ident": "MIDNIGHT_DEPARTURE",
      "departureTime": 0,
      "arrivalTime": 25500,
      "readableDeparture": "24:00",
      "readableArrival": "07:05",
      "origin": "LIPZ",
      "destination": "EGCC"
    };
    const actual = sortFlights(flightA, flightB);
    expect(actual).toEqual(1);
  });

  it('returns 0 when flightA and flightB have the same departure time', () => {
    const flightA = {
      "ident": "AS132",
      "departureTime": 54000,
      "arrivalTime": 57300,
      "readableDeparture": "15:00",
      "readableArrival": "15:55",
      "origin": "EGAA",
      "destination": "EGCC"
    };
    const flightB = {
      "ident": "AS133",
      "departureTime": 54000,
      "arrivalTime": 57300,
      "readableDeparture": "15:00",
      "readableArrival": "15:55",
      "origin": "LIPZ",
      "destination": "EGCC"
    };
    const actual = sortFlights(flightA, flightB);
    expect(actual).toEqual(0);
  });
});
