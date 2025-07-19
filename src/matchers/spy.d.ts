/**
 * Spy function type that tracks calls and can restore the original implementation.
 * @template T - The function signature being spied on.
 */
export type SpyFn<T extends (...args: unknown[]) => unknown = (...args: unknown[]) => unknown> =
  T & { calls: Parameters<T>[], callCount: number, isSpy: boolean, restore: () => void };

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
 * Create a mock for a module.
 * @param modulePath - The path to the module.
 * @param mockImpl - The mock implementation.
 */
export function createMock(modulePath: string, mockImpl: unknown): { restore: () => void };

export const spy: typeof createSpy;
export const stub: typeof createStub;
export const mock: typeof createMock; 