import aircrafts from 'api/aircrafts.json';
import flights from 'api/flights.json';
import * as initialize from 'providers/actions/initialize';
import * as clean from 'utils/cleanFlightData';

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
      const spy = jest.spyOn(clean, 'cleanFlightData');
      try {
        const setFlights = jest.fn();
        const setValidFlights = jest.fn();
        initialize.initializeFlights(setFlights, setValidFlights);
        expect(spy).toHaveBeenCalledWith(flights)
        expect(setFlights).toHaveBeenCalledTimes(1);
        expect(setValidFlights).toHaveBeenCalledTimes(1);
      } finally {
        spy.mockRestore();
      }
    });
  });
});
