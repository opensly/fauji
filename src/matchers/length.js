import { getMatcherResult } from './utils.js';

/**
 * Check if the received object has the expected length
 * @param {*} received 
 * @param {*} expected 
 * @returns {boolean}
 */
export function toHaveLength(received, expected) {
  let actualLength;
  
  if (Array.isArray(received)) {
    actualLength = received.length;
  } else if (typeof received === 'string') {
    actualLength = received.length;
  } else if (received instanceof String) {
    actualLength = received.length;
  } else if (received instanceof Set) {
    actualLength = received.size;
  } else if (received instanceof Map) {
    actualLength = received.size;
  } else if (received && typeof received === 'object' && 'length' in received) {
    if (ArrayBuffer.isView(received) || 
        (typeof received.length === 'number' && received.length >= 0)) {
      actualLength = received.length;
    } else {
      return getMatcherResult(false, 'toHaveLength', received, expected);
    }
  } else {
    return getMatcherResult(false, 'toHaveLength', received, expected);
  }
  
  return getMatcherResult(actualLength === expected, 'toHaveLength', received, expected);
}
