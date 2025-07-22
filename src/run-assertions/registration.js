// Test and suite registration for Fauji
import { getCurrentSuite, setCurrentSuite, Suite } from './suite.js';

/**
 * Register a fixture for the current suite.
 * The fixture function can be async and may return a value or { value, teardown }.
 * Teardown will be called after the test if provided.
 */
function fixture(name, fn) {
  getCurrentSuite().fixtures[name] = fn;
}

function describe(desc, optionsOrFn, maybeFn) {
  let options = {}, fn;
  if (typeof optionsOrFn === 'function') {
    fn = optionsOrFn;
  } else {
    options = optionsOrFn || {};
    fn = maybeFn;
  }
  return _describe(desc, fn, 'normal', options.annotations);
}
describe.only = (desc, optionsOrFn, maybeFn) => {
  let options = {}, fn;
  if (typeof optionsOrFn === 'function') {
    fn = optionsOrFn;
  } else {
    options = optionsOrFn || {};
    fn = maybeFn;
  }
  return _describe(desc, fn, 'only', options.annotations);
};
describe.skip = (desc, optionsOrFn, maybeFn) => {
  let options = {}, fn;
  if (typeof optionsOrFn === 'function') {
    fn = optionsOrFn;
  } else {
    options = optionsOrFn || {};
    fn = maybeFn;
  }
  return _describe(desc, fn, 'skip', options.annotations);
};

function _describe(desc, fn, mode, annotations) {
  const suite = new Suite(desc, mode, annotations || {});
  suite.parent = getCurrentSuite();
  getCurrentSuite().suites.push(suite);
  setCurrentSuite(suite);
  fn();
  setCurrentSuite(suite.parent);
}

function test(desc, optionsOrFn, maybeFn) {
  let options = {}, fn;
  if (typeof optionsOrFn === 'function') {
    fn = optionsOrFn;
  } else {
    options = optionsOrFn || {};
    fn = maybeFn;
  }
  return _test(desc, fn, 'normal', options);
}
test.only = (desc, optionsOrFn, maybeFn) => {
  let options = {}, fn;
  if (typeof optionsOrFn === 'function') {
    fn = optionsOrFn;
  } else {
    options = optionsOrFn || {};
    fn = maybeFn;
  }
  return _test(desc, fn, 'only', options);
};
test.skip = (desc, optionsOrFn, maybeFn) => {
  let options = {}, fn;
  if (typeof optionsOrFn === 'function') {
    fn = optionsOrFn;
  } else {
    options = optionsOrFn || {};
    fn = maybeFn;
  }
  return _test(desc, fn, 'skip', options);
};

function _test(desc, fn, mode, options) {
  getCurrentSuite().tests.push({
    desc,
    fn,
    mode,
    fixtures: options.fixtures || [],
    annotations: options.annotations || {},
  });
}

export { describe, test }; 