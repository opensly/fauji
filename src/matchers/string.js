import { getMatcherResult } from './utils.js';
import deepEqualCheck from 'deep-equal-check';

/**
 * toMatch matcher following Jest/AVA standards
 * 
 * - Strings: Case-sensitive substring matching
 * - RegExp: Uses RegExp.test()
 */
export function toMatch(received, expected) {
  if (typeof received !== 'string') {
    return getMatcherResult(false, 'toMatch', received, expected);
  }
  
  if (expected instanceof RegExp) {
    return getMatcherResult(expected.test(received), 'toMatch', received, expected);
  } else {
    return getMatcherResult(received.includes(String(expected)), 'toMatch', received, expected);
  }
}

/**
 * Optimized toContain matcher following Jest/AVA standards
 * 
 * - Strings: Case-sensitive substring matching
 * - Arrays: Object.is() for primitives, deep equality for objects
 * - Objects: Exact deep equality (not partial matching)
 * - Performance: Early termination for better performance
 * - Edge Cases: Handles NaN, Symbol, and other special values
 */
export function toContain(received, expected) {
  // Handle strings - case-sensitive substring matching
  if (typeof received === 'string') {
    const stringReceived = String(received);
    const stringExpected = String(expected);
    return getMatcherResult(stringReceived.includes(stringExpected), 'toContain', received, expected);
  }
  
  // Handle arrays - optimized with early termination
  if (Array.isArray(received)) {
    // For primitives, null, undefined, NaN, Symbol - use Object.is()
    if (expected === null || expected === undefined || 
        typeof expected !== 'object' || 
        typeof expected === 'number' && isNaN(expected) ||
        typeof expected === 'symbol') {
      for (let i = 0; i < received.length; i++) {
        if (Object.is(received[i], expected)) {
          return getMatcherResult(true, 'toContain', received, expected);
        }
      }
      return getMatcherResult(false, 'toContain', received, expected);
    }
    
    // For objects (including arrays) - use deep equality
    if (typeof expected === 'object') {
      for (let i = 0; i < received.length; i++) {
        if (deepEqualCheck(received[i], expected)) {
          return getMatcherResult(true, 'toContain', received, expected);
        }
      }
      return getMatcherResult(false, 'toContain', received, expected);
    }
  }
  
  // Handle other iterables (Set, Map, etc.)
  if (received && typeof received[Symbol.iterator] === 'function') {
    for (const item of received) {
      // For primitives, null, undefined, NaN, Symbol - use Object.is()
      if (expected === null || expected === undefined || 
          typeof expected !== 'object' || 
          typeof expected === 'number' && isNaN(expected) ||
          typeof expected === 'symbol') {
        if (Object.is(item, expected)) {
          return getMatcherResult(true, 'toContain', received, expected);
        }
      } else if (typeof expected === 'object') {
        if (deepEqualCheck(item, expected)) {
          return getMatcherResult(true, 'toContain', received, expected);
        }
      }
    }
    return getMatcherResult(false, 'toContain', received, expected);
  }

  return getMatcherResult(false, 'toContain', received, expected);
}
