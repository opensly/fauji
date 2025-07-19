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
const { findTestFiles } = require('./test-discovery');
const { runTestFiles } = require('./test-execution');
const { loadCache, saveCache } = require('./cache');
const { setupJsdomIfNeeded } = require('./env-setup');
