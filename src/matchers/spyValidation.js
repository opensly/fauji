import { isSpy, isMockFunction } from './spy.js';

/**
 * Validates if a value is a spy or mock function
 * @param {*} value - The value to validate
 * @returns {boolean} - True if the value is a valid spy or mock function
 */
export function isValidSpyOrMock(value) {
  return isSpy(value) || isMockFunction(value);
}

/**
 * Validates spy/mock function and throws descriptive error if invalid
 * @param {*} value - The value to validate
 * @param {string} matcherName - The name of the matcher for error reporting
 * @throws {Error} - If the value is not a valid spy or mock function
 */
export function validateSpyOrMock(value, matcherName) {
  if (!isValidSpyOrMock(value)) {
    const error = new Error(
      `${matcherName} matcher can only be used on spy or mock functions. ` +
      `Received: ${typeof value}${value ? ` (${value.constructor.name})` : ''}`
    );
    error.actual = value;
    error.matcherName = matcherName;
    throw error;
  }
}

/**
 * Validates that both functions are valid spy/mock functions
 * @param {*} fn1 - The first function to validate
 * @param {*} fn2 - The second function to validate
 * @param {string} matcherName - The name of the matcher for error reporting
 * @throws {Error} - If either function is not a valid spy or mock function
 */
export function validateTwoSpiesOrMocks(fn1, fn2, matcherName) {
  if (!isValidSpyOrMock(fn1)) {
    const error = new Error(
      `${matcherName} matcher can only be used on spy or mock functions. ` +
      `First argument received: ${typeof fn1}${fn1 ? ` (${fn1.constructor.name})` : ''}`
    );
    error.actual = fn1;
    error.matcherName = matcherName;
    throw error;
  }
  
  if (!isValidSpyOrMock(fn2)) {
    const error = new Error(
      `${matcherName} matcher can only be used on spy or mock functions. ` +
      `Second argument received: ${typeof fn2}${fn2 ? ` (${fn2.constructor.name})` : ''}`
    );
    error.actual = fn2;
    error.matcherName = matcherName;
    throw error;
  }
}

/**
 * Validates that a spy/mock function has been called at least once
 * @param {Function} fn - The function to validate
 * @param {string} matcherName - The name of the matcher for error reporting
 * @throws {Error} - If the function has not been called
 */
export function validateFunctionHasBeenCalled(fn, matcherName) {
  validateSpyOrMock(fn, matcherName);
  
  const callCount = getCallCount(fn);
  if (callCount === 0) {
    const error = new Error(
      `${matcherName} matcher requires the function to have been called at least once. ` +
      `Received: function with ${callCount} calls`
    );
    error.actual = fn;
    error.matcherName = matcherName;
    throw error;
  }
}

/**
 * Helper function to get call count (works with both spy and mock functions)
 * @param {Function} fn - The function to get call count for
 * @returns {number} - The number of times the function has been called
 */
function getCallCount(fn) {
  if (isSpy(fn)) {
    return fn.callCount;
  } else if (isMockFunction(fn)) {
    return fn.mock.calls.length;
  }
  return 0;
}
