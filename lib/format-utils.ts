/**
 * Formats large numbers into a more readable string with suffixes.
 * If num >= 1000, returns format like "1.2k"
 */
export const formatStat = (num: number): string => {
  if (num >= 1000) {
    const formatted = (num / 1000).toFixed(1);
    // Remove .0 if it's a whole number
    return formatted.replace(/\.0$/, '') + 'k';
  }
  return num.toString();
};
