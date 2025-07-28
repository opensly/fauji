import * as equality from './equality.js';
import * as type from './type.js';
import * as string from './string.js';
import * as object from './object.js';
import * as number from './number.js';
import * as spyMatchers from './spyMatchers.js';
import * as asyncMatchers from './async.js';
import * as schema from './schema.js';
import * as empty from './empty.js';
import * as validation from './validation.js';
import * as satisfy from './satisfy.js';
import * as throwMatcher from './throw.js';
import * as length from './length.js';
import * as utils from './utils.js';
import { createNotHandler } from './notHandler.js';
import { createAsyncMatcherWrapper, isAsyncMatcherResult } from './asyncMatcherWrapper.js';

const customMatchers = {};

export function addMatchers(matchers) {
  Object.assign(customMatchers, matchers);
}

export function allMatchers(received, isNot = false) {
  // Create async matcher wrappers for async matchers
  const asyncMatcherWrappers = {
    toResolve: createAsyncMatcherWrapper(asyncMatchers.toResolve, 'toResolve'),
    toReject: createAsyncMatcherWrapper(asyncMatchers.toReject, 'toReject'),
  };

  const builtIn = {
    ...equality,
    ...type,
    ...string,
    ...object,
    ...number,
    ...spyMatchers,
    ...asyncMatchers,
    ...schema,
    ...empty,
    ...validation,
    ...satisfy,
    ...throwMatcher,
    ...length,
    ...utils,
    rejects: asyncMatchers.rejects,
    // Add async matcher wrappers
    ...asyncMatcherWrappers,
  };
  const matchers = { ...builtIn, ...customMatchers };

  // Handler for the proxy
  const handler = {
    get(target, prop) {
      if (prop === 'not') {
        // Return a new proxy with isNot flipped
        return allMatchers(received, !isNot);
      }
      if (typeof matchers[prop] === 'function') {
        // Special handling for 'rejects' function
        if (prop === 'rejects') {
          return matchers[prop](received);
        }
        // For regular matcher functions, handle with args
        return (...args) => {
          if (!isNot) {
            // Execute matcher and return matcher object for chaining
            const result = matchers[prop](received, ...args);
            
            // Check if this is an async matcher result
            if (isAsyncMatcherResult(result)) {
              // For async matchers, return a special object that can be awaited
              return {
                asyncMatcherResult: result,
                chain: () => allMatchers(received, isNot),
                execute: async () => {
                  try {
                    await result.execute();
                    return allMatchers(received, isNot);
                  } catch (error) {
                    // Re-throw the error to be handled by the test runner
                    throw error;
                  }
                }
              };
            }
            
            return allMatchers(received, isNot);
          } else {
            // Use separate .not handler for cleaner logic
            const notHandler = createNotHandler(matchers[prop], prop);
            notHandler(received, ...args);
            return allMatchers(received, isNot);
          }
        };
      }
      // Handle special cases like 'rejects' that return objects
      if (matchers[prop] && typeof matchers[prop] === 'object') {
        return matchers[prop];
      }
      // Fallback to undefined
      return undefined;
    }
  };
  return new Proxy({}, handler);
}

export default {
  ...equality,
  ...type,
  ...string,
  ...object,
  ...number,
  ...spyMatchers,
  ...asyncMatchers,
  ...schema,
  ...empty,
  ...validation,
  ...satisfy,
  ...throwMatcher,
  ...length,
  ...utils,
  addMatchers,
  allMatchers,
}; 