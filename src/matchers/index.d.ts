// TypeScript definitions for the assertion library

export type MatcherFn = (expected?: any, ...args: any[]) => boolean | Promise<boolean>;

export interface Matchers {
  toBe: MatcherFn;
  toEqual: MatcherFn;
  toBeNull: MatcherFn;
  toBeUndefined: MatcherFn;
  toBeCloseTo: MatcherFn;
  toBeTruthy: MatcherFn;
  toBeFalsy: MatcherFn;
  toBeGreaterThan: MatcherFn;
  toBeLessThan: MatcherFn;
  toBeGreaterThanOrEqual: MatcherFn;
  toBeLessThanOrEqual: MatcherFn;
  toBeNaN: MatcherFn;
  toMatch: MatcherFn;
  toMatchObject: MatcherFn;
  toContain: MatcherFn;
  toHaveLength: MatcherFn;
  toHaveProperty: MatcherFn;
  toThrow: MatcherFn;
  toBeInstanceOf: MatcherFn;
  toBeArray: MatcherFn;
  toBeObject: MatcherFn;
  toBeString: MatcherFn;
  toBeNumber: MatcherFn;
  toBeBoolean: MatcherFn;
  toBeFunction: MatcherFn;
  toBeDate: MatcherFn;
  toBeRegExp: MatcherFn;
  toBeEmpty: MatcherFn;
  toBeValidJSON: MatcherFn;
  toBeValidURL: MatcherFn;
  toBeValidEmail: MatcherFn;
  toBeValidUUID: MatcherFn;
  toBeWithinRange: MatcherFn;
  toSatisfy: MatcherFn;
  toMatchSchema: MatcherFn;
  toHaveBeenCalled: MatcherFn;
  toHaveBeenCalledWith: MatcherFn;
  toHaveBeenCalledTimes: MatcherFn;
  toResolve: MatcherFn;
  toReject: MatcherFn;
  // Add custom matchers as index signature
  [key: string]: MatcherFn | any;
  not: Matchers;
  resolves?: Matchers;
  rejects?: Matchers;
}

/**
 * Returns all matchers for a received value.
 * @param received The value to assert on
 */
export function allMatchers(received: any): Matchers;

/**
 * Register custom matchers globally.
 * @param newMatchers An object with matcher functions
 */
export function addMatchers(newMatchers: { [key: string]: MatcherFn }): void;

export * from './spy'; 