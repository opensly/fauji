const watcher = require('./watcher');
global.describe = watcher.describe;
global.test = watcher.test;
global.beforeAll = watcher.beforeAll;
global.afterAll = watcher.afterAll;
global.beforeEach = watcher.beforeEach;
global.afterEach = watcher.afterEach;
global.expect = watcher.expect;
global.run = watcher.run; 