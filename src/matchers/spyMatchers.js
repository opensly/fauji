import { getSpyMatcherResult } from './spyErrorReporting.js';
import { isSpy, isMockFunction } from './spy.js';
import { validateSpyOrMock } from './spyValidation.js';
import deepEqualCheck from 'deep-equal-check';

// Helper function to get call count (works with both spy and mock functions)
function getCallCount(fn) {
  if (isSpy(fn)) {
    return fn.callCount;
  } else if (isMockFunction(fn)) {
    return fn.mock.calls.length;
  }
  return 0;
}

// Helper function to get calls (works with both spy and mock functions)
function getCalls(fn) {
  if (isMockFunction(fn)) {
    return Array.isArray(fn.mock.calls) ? fn.mock.calls : [];
  } else if (isSpy(fn)) {
    return Array.isArray(fn.calls) ? fn.calls : [];
  }
  return [];
}

// Helper function to get instances (for mock functions)
function getInstances(fn) {
  if (isMockFunction(fn)) {
    return fn.mock.instances;
  }
  return [];
}

// Helper function to get results (works with both spy and mock functions)
function getResults(fn) {
  if (isMockFunction(fn)) {
    return fn.mock.results;
  } else if (isSpy(fn)) {
    return fn.results;
  }
  return [];
}

/**
 * Core logic for checking if a function has been called
 * @param {Function} fn - The function to check
 * @returns {boolean} - True if the function has been called
 */
export function _hasBeenCalled(fn) {
  try {
    validateSpyOrMock(fn, 'toHaveBeenCalled');
    return getCallCount(fn) > 0;
  } catch {
    return false;
  }
}

/**
 * Core logic for checking if a function has been called with specific arguments
 * @param {Function} fn - The function to check
 * @param {Array} args - The arguments to check for
 * @returns {boolean} - True if the function was called with the arguments
 */
export function _hasBeenCalledWith(fn, args) {
  try {
    validateSpyOrMock(fn, 'toHaveBeenCalledWith');
    const calls = getCalls(fn);
    return calls.some((call) => Array.isArray(call) && deepEqualCheck(call, args));
  } catch {
    return false;
  }
}

/**
 * Core logic for checking if a function has been called a specific number of times
 * @param {Function} fn - The function to check
 * @param {number} times - The expected number of calls
 * @returns {boolean} - True if the function was called the expected number of times
 */
export function _hasBeenCalledTimes(fn, times) {
  try {
    validateSpyOrMock(fn, 'toHaveBeenCalledTimes');
    return getCallCount(fn) === times;
  } catch {
    return false;
  }
}

/**
 * Core logic for checking if a function was last called with specific arguments
 * @param {Function} fn - The function to check
 * @param {Array} args - The arguments to check for
 * @returns {boolean} - True if the function was last called with the arguments
 */
export function _hasBeenLastCalledWith(fn, args) {
  try {
    validateSpyOrMock(fn, 'toHaveBeenLastCalledWith');
    const calls = getCalls(fn);
    const lastCall = calls[calls.length - 1];
    return Array.isArray(lastCall) && deepEqualCheck(lastCall, args);
  } catch {
    return false;
  }
}

/**
 * Core logic for checking if a function was called with specific arguments at a specific call
 * @param {Function} fn - The function to check
 * @param {number} nthCall - The call number to check (1-based)
 * @param {Array} args - The arguments to check for
 * @returns {boolean} - True if the function was called with the arguments at the specified call
 */
export function _hasBeenNthCalledWith(fn, nthCall, args) {
  try {
    validateSpyOrMock(fn, 'toHaveBeenNthCalledWith');
    const calls = getCalls(fn);
    const nthCallIndex = nthCall - 1;
    const call = calls[nthCallIndex];
    return Array.isArray(call) && deepEqualCheck(call, args);
  } catch {
    return false;
  }
}

/**
 * Core logic for checking if a function has returned a value
 * @param {Function} fn - The function to check
 * @returns {boolean} - True if the function has returned a value
 */
export function _hasReturned(fn) {
  try {
    validateSpyOrMock(fn, 'toHaveReturned');
    const results = getResults(fn);
    return results.some(result => result.type === 'return');
  } catch {
    return false;
  }
}

/**
 * Core logic for checking if a function has returned a specific value
 * @param {Function} fn - The function to check
 * @param {*} expectedValue - The expected return value
 * @returns {boolean} - True if the function has returned the expected value
 */
export function _hasReturnedWith(fn, expectedValue) {
  try {
    validateSpyOrMock(fn, 'toHaveReturnedWith');
    const results = getResults(fn);
    return results.some(result => result.type === 'return' && deepEqualCheck(result.value, expectedValue));
  } catch {
    return false;
  }
}

/**
 * Core logic for checking if a function last returned a specific value
 * @param {Function} fn - The function to check
 * @param {*} expectedValue - The expected return value
 * @returns {boolean} - True if the function last returned the expected value
 */
export function _hasLastReturnedWith(fn, expectedValue) {
  try {
    validateSpyOrMock(fn, 'toHaveLastReturnedWith');
    const results = getResults(fn);
    const lastResult = results[results.length - 1];
    return lastResult && lastResult.type === 'return' && deepEqualCheck(lastResult.value, expectedValue);
  } catch {
    return false;
  }
}

/**
 * Core logic for checking if a function returned a specific value at a specific call
 * @param {Function} fn - The function to check
 * @param {number} nthCall - The call number to check (1-based)
 * @param {*} expectedValue - The expected return value
 * @returns {boolean} - True if the function returned the expected value at the specified call
 */
export function _hasNthReturnedWith(fn, nthCall, expectedValue) {
  try {
    validateSpyOrMock(fn, 'toHaveNthReturnedWith');
    const results = getResults(fn);
    const nthResultIndex = nthCall - 1;
    const result = results[nthResultIndex];
    return result && result.type === 'return' && deepEqualCheck(result.value, expectedValue);
  } catch {
    return false;
  }
}

/**
 * Core logic for checking if a function has thrown an error
 * @param {Function} fn - The function to check
 * @returns {boolean} - True if the function has thrown an error
 */
export function _hasThrown(fn) {
  try {
    validateSpyOrMock(fn, 'toHaveThrown');
    const results = getResults(fn);
    return results.some(result => result.type === 'throw');
  } catch {
    return false;
  }
}

/**
 * Core logic for checking if a function has thrown a specific error
 * @param {Function} fn - The function to check
 * @param {Error} expectedError - The expected error
 * @returns {boolean} - True if the function has thrown the expected error
 */
export function _hasThrownWith(fn, expectedError) {
  try {
    validateSpyOrMock(fn, 'toHaveThrownWith');
    const results = getResults(fn);
    return results.some(result => {
      if (result.type !== 'throw') return false;
      
      const thrownError = result.value;
      
      // If expectedError is a string, check if error message contains it
      if (typeof expectedError === 'string') {
        return thrownError && thrownError.message && thrownError.message.includes(expectedError);
      }
      
      // If expectedError is a RegExp, test against error message
      if (expectedError instanceof RegExp) {
        return thrownError && thrownError.message && expectedError.test(thrownError.message);
      }
      
      // If expectedError is a constructor, check if error is instance of it
      if (typeof expectedError === 'function') {
        return thrownError instanceof expectedError;
      }
      
      // Otherwise, do deep equality check
      return deepEqualCheck(thrownError, expectedError);
    });
  } catch {
    return false;
  }
}

/**
 * Core logic for checking if a function was called with exactly the provided arguments (strict equality)
 * @param {Function} fn - The function to check
 * @param {Array} args - The arguments to check for
 * @returns {boolean} - True if the function was called with exactly the arguments
 */
export function _hasBeenCalledWithExactly(fn, args) {
  try {
    validateSpyOrMock(fn, 'toHaveBeenCalledWithExactly');
    const calls = getCalls(fn);
    
    return calls.some((call) => {
      if (!Array.isArray(call) || call.length !== args.length) {
        return false;
      }
      return call.every((arg, i) => arg === args[i]);
    });
  } catch {
    return false;
  }
}

export function toHaveBeenCalled(received) {
  const result = _hasBeenCalled(received);
  return getSpyMatcherResult(result, 'toHaveBeenCalled', received);
}

export function toHaveBeenCalledWith(received, ...args) {
  const result = _hasBeenCalledWith(received, args);
  return getSpyMatcherResult(result, 'toHaveBeenCalledWith', received, args);
}

export function toHaveBeenCalledTimes(received, times) {
  const result = _hasBeenCalledTimes(received, times);
  return getSpyMatcherResult(result, 'toHaveBeenCalledTimes', received, times);
}

export function toHaveBeenLastCalledWith(received, ...args) {
  const result = _hasBeenLastCalledWith(received, args);
  return getSpyMatcherResult(result, 'toHaveBeenLastCalledWith', received, args);
}

export function toHaveBeenNthCalledWith(received, nthCall, ...args) {
  const result = _hasBeenNthCalledWith(received, nthCall, args);
  return getSpyMatcherResult(result, 'toHaveBeenNthCalledWith', received, args);
}

export function toHaveReturned(received) {
  const result = _hasReturned(received);
  return getSpyMatcherResult(result, 'toHaveReturned', received);
}

export function toHaveReturnedWith(received, expectedValue) {
  const result = _hasReturnedWith(received, expectedValue);
  return getSpyMatcherResult(result, 'toHaveReturnedWith', received, expectedValue);
}

export function toHaveLastReturnedWith(received, expectedValue) {
  const result = _hasLastReturnedWith(received, expectedValue);
  return getSpyMatcherResult(result, 'toHaveLastReturnedWith', received, expectedValue);
}

export function toHaveNthReturnedWith(received, nthCall, expectedValue) {
  const result = _hasNthReturnedWith(received, nthCall, expectedValue);
  return getSpyMatcherResult(result, 'toHaveNthReturnedWith', received, expectedValue);
}

export function toHaveThrown(received) {
  const result = _hasThrown(received);
  return getSpyMatcherResult(result, 'toHaveThrown', received);
}

export function toHaveThrownWith(received, expectedError) {
  const result = _hasThrownWith(received, expectedError);
  return getSpyMatcherResult(result, 'toHaveThrownWith', received, expectedError);
}

export function toHaveBeenCalledWithExactly(received, ...args) {
  const result = _hasBeenCalledWithExactly(received, args);
  return getSpyMatcherResult(result, 'toHaveBeenCalledWithExactly', received, args);
}
