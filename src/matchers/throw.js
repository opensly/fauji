import { getMatcherResult } from './utils.js';
import { isAsyncMatcherResult } from './asyncMatcherWrapper.js';

/**
 * Extract error message from various error types
 */
function extractErrorMessage(error) {
  if (typeof error === 'string') {
    return error;
  }
  if (error && error.message) {
    return error.message;
  }
  if (error) {
    return String(error);
  }
  return '';
}

/**
 * Check if an error matches the expected criteria
 */
function matchesExpectedError(error, expected) {
  if (!expected) return true;
  
  const errorMessage = extractErrorMessage(error);
  
  if (typeof expected === 'string') {
    return errorMessage.includes(expected);
  }
  if (expected instanceof RegExp) {
    return expected.test(errorMessage);
  }
  if (typeof expected === 'function') {
    return error instanceof expected;
  }
  
  return false;
}

/**
 * Handle async operations (promises, async matchers)
 */
function handleAsyncOperation(asyncOperation, received, expected) {
  return asyncOperation.then(
    () => getMatcherResult(false, 'toThrow', received, expected),
    (err) => getMatcherResult(matchesExpectedError(err, expected), 'toThrow', received, expected)
  );
}

/**
 * Get the async operation from different types of received values
 */
function getAsyncOperation(received) {
  // Handle promises
  if (received && typeof received.then === 'function') {
    return received;
  }
  
  // Handle raw async matcher results
  if (isAsyncMatcherResult(received)) {
    return received.execute();
  }
  
  // Handle enhanced async matcher result wrappers
  if (received && received.asyncMatcherResult && isAsyncMatcherResult(received.asyncMatcherResult)) {
    return received.asyncMatcherResult.execute();
  }
  
  return null;
}

export function toThrow(received, expected) {
  // Handle async operations
  const asyncOperation = getAsyncOperation(received);
  if (asyncOperation) {
    return handleAsyncOperation(asyncOperation, received, expected);
  }
  
  // Handle synchronous functions
  let threw = false;
  let error;
  
  try {
    if (typeof received === 'function') {
      received();
    }
  } catch (err) {
    threw = true;
    error = err;
  }
  
  if (!threw) {
    return getMatcherResult(false, 'toThrow', received, expected);
  }
  
  return getMatcherResult(matchesExpectedError(error, expected), 'toThrow', received, expected);
} 
