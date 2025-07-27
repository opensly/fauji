/**
 * Mock function type that tracks calls and provides Jest-compatible API.
 * @template T - The function signature being mocked.
 */
export type MockFn<T extends (...args: unknown[]) => unknown = (...args: unknown[]) => unknown> =
  T & {
    mock: {
      calls: Parameters<T>[][];
      instances: unknown[];
      results: Array<{ type: 'return' | 'throw'; value: unknown }>;
    };
    mockClear(): MockFn<T>;
    mockReset(): MockFn<T>;
    mockRestore(): MockFn<T>;
    mockImplementation(fn: T): MockFn<T>;
    mockImplementationOnce(fn: T): MockFn<T>;
    mockReturnValue(value: ReturnType<T>): MockFn<T>;
    mockReturnValueOnce(value: ReturnType<T>): MockFn<T>;
    mockResolvedValue(value: Awaited<ReturnType<T>>): MockFn<T>;
    mockResolvedValueOnce(value: Awaited<ReturnType<T>>): MockFn<T>;
    mockRejectedValue(value: unknown): MockFn<T>;
    mockRejectedValueOnce(value: unknown): MockFn<T>;
  };

/**
 * Spy function type that tracks calls and can restore the original implementation.
 * @template T - The function signature being spied on.
 */
export type SpyFn<T extends (...args: unknown[]) => unknown = (...args: unknown[]) => unknown> =
  T & { calls: Parameters<T>[], callCount: number, isSpy: boolean, restore: () => void };

/**
 * Create a Jest-compatible mock function.
 * @param impl - Optional implementation for the mock function.
 */
export function fn<T extends (...args: unknown[]) => unknown>(impl?: T): MockFn<T>;

/**
 * Create a spy for a given function.
 * @param fn - The function to spy on.
 */
export function createSpy<T extends (...args: unknown[]) => unknown>(fn?: T): SpyFn<T>;

/**
 * Type guard to check if a function is a spy.
 * @param fn - The function to check.
 */
export function isSpy<T extends (...args: unknown[]) => unknown>(fn: unknown): fn is SpyFn<T>;

/**
 * Type guard to check if a function is a mock function.
 * @param fn - The function to check.
 */
export function isMockFunction<T extends (...args: unknown[]) => unknown>(fn: unknown): fn is MockFn<T>;

/**
 * Create a stub for an object's method.
 * @param obj - The object containing the method.
 * @param methodName - The name of the method to stub.
 * @param impl - Optional implementation for the stub.
 */
export function createStub<T extends object, K extends keyof T>(
  obj: T,
  methodName: K,
  impl?: T[K] extends (...args: infer A) => infer R ? (...args: A) => R : never
): SpyFn<T[K] extends (...args: infer A) => infer R ? (...args: A) => R : never>;

/**
 * Spy on an object's method.
 * @param obj - The object containing the method.
 * @param methodName - The name of the method to spy on.
 */
export function spyOn<T extends object, K extends keyof T>(
  obj: T,
  methodName: K
): SpyFn<T[K] extends (...args: infer A) => infer R ? (...args: A) => R : never>;

/**
 * Create a mock for a module.
 * @param modulePath - The path to the module.
 * @param mockImpl - Optional mock implementation.
 */
export function mock(modulePath: string, mockImpl?: Record<string, unknown>): Record<string, unknown>;

/**
 * Remove a module mock.
 * @param modulePath - The path to the module.
 */
export function unmock(modulePath: string): void;

/**
 * Get the actual module (bypassing mocks).
 * @param modulePath - The path to the module.
 */
export function requireActual(modulePath: string): unknown;

/**
 * Get the mocked module.
 * @param modulePath - The path to the module.
 */
export function requireMock(modulePath: string): Record<string, unknown>;

/**
 * Reset all mocks and clear the mock registry.
 */
export function resetAllMocks(): void;

/**
 * Set the implementation for a mock function.
 * @param fn - The mock function.
 * @param implementation - The implementation to set.
 */
export function mockImplementation<T extends (...args: unknown[]) => unknown>(
  fn: MockFn<T>,
  implementation: T
): MockFn<T>;

/**
 * Set the return value for a mock function.
 * @param fn - The mock function.
 * @param value - The value to return.
 */
export function mockReturnValue<T extends (...args: unknown[]) => unknown>(
  fn: MockFn<T>,
  value: ReturnType<T>
): MockFn<T>;

/**
 * Set the resolved value for a mock function.
 * @param fn - The mock function.
 * @param value - The value to resolve to.
 */
export function mockResolvedValue<T extends (...args: unknown[]) => unknown>(
  fn: MockFn<T>,
  value: Awaited<ReturnType<T>>
): MockFn<T>;

/**
 * Set the rejected value for a mock function.
 * @param fn - The mock function.
 * @param value - The value to reject with.
 */
export function mockRejectedValue<T extends (...args: unknown[]) => unknown>(
  fn: MockFn<T>,
  value: unknown
): MockFn<T>;

// Legacy exports for backward compatibility
export const spy: typeof createSpy;
export const stub: typeof createStub;
export const faujiSpy: typeof createSpy; 