const _colors = require('colors/safe');

class Logger {
  constructor() {
    this.total = 0;
    this.passed = 0;
    this.failed = 0;
    this.testResults = [];
    this.suiteStack = [];
    this.startTime = null;
    this.endTime = null;
    this.lastError = null;
  }

  startTimer() {
    this.startTime = Date.now();
  }

  endTimer() {
    this.endTime = Date.now();
  }

  perceive(context, msg) {
    if (context === 'describe') {
      this.suiteStack.push(msg);
      console.log(_colors.bold('\n' + msg));
    } else if (context === 'test') {
      this.currentTest = { name: msg, suite: [...this.suiteStack], status: null, error: null, duration: 0 };
      this.currentTest.start = Date.now();
      process.stdout.write('  ' + msg);
    }
  }

  status(result, error = null) {
    this.total++;
    if (this.currentTest) {
      this.currentTest.duration = Date.now() - this.currentTest.start;
      if (result) {
        this.passed++;
        this.currentTest.status = 'passed';
        console.log(' ' + _colors.green('✓'));
      } else {
        this.failed++;
        this.currentTest.status = 'failed';
        this.currentTest.error = error;
        console.log(' ' + _colors.red('✗'));
      }
      this.testResults.push(this.currentTest);
      this.currentTest = null;
    }
  }

  error(message) {
    this.lastError = message;
    console.error(_colors.red(message));
  }

  getStats() {
    return {
      total: this.total,
      passed: this.passed,
      failed: this.failed
    };
  }

  printSummary() {
    this.endTimer();
    const duration = this.endTime && this.startTime ? (this.endTime - this.startTime) : 0;
    console.log(_colors.bold('\nTest Suites: ') + `${this.failed > 0 ? _colors.red(this.failed + ' failed') : _colors.green(this.passed + ' passed')} | ${this.total} total`);
    console.log(_colors.bold('Tests:      ') + `${_colors.green(this.passed + ' passed')}, ${_colors.red(this.failed + ' failed')}, ${this.total} total`);
    console.log(_colors.bold('Time:       ') + `${(duration / 1000).toFixed(2)}s`);
    for (const result of this.testResults) {
      const suitePath = result.suite.length ? result.suite.join(' > ') + ' > ' : '';
      const statusColor = result.status === 'passed' ? _colors.green : _colors.red;
      console.log('  ' + statusColor(result.status.toUpperCase()) + ' ' + suitePath + result.name + _colors.gray(` (${result.duration}ms)`));
      if (result.status === 'failed' && result.error) {
        console.log(_colors.red('    ' + (result.error.stack || result.error)));
      }
    }
  }
}

module.exports = { Logger }