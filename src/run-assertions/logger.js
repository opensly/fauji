import * as colors from 'colors/safe';
import * as diff from 'diff';
import fs from 'fs';

class Logger {
  constructor() {
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
  }

  startTimer() {
    this.startTime = Date.now();
  }

  endTimer() {
    this.endTime = Date.now();
  }

  perceive(context, msg, annotations) {
    if (context === 'describe') {
      this.suiteStack.push(msg);
      let ann = annotations && Object.keys(annotations).length ? ' ' + colors.cyan(JSON.stringify(annotations)) : '';
      console.log(colors.bold('\n' + msg) + ann);
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
      process.stdout.write('  ' + msg + ann);
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
        console.log('  ' + colors.yellow('- SKIPPED'));
      } else if (result) {
        this.passed++;
        this.currentTest.status = 'passed';
        let slow = this.currentTest.duration > this.slowThreshold;
        let slowMsg = slow ? colors.yellow(' (SLOW)') : '';
        console.log('  ' + colors.green('✓') + slowMsg);
      } else {
        // When result is false (test failed), mark as failed
        this.failed++;
        this.currentTest.status = 'failed';
        this.currentTest.error = error;
        console.log('  ' + colors.red('✗'));
        // Print error details immediately after the test status
        this.printErrorDetails(error);
      }
      
      this.testResults.push(this.currentTest);
      this.currentTest = null;
    }
  }

  error(message) {
    this.lastError = message;
    console.error(colors.red(message));
  }

  printErrorDetails(error) {
    if (!error) return;
    
    // Show assertion differences more clearly
    if (error.expected !== undefined && error.actual !== undefined) {
      console.error(colors.red('\n    Difference:'));
      console.error(colors.red('    - Expected: ') + String(error.expected));
      console.error(colors.green('    + Received: ') + String(error.actual));
      
      // Create diff for better visualization - but only if values are actually different
      if (String(error.expected) !== String(error.actual)) {
        try {
          const diffLines = diff.createPatch('difference', String(error.expected), String(error.actual)).split('\n').slice(4);
          if (diffLines.length > 0) {
            diffLines.forEach(line => {
              if (line.startsWith('-')) console.error('    ' + colors.red(line));
              else if (line.startsWith('+')) console.error('    ' + colors.green(line));
              else if (line.trim()) console.error('    ' + line);
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
            console.error(colors.red('\n    Difference:'));
            diffShown = true;
            hasShownDiff = true;
          }
          inDiffSection = true;
        } else if (inDiffSection && line.trim()) {
          if (line.startsWith('- Expected:')) {
            console.error(colors.red('    ' + line));
          } else if (line.startsWith('+ Received:')) {
            console.error(colors.green('    ' + line));
          } else if (line.startsWith('-') || line.startsWith('+')) {
            console.error('    ' + line);
          } else {
            console.error('    ' + colors.gray(line));
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
          console.error(colors.gray(`\n    at ${file}:${lineNum}`));
          for (let i = start; i < end; i++) {
            const prefix = (i + 1 === lineNum) ? colors.bgRed.white(' > ') : '   ';
            console.error(prefix + ' ' + (i + 1).toString().padStart(4) + ' | ' + lines[i]);
          }
        } catch {}
      } else if (location) {
        console.error(colors.gray(`\n    at ${location}`));
      }
    }
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
    
    console.log(colors.bold('\n=== Test Results Summary ==='));
    
    // Use suite counts if available (from test-execution.js), otherwise fall back to test counts
    const totalSuites = this.totalSuites || this.total;
    const passedSuites = this.passedSuites || this.passed;
    const failedSuites = this.failedSuites || this.failed;
    const skippedSuites = this.skippedSuites || this.skipped;
    
    console.log(
      colors.bold(' Test Suites: ') + 
      `${failedSuites > 0 ? colors.red(failedSuites + ' failed') : colors.green('all passed')} | ${totalSuites} total | ${colors.yellow(skippedSuites + ' skipped')}`
    );
    console.log(
      colors.bold(' Tests:       ') + 
      `${colors.green(this.passed + ' passed')}, ${colors.red(this.failed + ' failed')}, ${colors.yellow(this.skipped + ' skipped')}, ${this.total} total`
    );
    console.log(
      colors.bold(' Time:        ') + `${(duration / 1000).toFixed(3)}s`
    );
  }
}

export { Logger };
