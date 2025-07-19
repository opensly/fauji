// Core test runner logic for Fauji
const { rootSuite } = require('./suite');
const { Logger } = require('./logger');
const { allMatchers } = require('../matchers');

const _log = new Logger();

/**
 * Recursively filters the suite tree to only include suites/tests marked as 'only'.
 * Modifies the suite tree in-place.
 * @param {Suite} suite
 */
function filterOnlySuites(suite) {
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

/**
 * Checks if a suite or any of its children are marked as 'only'.
 * @param {Suite} suite
 * @returns {boolean}
 */
function hasOnly(suite) {
  if (suite.mode === 'only') return true;
  if (suite.tests.some(t => t.mode === 'only')) return true;
  return suite.suites.some(hasOnly);
}

/**
 * Recursively runs a test suite, including hooks and child suites.
 * Handles skipped tests and logs results using Logger.
 * @param {Suite} suite
 */
function runSuite(suite) {
  if (suite.mode === 'skip') return;
  _log.perceive('describe', suite.desc);
  suite.hooks.beforeAll.forEach(fn => fn());
  for (const test of suite.tests) {
    if (test.mode === 'skip') {
      _log.perceive('test', test.desc + ' (skipped)');
      _log.status(true, null, true); // Mark as skipped
      continue;
    }
    suite.hooks.beforeEach.forEach(fn => fn());
    try {
      _log.perceive('test', test.desc);
      test.fn();
      _log.status(true);
    } catch (e) {
      _log.status(false, e);
    }
    suite.hooks.afterEach.forEach(fn => fn());
  }
  for (const child of suite.suites) {
    runSuite(child);
  }
  suite.hooks.afterAll.forEach(fn => fn());
  _log.suiteStack.pop();
}

/**
 * Runs all root-level suites, applies 'only' filtering, and prints summary.
 * Handles report file output and sets process exit code on failure.
 */
function run() {
  _log.startTimer();
  if (hasOnly(rootSuite)) {
    filterOnlySuites(rootSuite);
  }
  for (const suite of rootSuite.suites) {
    runSuite(suite);
  }
  _log.printSummary();
  if (process.env.FAUJI_REPORT || global.FAUJI_REPORT) {
    const type = process.env.FAUJI_REPORT || global.FAUJI_REPORT;
    const fs = require('fs');
    if (type === 'html') {
      fs.writeFileSync('fauji-report.html', _log.getResultsHTML(), 'utf8');
      console.log('HTML report written to fauji-report.html');
    } else if (type === 'json') {
      fs.writeFileSync('fauji-report.json', JSON.stringify(_log.getResultsJSON(), null, 2), 'utf8');
      console.log('JSON report written to fauji-report.json');
    }
  }
  if (_log.failed > 0) {
    process.exitCode = 1;
  }
}

/**
 * Returns all matchers for a received value, for use in test assertions.
 * @param {*} exp
 * @returns {Matchers}
 */
function expect(exp) {
  return allMatchers(exp);
}

module.exports = {
  run,
  expect,
  runSuite,
  filterOnlySuites,
  hasOnly,
}; 