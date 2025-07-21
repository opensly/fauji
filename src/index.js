// Export main modules for library entry point (ESM)
import { runner } from './run-assertions/runner.js';
import { Logger } from './run-assertions/logger.js';
import setupGlobals from './run-assertions/setup-globals.js';
import * as matchers from './matchers/index.js';
import { spy, stub, mock } from './matchers/spy.js';
import { run } from './run-assertions/runner-core.js';

export { runner, Logger, setupGlobals, run, spy, stub, mock };
export * from './matchers/index.js';
