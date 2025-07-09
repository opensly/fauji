export type SpyFn = Function & { calls: any[][], callCount: number, isSpy: boolean, restore: () => void };

export function createSpy(fn?: Function): SpyFn;
export function isSpy(fn: any): fn is SpyFn;
export function createStub(obj: any, methodName: string, impl?: Function): SpyFn;
export function createMock(modulePath: string, mockImpl: any): { restore: () => void };
export const spy: typeof createSpy;
export const stub: typeof createStub;
export const mock: typeof createMock; 