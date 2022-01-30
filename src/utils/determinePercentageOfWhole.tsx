export const determinePercentageOfWhole = (startInSecs: number, endInSecs: number): number => {
  const hours = (startInSecs - endInSecs) / 60 / 60;
  return (hours / 24) * 100;
};
