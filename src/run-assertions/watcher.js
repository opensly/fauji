// import modules
const { allMatchers } = require('../matchers/matchers');
const { Logger } = require('./logger');

class Suite {
  constructor(desc, mode = 'normal') {
    this.desc = desc;
    this.tests = [];
    this.suites = [];
    this.hooks = { beforeAll: [], beforeEach: [], afterEach: [], afterAll: [] };
    this.parent = null;
    this.mode = mode; // 'normal', 'only', 'skip'
  }
}

const rootSuite = new Suite('');
let currentSuite = rootSuite;
const _log = new Logger();

function describe(desc, fn) {
  return _describe(desc, fn, 'normal');
}
describe.only = (desc, fn) => _describe(desc, fn, 'only');
describe.skip = (desc, fn) => _describe(desc, fn, 'skip');

function _describe(desc, fn, mode) {
  const suite = new Suite(desc, mode);
  suite.parent = currentSuite;
  currentSuite.suites.push(suite);
  currentSuite = suite;
  fn();
  currentSuite = suite.parent;
}

function test(desc, fn) {
  return _test(desc, fn, 'normal');
}
test.only = (desc, fn) => _test(desc, fn, 'only');
test.skip = (desc, fn) => _test(desc, fn, 'skip');

function _test(desc, fn, mode) {
  currentSuite.tests.push({ desc, fn, mode });
}

function beforeAll(fn) {
  currentSuite.hooks.beforeAll.push(fn);
}
function afterAll(fn) {
  currentSuite.hooks.afterAll.push(fn);
}
function beforeEach(fn) {
  currentSuite.hooks.beforeEach.push(fn);
}
function afterEach(fn) {
  currentSuite.hooks.afterEach.push(fn);
}

function filterOnlySuites(suite) {
  // If any child suite or test is 'only', keep only those
  const onlySuites = suite.suites.filter(s => s.mode === 'only' || hasOnly(s));
  const onlyTests = suite.tests.filter(t => t.mode === 'only');
  if (onlySuites.length || onlyTests.length) {
    suite.suites = onlySuites;
    suite.tests = onlyTests;
    suite.suites.forEach(filterOnlySuites);
  } else {
    suite.suites.forEach(filterOnlySuites);
  }
}
function hasOnly(suite) {
  if (suite.mode === 'only') return true;
  if (suite.tests.some(t => t.mode === 'only')) return true;
  return suite.suites.some(hasOnly);
}

function runSuite(suite) {
  if (suite.mode === 'skip') return;
  _log.perceive('describe', suite.desc);
  suite.hooks.beforeAll.forEach(fn => fn());
  for (const test of suite.tests) {
    if (test.mode === 'skip') {
      _log.perceive('test', test.desc + ' (skipped)');
      _log.status(true); // treat skipped as passed for summary
      continue;
    }
    suite.hooks.beforeEach.forEach(fn => fn());
    try {
      _log.perceive('test', test.desc);
      test.fn();
      _log.status(true);
    } catch (e) {
      _log.status(false, e);
      // error already logged in Logger
    }
    suite.hooks.afterEach.forEach(fn => fn());
  }
  for (const child of suite.suites) {
    runSuite(child);
  }
  suite.hooks.afterAll.forEach(fn => fn());
  _log.suiteStack.pop(); // maintain suite stack for accurate reporting
}

function run() {
  _log.startTimer();
  // If any .only, filter tree
  if (hasOnly(rootSuite)) {
    filterOnlySuites(rootSuite);
  }
  for (const suite of rootSuite.suites) {
    runSuite(suite);
  }
  _log.printSummary();
  // Exit with code 1 if any failed
  if (_log.failed > 0) {
    process.exitCode = 1;
  }
}

function expect(exp) {
  return allMatchers(exp);
}

// Auto-run if not required as a module (i.e., if run directly)
if (require.main === module) {
  run();
}

module.exports = {
  describe,
  test,
  beforeAll,
  afterAll,
  beforeEach,
  afterEach,
  expect,
  run
};