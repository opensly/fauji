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

const allMatchers = {
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
};

module.exports = {
  ...allMatchers,
  ...utils,
}; 