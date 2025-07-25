import * as colors from 'colors/safe';
import * as diff from 'diff';
import fs from 'fs';

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
      let ann = annotations && Object.keys(annotations).length ? ' ' + colors.cyan(JSON.stringify(annotations)) : '';
      this.stdout.write(colors.bold('\n' + msg) + ann + '\n');
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
      if (annotations && Object.keys(annotations).length) {
        this.currentTest.annotations = annotations;
      }
      let ann = annotations && Object.keys(annotations).length ? ' ' + colors.cyan(JSON.stringify(annotations)) : '';
      this.stdout.write('  ' + msg + ann);
    }
  }

  status(result, error = null, skipped = false) {
    this.total++;
    if (this.currentTest) {
      const endTime = Date.now();
      this.currentTest.endTime = endTime;
      this.currentTest.duration = endTime - this.currentTest.startTime;
      this.currentTest.skipped = skipped;
      
      if (skipped) {
        this.skipped++;
        this.currentTest.status = 'skipped';
        this.stdout.write('  ' + colors.yellow('- SKIPPED') + '\n');
      } else if (result) {
        this.passed++;
        this.currentTest.status = 'passed';
        let slow = this.currentTest.duration > this.slowThreshold;
        let slowMsg = slow ? colors.yellow(' (SLOW)') : '';
        this.stdout.write('  ' + colors.green('✓') + slowMsg + '\n');
      } else {
        // When result is false (test failed), mark as failed
        this.failed++;
        this.currentTest.status = 'failed';
        this.currentTest.error = error;
        this.stdout.write('  ' + colors.red('✗') + '\n');
        // Print error details immediately after the test status
        this.printErrorDetails(error);
      }
      this.testResults.push(this.currentTest);
      this.currentTest = null;
    }
  }

  error(message) {
    this.lastError = message;
    this.stderr.write(colors.red(message) + '\n');
  }

  printErrorDetails(error) {
    if (!error) return;
    
    // Show assertion differences more clearly
    if (error.expected !== undefined && error.actual !== undefined) {
      this.stdout.write(colors.red('    Difference:') + '\n');
      this.stdout.write(colors.red('    - Expected: ') + String(error.expected) + '\n');
      this.stdout.write(colors.green('    + Received: ') + String(error.actual) + '\n');
      
      // Create diff for better visualization - but only if values are actually different
      if (String(error.expected) !== String(error.actual)) {
        try {
          const diffLines = diff.createPatch('difference', String(error.expected), String(error.actual)).split('\n').slice(4);
          if (diffLines.length > 0) {
            diffLines.forEach(line => {
              if (line.startsWith('-')) this.stdout.write('    ' + colors.red(line) + '\n');
              else if (line.startsWith('+')) this.stdout.write('    ' + colors.green(line) + '\n');
              else if (line.trim()) this.stdout.write('    ' + line + '\n');
            });
          }
        } catch (e) {
          // If diff creation fails, just show the basic expected/received
        }
      }
    } else if (error.message && error.message.includes('Difference:')) {
      // Handle assertion errors that already have formatted difference in message
      const lines = error.message.split('\n');
      let inDiffSection = false;
      let diffShown = false;
      let hasShownDiff = false;
      
      lines.forEach(line => {
        if (line.includes('Difference:')) {
          if (!diffShown && !hasShownDiff) {
            this.stdout.write(colors.red('    Difference:') + '\n');
            diffShown = true;
            hasShownDiff = true;
          }
          inDiffSection = true;
        } else if (inDiffSection && line.trim()) {
          if (line.startsWith('- Expected:')) {
            this.stdout.write('    ' + line + '\n');
          } else if (line.startsWith('+ Received:')) {
            this.stdout.write('    ' + line + '\n');
          } else if (line.startsWith('-') || line.startsWith('+')) {
            this.stdout.write('    ' + line + '\n');
          } else {
            this.stdout.write('    ' + colors.gray(line) + '\n');
          }
        }
      });
    }
    
    // User-focused stack/code frame
    if (error.stack) {
      // Find the first stack frame that is not internal or in node_modules/fauji
      const stackLines = error.stack.split('\n');
      let userFrame = null;
      for (const line of stackLines) {
        if (
          line.includes('.js') &&
          !line.includes('node_modules/fauji') &&
          !line.includes('node:internal') &&
          !line.includes('matchers/utils') &&
          !line.includes('run-assertions/logger')
        ) {
          userFrame = line;
          break;
        }
      }
      // If not found, fall back to the first non-internal frame
      if (!userFrame) {
        userFrame = stackLines.find(l => l.includes('.js') && !l.includes('node:internal')) || stackLines[1];
      }
      let location = '';
      let file = '', lineNum = 0;
      const match = userFrame && (userFrame.match(/\(([^)]+):(\d+):(\d+)\)/) || userFrame.match(/at ([^ ]+):(\d+):(\d+)/));
      if (match && match[1] && match[2]) {
        location = match[1] + ':' + match[2];
        file = match[1];
        lineNum = parseInt(match[2], 10);
      }
      if (file && lineNum) {
        try {
          const lines = fs.readFileSync(file, 'utf8').split('\n');
          const start = Math.max(0, lineNum - 3);
          const end = Math.min(lines.length, lineNum + 2);
          this.stdout.write(colors.gray(`\n    at ${file}:${lineNum}`) + '\n');
          for (let i = start; i < end; i++) {
            const prefix = (i + 1 === lineNum) ? colors.bgRed.white(' > ') : '   ';
            this.stdout.write(prefix + ' ' + (i + 1).toString().padStart(4) + ' | ' + lines[i] + '\n');
          }
        } catch {}
      } else if (location) {
        this.stdout.write(colors.gray(`\n    at ${location}`) + '\n');
      }
    }
    // Add a trailing newline for spacing before the next test
    this.stdout.write('\n');
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
    
    this.stdout.write(colors.bold('\n=== Test Results Summary ===') + '\n');
    
    // Use suite counts if available (from test-execution.js), otherwise fall back to test counts
    const totalSuites = this.totalSuites || this.total;
    const passedSuites = this.passedSuites || this.passed;
    const failedSuites = this.failedSuites || this.failed;
    const skippedSuites = this.skippedSuites || this.skipped;
    
    this.stdout.write(
      colors.bold(' Test Suites: ') + 
      `${failedSuites > 0 ? colors.red(failedSuites + ' failed') : colors.green('all passed')} | ${totalSuites} total | ${colors.yellow(skippedSuites + ' skipped')}` + '\n'
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
