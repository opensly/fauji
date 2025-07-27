// Simple mock registry management

// Single registry for all tests
const mockRegistry = new Map();
const globalMockRegistry = new Set();

// Get the mock registry
function getRegistry() {
  return {
    mockRegistry: mockRegistry,
    globalMockRegistry: globalMockRegistry
  };
}

// Get the mock registry
export function getMockRegistry() {
  return getRegistry().mockRegistry;
}

// Get the global mock registry
export function getGlobalMockRegistry() {
  return getRegistry().globalMockRegistry;
}

// Clear all registries
export function clearWorkerRegistries() {
  const registry = getRegistry();
  registry.mockRegistry.clear();
  registry.globalMockRegistry.clear();
}

// Force clear all registries (for complete reset)
export function forceClearAllRegistries() {
  clearWorkerRegistries();
}

// Get registry information for debugging
export function getWorkerInfo() {
  const registry = getRegistry();
  return {
    mockRegistrySize: registry.mockRegistry.size,
    globalMockRegistrySize: registry.globalMockRegistry.size
  };
} 