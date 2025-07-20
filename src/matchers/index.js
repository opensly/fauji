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

const customMatchers = {};

export function addMatchers(matchers) {
  Object.assign(customMatchers, matchers);
}

export function allMatchers(received) {
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
  };
  const matchers = { ...builtIn, ...customMatchers };
  const proxy = {};
  for (const key of Object.keys(matchers)) {
    proxy[key] = (...args) => matchers[key](received, ...args);
  }
  proxy.not = {};
  for (const key of Object.keys(matchers)) {
    proxy.not[key] = (...args) => !matchers[key](received, ...args);
  }
  return proxy;
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