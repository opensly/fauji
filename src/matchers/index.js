// Matcher registry for modularized matchers
const equality = require('./equality');
const type = require('./type');
const string = require('./string');
const object = require('./object');
const number = require('./number');
const spyMatchers = require('./spyMatchers');
const asyncMatchers = require('./async');
const schema = require('./schema');
const empty = require('./empty');
const validation = require('./validation');
const satisfy = require('./satisfy');
const throwMatcher = require('./throw');
const length = require('./length');
const utils = require('./utils');

// Global matcher registry for extensibility
const customMatchers = {};

function addMatchers(matchers) {
  Object.assign(customMatchers, matchers);
}

function allMatchers(received) {
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
  // Support .not
  proxy.not = {};
  for (const key of Object.keys(matchers)) {
    proxy.not[key] = (...args) => !matchers[key](received, ...args);
  }
  return proxy;
}

module.exports = {
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