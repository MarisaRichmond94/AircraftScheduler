import { Flight } from 'types';
import { determinePercentageOfWhole } from 'utils/determinePercentageOfWhole';

export const checkAircraftUsage = (flightPath?: Flight[]): number => {
  if (flightPath?.length) {
    let totalSecondsInFlightPath = 0;
    for (let index = 0; index < flightPath.length; index++) {
      const { arrivalTime: startInSecs, departureTime: endInSecs } = flightPath[index];
      totalSecondsInFlightPath += determinePercentageOfWhole(startInSecs, endInSecs);
    }
    return Math.round(totalSecondsInFlightPath);
  }

  return 0;
};
