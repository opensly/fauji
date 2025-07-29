import { getMockRegistry, getGlobalMockRegistry, clearWorkerRegistries } from './workerIsolatedRegistry.js';

const mockRegistry = getMockRegistry();
const globalMockRegistry = getGlobalMockRegistry();

export function createSpy(fn) {
  const spy = function(...args) {
    spy.calls.push(args);
    spy.callCount++;
    let result, threw = false, error;
    try {
      if (spy._mockImplementation) {
        result = spy._mockImplementation.apply(this, args);
      } else if (spy._mockReturnValue !== undefined) {
        result = spy._mockReturnValue;
      } else if (spy._mockResolvedValue !== undefined) {
        result = Promise.resolve(spy._mockResolvedValue);
      } else if (spy._mockRejectedValue !== undefined) {
        result = Promise.reject(spy._mockRejectedValue);
      } else {
        result = fn ? fn.apply(this, args) : undefined;
      }
    } catch (e) {
      threw = true;
      error = e;
      throw e;
    } finally {
      spy.results.push({ type: threw ? 'throw' : 'return', value: threw ? error : result });
    }
    return result;
  };
  spy.calls = [];
  spy.callCount = 0;
  spy.results = [];
  spy.isSpy = true;
  spy.restore = () => {};
  
  // Add mock-like functionality
  spy._mockImplementation = undefined;
  spy._mockReturnValue = undefined;
  spy._mockResolvedValue = undefined;
  spy._mockRejectedValue = undefined;
  
  spy.mockImplementation = function(implementation) {
    spy._mockImplementation = implementation;
    return spy;
  };
  
  spy.mockReturnValue = function(value) {
    spy._mockReturnValue = value;
    return spy;
  };
  
  spy.mockResolvedValue = function(value) {
    spy._mockResolvedValue = value;
    return spy;
  };
  
  spy.mockRejectedValue = function(value) {
    spy._mockRejectedValue = value;
    return spy;
  };
  
  spy.mockClear = function() {
    spy.calls = [];
    spy.callCount = 0;
    spy.results = [];
    return spy;
  };
  
  spy.mockReset = function() {
    spy.mockClear();
    spy._mockImplementation = undefined;
    spy._mockReturnValue = undefined;
    spy._mockResolvedValue = undefined;
    spy._mockRejectedValue = undefined;
    return spy;
  };
  
  return spy;
}
export const spy = createSpy;
export function isSpy(fn) { return fn && fn.isSpy; }

export function createStub(obj, methodName, impl) {
  if (!obj || typeof obj[methodName] !== 'function') throw new Error('No such method to stub');
  const original = obj[methodName];
  const stub = createSpy(impl);
  obj[methodName] = stub;
  stub.restore = () => { obj[methodName] = original; };
  return stub;
}
export const stub = createStub;

export function fn(impl) {
  const mockFn = function(...args) {
    mockFn.mock.calls.push(args);
    mockFn.mock.instances.push(this);
    let result, threw = false, error;
    try {
      // Priority: Once variants (FIFO), then persistent, then impl, then undefined
      if (mockFn._mockImplementationOnce.length) {
        result = mockFn._mockImplementationOnce.shift().apply(this, args);
      } else if (mockFn._mockImplementation) {
        result = mockFn._mockImplementation.apply(this, args);
      } else if (mockFn._mockReturnValueOnce.length) {
        result = mockFn._mockReturnValueOnce.shift();
      } else if (mockFn._mockReturnValue !== undefined) {
        result = mockFn._mockReturnValue;
      } else if (mockFn._mockResolvedValueOnce.length) {
        result = Promise.resolve(mockFn._mockResolvedValueOnce.shift());
      } else if (mockFn._mockRejectedValueOnce.length) {
        result = Promise.reject(mockFn._mockRejectedValueOnce.shift());
      } else if (mockFn._mockResolvedValue !== undefined) {
        result = Promise.resolve(mockFn._mockResolvedValue);
      } else if (mockFn._mockRejectedValue !== undefined) {
        result = Promise.reject(mockFn._mockRejectedValue);
      } else if (impl) {
        result = impl.apply(this, args);
      } else {
        result = undefined;
      }
    } catch (e) {
      threw = true;
      error = e;
      throw e;
    } finally {
      mockFn.mock.results.push({ type: threw ? 'throw' : 'return', value: threw ? error : result });
    }
    return result;
  };
  mockFn.mock = {
    calls: [],
    instances: [],
    results: []
  };
  // Internal queues for Once variants
  mockFn._mockImplementationOnce = [];
  mockFn._mockReturnValueOnce = [];
  mockFn._mockResolvedValueOnce = [];
  mockFn._mockRejectedValueOnce = [];
  // Persistent values (use internal properties)
  mockFn._mockImplementation = undefined;
  mockFn._mockReturnValue = undefined;
  mockFn._mockResolvedValue = undefined;
  mockFn._mockRejectedValue = undefined;
  // Chainable setters
  mockFn.mockClear = () => {
    mockFn.mock.calls = [];
    mockFn.mock.instances = [];
    mockFn.mock.results = [];
    return mockFn;
  };
  mockFn.mockReset = () => {
    mockFn.mockClear();
    mockFn._mockReturnValue = undefined;
    mockFn._mockResolvedValue = undefined;
    mockFn._mockRejectedValue = undefined;
    mockFn._mockImplementation = undefined;
    mockFn._mockReturnValueOnce = [];
    mockFn._mockResolvedValueOnce = [];
    mockFn._mockRejectedValueOnce = [];
    mockFn._mockImplementationOnce = [];
    return mockFn;
  };
  mockFn.mockRestore = () => { return mockFn; };
  mockFn.mockImplementationOnce = (fnImpl) => {
    mockFn._mockImplementationOnce.push(fnImpl);
    return mockFn;
  };
  mockFn.mockImplementation = (fnImpl) => {
    mockFn._mockImplementation = fnImpl;
    return mockFn;
  };
  mockFn.mockReturnValueOnce = (value) => {
    mockFn._mockReturnValueOnce.push(value);
    return mockFn;
  };
  mockFn.mockReturnValue = (value) => {
    mockFn._mockReturnValue = value;
    return mockFn;
  };
  mockFn.mockResolvedValueOnce = (value) => {
    mockFn._mockResolvedValueOnce.push(value);
    return mockFn;
  };
  mockFn.mockResolvedValue = (value) => {
    mockFn._mockResolvedValue = value;
    // Clear rejected values when setting resolved value
    mockFn._mockRejectedValue = undefined;
    return mockFn;
  };
  mockFn.mockRejectedValueOnce = (value) => {
    mockFn._mockRejectedValueOnce.push(value);
    return mockFn;
  };
  mockFn.mockRejectedValue = (value) => {
    mockFn._mockRejectedValue = value;
    // Clear resolved values when setting rejected value
    mockFn._mockResolvedValue = undefined;
    return mockFn;
  };
  // Register in global registry
  globalMockRegistry.add(mockFn);
  return mockFn;
}

export function isMockFunction(fn) {
  return typeof fn === 'function' && fn.mock && Array.isArray(fn.mock.calls);
}

export function spyOn(obj, methodName, accessorType) {
  if (accessorType === 'get' || accessorType === 'set') {
    const descriptor = Object.getOwnPropertyDescriptor(obj, methodName);
    if (!descriptor) {
      throw new Error(`Cannot spy on ${methodName} because it does not exist`);
    }
    
    const originalGetter = descriptor.get;
    const originalSetter = descriptor.set;
    
    if (accessorType === 'get' && !originalGetter) {
      throw new Error(`Cannot spy on ${methodName} getter because it does not exist`);
    }
    if (accessorType === 'set' && !originalSetter) {
      throw new Error(`Cannot spy on ${methodName} setter because it does not exist`);
    }
    
    const spy = createSpy(accessorType === 'get' ? originalGetter : originalSetter);
    
    // Create new descriptor with spy
    const newDescriptor = { ...descriptor };
    if (accessorType === 'get') {
      newDescriptor.get = spy;
    } else {
      newDescriptor.set = spy;
    }
    
    // Apply the new descriptor
    Object.defineProperty(obj, methodName, newDescriptor);
    
    // Add restore functionality
    spy.restore = () => {
      Object.defineProperty(obj, methodName, descriptor);
    };
    
    return spy;
  }
  
  // Handle regular function spying
  if (!obj || typeof obj[methodName] !== 'function') {
    throw new Error(`Cannot spy on ${methodName} because it is not a function`);
  }
  
  const original = obj[methodName];
  const spy = createSpy(original);
  
  // Replace the method with the spy
  obj[methodName] = spy;
  
  // Add restore functionality
  spy.restore = () => {
    obj[methodName] = original;
  };
  
  return spy;
}

export function mock(modulePath, mockImpl) {
  // Handle the case where no implementation is provided (undefined)
  // In this case, we should return an empty object as expected by tests
  if (mockImpl === undefined) {
    const emptyMock = {};
    mockRegistry.set(modulePath, emptyMock);
    return emptyMock;
  }
  
  // For objects, we need to store a reference and return that reference
  // so that subsequent calls to mock() return the same object
  if (typeof mockImpl === 'object' && mockImpl !== null) {
    // Check if we already have a mock for this module
    const existingMock = mockRegistry.get(modulePath);
    if (existingMock && typeof existingMock === 'object' && existingMock !== null) {
      // Update the existing object's properties instead of replacing it
      Object.keys(existingMock).forEach(key => delete existingMock[key]);
      Object.assign(existingMock, mockImpl);
      return existingMock;
    } else {
      // Store the new object
      mockRegistry.set(modulePath, mockImpl);
      return mockImpl;
    }
  }
  
  // For primitives and null, store and return as is
  mockRegistry.set(modulePath, mockImpl);
  return mockImpl;
}

export function unmock(modulePath) {
  mockRegistry.delete(modulePath);
}

export function resetAllMocks() {
  // Use worker-isolated registry clearing
  clearWorkerRegistries();
  
  // Reset all registered mock functions
  globalMockRegistry.forEach(mockFn => {
    if (mockFn.mockReset) {
      mockFn.mockReset();
    }
  });
}

export function requireActual(modulePath) {
  return { [modulePath]: 'actual-module' };
}

export function requireMock(modulePath) {
  const mock = mockRegistry.get(modulePath);
  return mock;
}

export function mockImplementation(fn, implementation) {
  if (!fn || !fn.mock) {
    throw new Error('mockImplementation can only be called on mock functions');
  }
  fn._mockImplementation = implementation;
  return fn;
}

export function mockReturnValue(fn, value) {
  if (!fn || !fn.mock) {
    throw new Error('mockReturnValue can only be called on mock functions');
  }
  fn._mockReturnValue = value;
  return fn;
}

export function mockResolvedValue(fn, value) {
  if (!fn || !fn.mock) {
    throw new Error('mockResolvedValue can only be called on mock functions');
  }
  fn._mockResolvedValue = value;
  // Clear rejected values when setting resolved value
  fn._mockRejectedValue = undefined;
  return fn;
}

export function mockRejectedValue(fn, value) {
  if (!fn || !fn.mock) {
    throw new Error('mockRejectedValue can only be called on mock functions');
  }
  fn._mockRejectedValue = value;
  // Clear resolved values when setting rejected value
  fn._mockResolvedValue = undefined;
  return fn;
}

function autoMockExports(exports) {
  for (const key in exports) {
    if (typeof exports[key] === 'function') {
      exports[key] = fn();
    }
  }
  return exports;
}

function findManualMock(modulePath) {
  return null;
}
