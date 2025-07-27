// Equality matchers for Fauji
import { getMatcherResult } from './utils.js';
import deepEqualCheck from 'deep-equal-check';

export function toBe(received, expected) {
  return getMatcherResult(received === expected, 'toBe', received, expected);
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

export function toBeCloseTo(received, expected, precision = 2) {
  // Handle NaN cases
  if (isNaN(received) || isNaN(expected)) {
    return getMatcherResult(false, 'toBeCloseTo', received, expected);
  }
  
  // Handle Infinity cases
  if (!isFinite(received) || !isFinite(expected)) {
    return getMatcherResult(received === expected, 'toBeCloseTo', received, expected);
  }
  
  // Calculate precision multiplier
  const multiplier = Math.pow(10, precision);
  
  // Round both values to the specified precision and compare
  const roundedReceived = Math.round(received * multiplier);
  const roundedExpected = Math.round(expected * multiplier);
  
  return getMatcherResult(roundedReceived === roundedExpected, 'toBeCloseTo', received, expected);
} 