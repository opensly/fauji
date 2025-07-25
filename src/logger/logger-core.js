import * as colors from 'colors/safe';
import { printErrorDetails } from './print-error-details.js';

class Logger {
  constructor({ stdout = process.stdout, stderr = process.stderr } = {}) {
    this.total = 0;
    this.passed = 0;
    this.failed = 0;
    this.skipped = 0;
    this.testResults = [];
    this.suiteStack = [];
    this.startTime = null;
    this.endTime = null;
    this.lastError = null;
    this.slowThreshold = 500; // ms
    this.stdout = stdout;
    this.stderr = stderr;
  }

  startTimer() {
    this.startTime = Date.now();
  }

  endTimer() {
    this.endTime = Date.now();
  }

  perceive(context, msg, annotations) {
    if (context === 'describe') {
      // Suppress printing of the 'root' suite
      if (msg === 'root') return;
      this.suiteStack.push(msg);
      this.stdout.write(colors.bold('\n' + msg) + '\n');
    } else if (context === 'test') {
      const startTime = Date.now();
      this.currentTest = { 
        name: msg, 
        suite: [...this.suiteStack], 
        status: null, 
        error: null, 
        duration: 0, 
        skipped: false,
        startTime: startTime
      };
    }
  }

  status(result, error = null, skipped = false) {
    this.total++;
    if (this.currentTest) {
      const endTime = Date.now();
      this.currentTest.endTime = endTime;
      this.currentTest.duration = endTime - this.currentTest.startTime;
      this.currentTest.skipped = skipped;
      const testName = this.currentTest.name;
      if (skipped) {
        this.skipped++;
        this.currentTest.status = 'skipped';
        this.stdout.write('  ' + colors.yellow('- SKIPPED') + ' ' + testName + '\n');
      } else if (result) {
        this.passed++;
        this.currentTest.status = 'passed';
        let slow = this.currentTest.duration > this.slowThreshold;
        let slowMsg = slow ? colors.yellow(' (SLOW)') : '';
        this.stdout.write('  ' + colors.green('✓') + ' ' + testName + slowMsg + '\n');
      } else {
        // When result is false (test failed), mark as failed
        this.failed++;
        this.currentTest.status = 'failed';
        this.currentTest.error = error;
        this.stdout.write('  ' + colors.red('✗') + ' ' + testName + '\n');
        // Print error details immediately after the test status
        printErrorDetails(error, this.stdout);
      }
      this.testResults.push(this.currentTest);
      this.currentTest = null;
    }
  }

  error(message) {
    this.lastError = message;
    this.stderr.write(colors.red(message) + '\n');
  }

  getStats() {
    return {
      total: this.total,
      passed: this.passed,
      failed: this.failed,
      skipped: this.skipped
    };
  }

  getResultsJSON() {
    return {
      stats: this.getStats(),
      duration: this.endTime && this.startTime ? (this.endTime - this.startTime) : 0,
      tests: this.testResults.map(r => ({
        name: r.name,
        suite: r.suite,
        status: r.status,
        error: r.error ? (r.error.stack || r.error.toString()) : null,
        duration: r.duration,
        startTime: r.startTime,
        endTime: r.endTime,
        annotations: r.annotations || {},
      }))
    };
  }

  // This method is now only called from test-execution.js for the final summary
  printSummary() {
    if (!this.endTime && this.startTime) {
      this.endTimer();
    }
    
    const duration = this.endTime && this.startTime ? (this.endTime - this.startTime) : 0;
    
    if (this.testResults.length === 0) {
      return;
    }
    
    // Use suite counts if available (from test-execution.js), otherwise fall back to test counts
    const totalSuites = this.totalSuites || this.total;
    const passedSuites = this.passedSuites || this.passed;
    const failedSuites = this.failedSuites || this.failed;
    
    this.stdout.write(
      colors.bold(' Test Suites: ') + 
      `${failedSuites > 0 ? colors.red(failedSuites + ' failed') : colors.green(passedSuites + ' passed')} | ${totalSuites} total` + '\n'
    );
    this.stdout.write(
      colors.bold(' Tests:       ') + 
      `${colors.green(this.passed + ' passed')}, ${colors.red(this.failed + ' failed')}, ${colors.yellow(this.skipped + ' skipped')}, ${this.total} total` + '\n'
    );
    this.stdout.write(
      colors.bold(' Time:        ') + `${(duration / 1000).toFixed(3)}s` + '\n'
    );
  }
}

export { Logger };
