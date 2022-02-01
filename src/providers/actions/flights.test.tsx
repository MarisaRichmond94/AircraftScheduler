import flights from 'api/flights.json';
import * as module from 'providers/actions/flights';
import { Flight } from 'types';

describe('flight actions', () => {
  describe('calculateValidFlights', () => {
    it('resets valid flights to full list of flights when the flight path is empty', () => {
      const flightPath = [] as Flight[];
      const nextActiveFlightIndex = -1;
      const setValidFlights = jest.fn();
      module.calculateValidFlights(flightPath, nextActiveFlightIndex, setValidFlights, flights);
      expect(setValidFlights).toHaveBeenCalledWith(flights);
    });
  });
});
