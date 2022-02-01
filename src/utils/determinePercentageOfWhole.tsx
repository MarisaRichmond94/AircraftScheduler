export const determinePercentageOfWhole = (startInSecs: number, endInSecs: number): number => {
  if (endInSecs < startInSecs) {
    throw TypeError('End timestamp should come after the starting timestamp');
  } else if (startInSecs < 0) {
    throw TypeError('Received invalid start timestamp');
  } else if (endInSecs > 86400) {
    throw TypeError('Received invalid end timestamp');
  }

  const hours = (endInSecs - startInSecs) / 60 / 60;
  return (hours / 24) * 100;
};
