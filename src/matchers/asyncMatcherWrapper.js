/**
 * Async Matcher Wrapper for enhanced test runner infrastructure
 * This module provides proper async matcher execution and result handling
 */
class AsyncMatcherResult {
  constructor(promise, matcherName, received, expected, isNot = false) {
    this.promise = promise;
    this.matcherName = matcherName;
    this.received = received;
    this.expected = expected;
    this.isNot = isNot;
    this.resolved = false;
    this.result = null;
    this.error = null;
  }

  async execute() {
    try {
      this.result = await this.promise;
      this.resolved = true;
      
      if (this.result && this.result.success === false && this.result.error) {
        throw this.result.error;
      }
      
      return this.result;
    } catch (error) {
      this.error = error;
      this.resolved = true;
      throw error;
    }
  }

  isSuccess() {
    return this.resolved && !this.error && this.result && this.result.success !== false;
  }

  shouldThrow() {
    return this.resolved && this.result && this.result.success === false;
  }

  getError() {
    return this.error;
  }

  getResult() {
    return this.result;
  }
}

export function createAsyncMatcherWrapper(matcherFn, matcherName) {
  return function(received, ...args) {
    const expected = args.length > 0 ? args[0] : undefined;
    const promise = matcherFn(received, ...args);
    return new AsyncMatcherResult(promise, matcherName, received, expected);
  };
}

export function isAsyncMatcherResult(obj) {
  return obj && obj.constructor === AsyncMatcherResult;
}

export { AsyncMatcherResult };
