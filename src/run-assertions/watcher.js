// import modules
const { allMatchers } = require('../matchers/matchers');
const { Logger } = require('./logger');

class Suite {
  constructor(desc) {
    this.desc = desc;
    this.tests = [];
    this.suites = [];
    this.hooks = { beforeAll: [], beforeEach: [], afterEach: [], afterAll: [] };
    this.parent = null;
  }
}

const rootSuite = new Suite('');
let currentSuite = rootSuite;
const _log = new Logger();

function describe(desc, fn) {
  const suite = new Suite(desc);
  suite.parent = currentSuite;
  currentSuite.suites.push(suite);
  currentSuite = suite;
  fn();
  currentSuite = suite.parent;
}

function test(desc, fn) {
  currentSuite.tests.push({ desc, fn });
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

function runSuite(suite) {
  _log.perceive('describe', suite.desc);
  suite.hooks.beforeAll.forEach(fn => fn());
  for (const test of suite.tests) {
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
  for (const suite of rootSuite.suites) {
    runSuite(suite);
  }
  _log.printSummary();
}

function expect(exp) {
  return allMatchers(exp);
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