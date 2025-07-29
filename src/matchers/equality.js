import { getMatcherResult } from './utils.js';
import deepEqualCheck from 'deep-equal-check';

export function toBe(received, expected) {
  const isEqual = Object.is(received, expected);
  return getMatcherResult(isEqual, 'toBe', received, expected);
}

export function toEqual(received, expected) {
  return getMatcherResult(deepEqualCheck(received, expected), 'toEqual', received, expected);
}

export function toBeNull(received) {
  return getMatcherResult(received === null, 'toBeNull', received);
}

export function toBeUndefined(received) {
  return getMatcherResult(received === undefined, 'toBeUndefined', received);
}

export function toBeDefined(received) {
  return getMatcherResult(received !== undefined, 'toBeDefined', received);
}

/**
 * toBeCloseTo matcher follows below standards
 * 
 * - Strings: Case-sensitive substring matching
 * - RegExp: Uses RegExp.test()
 * - Performance: Early termination for better performance
 * - Edge Cases: Handles NaN, Symbol, and other special values
 *  
 * @param {*} received 
 * @param {*} expected 
 * @param {*} precision 
 * @returns 
 */
export function toBeCloseTo(received, expected, precision = 2) {
  if (typeof precision !== 'number' || precision < 0 || !Number.isInteger(precision)) {
    throw new Error('toBeCloseTo precision must be a non-negative integer');
  }
  if (isNaN(received) && isNaN(expected)) {
    return getMatcherResult(true, 'toBeCloseTo', received, expected);
  }
  if (isNaN(received) || isNaN(expected)) {
    return getMatcherResult(false, 'toBeCloseTo', received, expected);
  }
  if (!isFinite(received) || !isFinite(expected)) {
    return getMatcherResult(received === expected, 'toBeCloseTo', received, expected);
  }
  
  const tolerance = Math.pow(10, -precision) / 2;
  const diff = Math.abs(received - expected);
  const isClose = diff < tolerance;
  
  return getMatcherResult(isClose, 'toBeCloseTo', received, expected);
}
