import { determinePercentageOfWhole } from 'utils/determinePercentageOfWhole';

describe('determinePercentageOfWhole', () => {
  it('should return the percentage of a 24 hour period is between two UTC timestamps', () => {
    const startInSecs = 21600;
    const endInSecs = 26100;
    const percentageOfWhole = determinePercentageOfWhole(startInSecs, endInSecs);
    expect(percentageOfWhole).toBe(5.208333333333334);
  });

  it('should raise exception given end timestamp that is greater than starting timestamp', () => {
    const startInSecs = 26100;
    const endInSecs = 21600;
    let exceptionMessage;
    try {
      determinePercentageOfWhole(startInSecs, endInSecs);
    } catch (exception: any) {
      exceptionMessage = exception.message;
    }
    expect(exceptionMessage).toBe('End timestamp should come after the starting timestamp');
  });

  it('should raise exception given start timestamp that a negative number', () => {
    const startInSecs = -1;
    const endInSecs = 26100;
    let exceptionMessage;
    try {
      determinePercentageOfWhole(startInSecs, endInSecs);
    } catch (exception: any) {
      exceptionMessage = exception.message;
    }
    expect(exceptionMessage).toBe('Received invalid start timestamp');
  });

  it('should raise exception given end timestamp that is greater than # of secs in day', () => {
    const startInSecs = 86400;
    const endInSecs = 86402;
    let exceptionMessage;
    try {
      determinePercentageOfWhole(startInSecs, endInSecs);
    } catch (exception: any) {
      exceptionMessage = exception.message;
    }
    expect(exceptionMessage).toBe('Received invalid end timestamp');
  });
});
