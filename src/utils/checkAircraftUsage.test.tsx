import { Flight } from 'types';
import { checkAircraftUsage } from 'utils/checkAircraftUsage';

describe('_checkAircraftUsage', () => {
  it('returns 0 if the flight path is empty', () => {
    const actual = checkAircraftUsage([] as Flight[]);
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
    const actual = checkAircraftUsage(flightPath);
    expect(actual).toBe(18);
  });
});