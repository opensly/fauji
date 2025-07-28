import { getMatcherResult } from './utils.js';

export function toHaveLength(received, expected) {
  let actualLength;
  
  // Handle different types of length-checkable objects
  if (Array.isArray(received)) {
    // Arrays
    actualLength = received.length;
  } else if (typeof received === 'string') {
    // Primitive strings
    actualLength = received.length;
  } else if (received instanceof String) {
    // String objects
    actualLength = received.length;
  } else if (received instanceof Set) {
    // Set objects
    actualLength = received.size;
  } else if (received instanceof Map) {
    // Map objects
    actualLength = received.size;
  } else if (received && typeof received === 'object' && 'length' in received) {
    // Typed arrays (Uint8Array, Int16Array, etc.) and array-like objects
    // Check if it's a typed array or has a numeric length property
    if (ArrayBuffer.isView(received) || 
        (typeof received.length === 'number' && received.length >= 0)) {
      actualLength = received.length;
    } else {
      // Invalid object with length property
      return getMatcherResult(false, 'toHaveLength', received, expected);
    }
  } else {
    // Invalid type - no length property
    return getMatcherResult(false, 'toHaveLength', received, expected);
  }
  
  return getMatcherResult(actualLength === expected, 'toHaveLength', received, expected);
} 