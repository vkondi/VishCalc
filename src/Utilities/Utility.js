/**
 *
 * Collection of commonly used utility methods
 *
 */

export const roundTo = (num, roundValue = '2') => {
  console.log('[roundTo] >> ', num);
  return +(Math.round(num + `e+${roundValue}`) + `e-${roundValue}`);
};
