export const determinePercentageOfWhole = (startInSecs: number, endInSecs: number): number => {
  const hours = (endInSecs - startInSecs) / 60 / 60;
  return (hours / 24) * 100;
};
