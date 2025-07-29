import { getSpyMatcherResult } from './spyErrorReporting.js';

/**
 * Creates a .not handler for a matcher function that inverts the matcher's logic
 * 
 * Logic:
 * - If the original matcher passes (returns true), .not should fail
 * - If the original matcher fails (throws error), .not should pass
 * - Uses specialized spy error reporting for proper .not case error messages
 * 
 * @param {Function} matcherFn - The original matcher function
 * @param {string} matcherName - The name of the matcher
 * @returns {Function} - A function that handles .not logic with inverted behavior
 */
export function createNotHandler(matcherFn, matcherName) {
  return function(received, ...args) {
    try {
      const result = matcherFn(received, ...args);
      // Original matcher passed, so .not should fail with specialized error reporting
      return getSpyMatcherResult(false, matcherName, received, args.length === 1 ? args[0] : args, true);
    } catch (matcherError) {
      // Check if this error is already a .not failure to avoid double-negation
      if (matcherError.isNot) {
        throw matcherError;
      }
      // Original matcher failed, so .not should pass
      return true;
    }
  };
}

/**
 * Wraps a matcher function to handle both normal and .not cases
 * @param {Function} matcherFn - The original matcher function
 * @param {string} matcherName - The name of the matcher
 * @returns {Function} - A function that handles both cases
 */
export function wrapMatcher(matcherFn, matcherName) {
  return function(received, ...args) {
    return matcherFn(received, ...args);
  };
}

/**
 * Creates a matcher with .not support
 * @param {Function} matcherFn - The original matcher function
 * @param {string} matcherName - The name of the matcher
 * @returns {Object} - Object with normal and .not versions
 */
export function createMatcherWithNot(matcherFn, matcherName) {
  return {
    normal: wrapMatcher(matcherFn, matcherName),
    not: createNotHandler(matcherFn, matcherName)
  };
} 