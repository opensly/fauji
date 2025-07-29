import { allMatchers } from '../matchers/index.js';
import { isAsyncMatcherResult } from '../matchers/asyncMatcherWrapper.js';

/**
 * Enhanced expect function that properly handles async matchers
 * @param {*} exp - The value to test
 * @returns {EnhancedMatchers} - Enhanced matchers with async support
 */
export function enhancedExpect(exp) {
  const baseMatchers = allMatchers(exp);
  
  const handler = {
    get(target, prop) {
      const original = target[prop];
      
      if (typeof original === 'function') {
        return (...args) => {
          const result = original(...args);
          
          if (isAsyncMatcherResult(result)) {
            return {
              ...result,
              
              async executeAndHandle() {
                try {
                  await result.execute();
                  return true;
                } catch (error) {
                  return false;
                }
              },
              
              async getResult() {
                try {
                  await result.execute();
                  return { success: true };
                } catch (error) {
                  return { success: false, error };
                }
              },
              
              async executeAndThrowIfFailed() {
                try {
                  await result.execute();
                  throw new Error('Async matcher succeeded but was expected to fail');
                } catch (error) {
                  throw error;
                }
              },
              // Special handling for toThrow - when toThrow is called on an async matcher result
              toThrow: function(expectedError) {
                const asyncFunction = async () => {
                  try {
                    await result.execute();
                    throw new Error('Async matcher succeeded but was expected to fail');
                  } catch (error) {
                    throw error;
                  }
                };
                
                return asyncFunction();
              }
            };
          }
          
          return result;
        };
      }
      
      return original;
    }
  };
  
  return new Proxy(baseMatchers, handler);
}

/**
 * Helper function to check if a result is an async matcher result
 */
export function isAsyncMatcherResultWrapper(obj) {
  return obj && obj.asyncMatcherResult && isAsyncMatcherResult(obj.asyncMatcherResult);
} 