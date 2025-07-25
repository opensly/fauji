// Core test runner logic for Fauji
import { rootSuite } from './suite.js';
import { Logger } from '../logger/logger-core.js';
import * as allMatchersModule from '../matchers/index.js';

const allMatchers = allMatchersModule.allMatchers || allMatchersModule.default || allMatchersModule;

// Use a getter to always get the correct logger instance
const defaultLogger = new Logger();
function getLogger() {
  return (typeof global !== 'undefined' && global._testLogger) ? global._testLogger : defaultLogger;
}

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

async function resolveFixtures(test, suite) {
  // Walk up the suite chain to collect all fixtures
  const fixtures = {};
  let current = suite;
  while (current) {
    Object.assign(fixtures, current.fixtures);
    current = current.parent;
  }
  // Resolve requested fixtures
  const resolved = [];
  const teardowns = [];
  for (const name of test.fixtures || []) {
    if (!fixtures[name]) throw new Error(`Fixture not found: ${name}`);
    const result = await fixtures[name]();
    if (result && typeof result === 'object' && 'value' in result) {
      resolved.push(result.value);
      if (typeof result.teardown === 'function') teardowns.push(result.teardown);
    } else {
      resolved.push(result);
    }
  }
  return { resolved, teardowns };
}

/**
 * Recursively runs a test suite, including hooks and child suites.
 * Handles skipped tests and logs results using Logger.
 * @param {Suite} suite
 */
async function runSuite(suite) {
  if (suite.mode === 'skip') return;
  getLogger().perceive('describe', suite.desc, suite.annotations);
  
  for (const fn of suite.hooks.beforeAll) await fn();
  
  for (const test of suite.tests) {
    if (test.mode === 'skip') {
      getLogger().perceive('test', test.desc + ' (skipped)', test.annotations);
      getLogger().status(true, null, true); // Mark as skipped
      continue;
    }
    
    for (const fn of suite.hooks.beforeEach) await fn();
    let teardowns = [];
    
    try {
      getLogger().perceive('test', test.desc, test.annotations);
      const { resolved, teardowns: tds } = await resolveFixtures(test, suite);
      teardowns = tds;
      const maybePromise = test.fn(...resolved);
      if (maybePromise && typeof maybePromise.then === 'function') {
        await maybePromise;
      }
      // Test passed, mark as successful
      getLogger().status(true);
    } catch (e) {
      // Test failed, mark as failed with error
      getLogger().status(false, e);
    }
    
    // Run teardowns after test
    for (const td of teardowns) {
      try {
        const maybePromise = td();
        if (maybePromise && typeof maybePromise.then === 'function') {
          await maybePromise;
        }
      } catch (e) {
        // Ignore teardown errors for now
      }
    }
    for (const fn of suite.hooks.afterEach) await fn();
  }
  
  for (const child of suite.suites) {
    await runSuite(child);
  }
  
  for (const fn of suite.hooks.afterAll) await fn();
  getLogger().suiteStack.pop();
}

/**
 * Runs all root-level suites, applies 'only' filtering.
 * Summary printing is handled by test-execution.js
 */
function run() {
  getLogger().startTimer();
  if (hasOnly(rootSuite)) {
    filterOnlySuites(rootSuite);
  }
  return (async () => {
    await runSuite(rootSuite);
    // Summary and exit code are handled by test-execution.js
  })();
}

/**
 * Returns all matchers for a received value, for use in test assertions.
 * @param {*} exp
 * @returns {Matchers}
 */
function expect(exp) {
  return allMatchers(exp);
}

export { run, expect, runSuite, filterOnlySuites, hasOnly };
