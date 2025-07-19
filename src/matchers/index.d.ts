// TypeScript definitions for the assertion library

/**
 * Generic matcher function type.
 * @template T - The type of the received value.
 * @template E - The type of the expected argument.
 */
export type MatcherFn<T = unknown, E = unknown> = (expected: E, ...args: unknown[]) => boolean | Promise<boolean>;

/**
 * Interface for all matchers, with stricter types for common matchers.
 * @template T - The type of the received value.
 */
export interface Matchers<T = unknown> {
  /** Strict equality */
  toBe(expected: T): boolean;
  /** Deep equality */
  toEqual(expected: T): boolean;
  /** Checks for null */
  toBeNull(): boolean;
  /** Checks for undefined */
  toBeUndefined(): boolean;
  /** Checks for closeness (numbers) */
  toBeCloseTo(expected: number): boolean;
  /** Checks for truthiness */
  toBeTruthy(): boolean;
  /** Checks for falsiness */
  toBeFalsy(): boolean;
  /** Greater than */
  toBeGreaterThan(expected: number): boolean;
  /** Less than */
  toBeLessThan(expected: number): boolean;
  /** Greater than or equal */
  toBeGreaterThanOrEqual(expected: number): boolean;
  /** Less than or equal */
  toBeLessThanOrEqual(expected: number): boolean;
  /** Checks for NaN */
  toBeNaN(): boolean;
  /** Regex/string match */
  toMatch(expected: string | RegExp): boolean;
  /** Object partial match */
  toMatchObject(expected: Partial<T>): boolean;
  /** Array contains */
  toContain(expected: unknown): boolean;
  /** Checks array or string length */
  toHaveLength(expected: number): boolean;
  /** Checks object property */
  toHaveProperty(expected: string, value?: unknown): boolean;
  /** Checks if function throws */
  toThrow(expected?: unknown): boolean;
  /** Checks instance */
  toBeInstanceOf(expected: new (...args: unknown[]) => unknown): boolean;
  /** Checks for array */
  toBeArray(): boolean;
  /** Checks for object */
  toBeObject(): boolean;
  /** Checks for string */
  toBeString(): boolean;
  /** Checks for number */
  toBeNumber(): boolean;
  /** Checks for boolean */
  toBeBoolean(): boolean;
  /** Checks for function */
  toBeFunction(): boolean;
  /** Checks for date */
  toBeDate(): boolean;
  /** Checks for RegExp */
  toBeRegExp(): boolean;
  /** Checks for empty value */
  toBeEmpty(): boolean;
  /** Checks for valid JSON */
  toBeValidJSON(): boolean;
  /** Checks for valid URL */
  toBeValidURL(): boolean;
  /** Checks for valid email */
  toBeValidEmail(): boolean;
  /** Checks for valid UUID */
  toBeValidUUID(): boolean;
  /** Checks for value within range */
  toBeWithinRange(min: number, max: number): boolean;
  /** Checks if value satisfies predicate */
  toSatisfy(predicate: (value: T) => boolean): boolean;
  /** Checks if value matches schema */
  toMatchSchema(schema: object): boolean;
  /** Spy matchers */
  toHaveBeenCalled(): boolean;
  toHaveBeenCalledWith(...args: unknown[]): boolean;
  toHaveBeenCalledTimes(expected: number): boolean;
  /** Async matchers */
  toResolve(): Promise<boolean>;
  toReject(): Promise<boolean>;
  /** Custom matchers */
  [key: string]: unknown;
  /** Negated matchers */
  not: Matchers<T>;
  /** Promise matchers */
  resolves?: Matchers<Awaited<T>>;
  rejects?: Matchers<Awaited<T>>;
}

/**
 * Returns all matchers for a received value.
 * @param received The value to assert on
 */
export function allMatchers<T = unknown>(received: T): Matchers<T>;

/**
 * Register custom matchers globally.
 * @param newMatchers An object with matcher functions
 */
export function addMatchers<T = unknown>(newMatchers: { [key: string]: MatcherFn<T, unknown> }): void;

export * from './spy'; 