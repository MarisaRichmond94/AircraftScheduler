import flights from 'api/flights.json';
import { filterFlights } from 'utils/filterFlights';

describe('filterFlights', () => {
  it('filters correctly when given a starting timestamp', () => {
    const expected = 'AS1328';
    const start = { timestamp: 23400, location: 'LIPZ' }
    const actual = filterFlights(flights, start, undefined);
    expect(actual[0].ident).toBe(expected);
  });

  it('filters correctly when given an ending timestamp', () => {
    const expected = 'AS1327';
    const end = { timestamp: 25500, location: 'LIPZ' }
    const actual = filterFlights(flights, undefined, end);
    expect(actual[0].ident).toBe(expected);
  });
});
