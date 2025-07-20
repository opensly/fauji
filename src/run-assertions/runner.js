/**
 * Fauji runner: Main orchestrator for CLI, test discovery, execution, cache, and environment setup.
 * This module wires together the core modules for running tests from the CLI or programmatically.
 * 
 * Usage:
 * 1. Parse CLI arguments (handled in bin/runner)
 * 2. Use findTestFiles(options) to discover test files (async)
 * 3. Use runTestFiles(files, options) to execute tests with a worker pool (async)
 * 4. Use loadCache/saveCache for test run caching (async)
 * 5. Call setupJsdomIfNeeded(options) if needed
 */
import { findTestFiles } from './test-discovery.js';
import { runTestFiles } from './test-execution.js';
import { loadCache, saveCache } from './cache.js';
import { setupJsdomIfNeeded } from './env-setup.js';

export default {
  findTestFiles,
  runTestFiles,
  loadCache,
  saveCache,
  setupJsdomIfNeeded,
};
