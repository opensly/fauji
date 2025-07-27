/**
 * Specialized error reporting for spy matchers and .not cases
 * This provides better error messages specifically for spy/mock function assertions
 */

import util from 'util';
import { isSpy, isMockFunction } from './spy.js';

/**
 * Extracts meaningful data from spy/mock functions for error reporting
 * @param {Function} fn - The spy or mock function
 * @returns {Object} - Object with call data, return data, and error data
 */
function extractSpyData(fn) {
  if (!isSpy(fn) && !isMockFunction(fn)) {
    return { calls: [], returns: [], errors: [] };
  }

  let calls = [];
  let results = [];

  if (isMockFunction(fn)) {
    calls = fn.mock.calls || [];
    results = fn.mock.results || [];
  } else if (isSpy(fn)) {
    calls = fn.calls || [];
    results = fn.results || [];
  }

  const returns = results
    .filter(result => result.type === 'return')
    .map(result => result.value);

  const errors = results
    .filter(result => result.type === 'throw')
    .map(result => result.value);

  return { calls, returns, errors };
}

/**
 * Formats spy/mock function data for error messages
 * @param {Function} fn - The spy or mock function
 * @returns {string} - Formatted string representation
 */
function formatSpyData(fn) {
  const { calls, returns, errors } = extractSpyData(fn);
  
  let parts = [];
  
  if (calls.length > 0) {
    parts.push(`calls: ${calls.length} (${calls.map(call => util.inspect(call, { depth: 3, colors: false })).join(', ')})`);
  } else {
    parts.push('calls: 0');
  }
  
  if (returns.length > 0) {
    parts.push(`returns: ${returns.map(ret => util.inspect(ret, { depth: 3, colors: false })).join(', ')}`);
  }
  
  if (errors.length > 0) {
    parts.push(`errors: ${errors.map(err => util.inspect(err, { depth: 3, colors: false })).join(', ')}`);
  }
  
  return `{ ${parts.join(', ')} }`;
}

/**
 * Creates a specialized error for spy matcher failures
 * @param {string} matcherName - The name of the matcher
 * @param {Function} received - The spy/mock function
 * @param {*} expected - The expected value
 * @param {boolean} isNot - Whether this is a .not assertion
 * @returns {Error} - The formatted error
 */
export function createSpyMatcherError(matcherName, received, expected, isNot = false) {
  const spyData = formatSpyData(received);
  const notText = isNot ? 'not.' : '';
  
  let message = `Assertion failed: ${notText}${matcherName}`;
  
  if (typeof expected !== 'undefined') {
    message += `\n\nDifference:`;
    message += `\n- Expected: ${util.inspect(expected, { depth: 5, colors: false })}`;
    message += `\n+ Received: ${spyData}`;
  } else {
    message += `\n\nDifference:`;
    message += `\n- Expected: ${notText}${matcherName}`;
    message += `\n+ Received: ${spyData}`;
  }
  
  const error = new Error(message);
  error.actual = extractSpyData(received);
  error.expected = expected;
  error.matcherName = matcherName;
  error.isNot = isNot;
  
  return error;
}

/**
 * Specialized getMatcherResult for spy matchers
 * @param {boolean} result - Whether the assertion passed
 * @param {string} matcherName - The name of the matcher
 * @param {Function} received - The spy/mock function
 * @param {*} expected - The expected value
 * @param {boolean} isNot - Whether this is a .not assertion
 * @returns {boolean|Error} - Returns true if passed, throws error if failed
 */
export function getSpyMatcherResult(result, matcherName, received, expected, isNot = false) {
  if (result) {
    return true;
  }
  
  throw createSpyMatcherError(matcherName, received, expected, isNot);
}

/**
 * Specialized error for .not spy matcher failures
 * @param {string} matcherName - The name of the matcher
 * @param {Function} received - The spy/mock function
 * @param {*} expected - The expected value
 * @returns {Error} - The formatted error
 */
export function createNotSpyMatcherError(matcherName, received, expected) {
  return createSpyMatcherError(matcherName, received, expected, true);
} 