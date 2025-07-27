import { getSpyMatcherResult } from './spyErrorReporting.js';

/**
 * Separate handler for .not matcher logic
 * This provides clean separation between core matcher logic and negation handling
 */

/**
 * Creates a .not handler for a matcher function
 * @param {Function} matcherFn - The original matcher function
 * @param {string} matcherName - The name of the matcher
 * @returns {Function} - A function that handles .not logic
 */
export function createNotHandler(matcherFn, matcherName) {
  return function(received, ...args) {
    try {
      const result = matcherFn(received, ...args);
      // Matcher returned (passed), so .not should fail
      // Use specialized spy error reporting for .not cases
      return getSpyMatcherResult(false, matcherName, received, args.length === 1 ? args[0] : args, true);
    } catch (matcherError) {
      // Check if this is the error we just threw (for .not failure)
      if (matcherError.isNot) {
        throw matcherError; // Re-throw .not failure errors
      }
      // Matcher threw (failed), so .not passes
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