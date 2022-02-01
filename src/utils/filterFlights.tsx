import produce from 'immer';

import { settings } from 'settings';
import { Flight } from 'types';

interface FlightFilter {
  timestamp: number,
  location: string,
};

export const filterFlights = (
  flights?: Flight[],
  start?: FlightFilter,
  end?: FlightFilter,
): Flight[] => {
  if (start === undefined && end === undefined) {
    throw Error('filterFlights requires either a start or an end filter, but none was provided.');
  }

  if (flights) {
    return produce<Flight[]>(flights, draft => {
      if (start) {
        return draft.filter(x =>
            x.origin === start.location &&
            x.departureTime > (start.timestamp + settings.REQUIRED_DOWNTIME_IN_SECS),
        );
      } else if (end) {
        return draft.filter(x =>
          x.destination === end.location &&
          (x.arrivalTime + settings.REQUIRED_DOWNTIME_IN_SECS) < end.timestamp,
        );
      }
    });
  }

  return [];
};
