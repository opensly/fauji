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
      // FIX: Capture start time properly
      const startTime = Date.now();
      this.currentTest = { 
        name: msg, 
        suite: [...this.suiteStack], 
        status: null, 
        error: null, 
        duration: 0, 
        skipped: false,
        startTime: startTime  // Store the start time
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
      // FIX: Calculate duration properly using stored start time
      const endTime = Date.now();
      this.currentTest.endTime = endTime;
      this.currentTest.duration = endTime - this.currentTest.startTime;
      this.currentTest.skipped = skipped;
      
      if (skipped) {
        this.skipped++;
        this.currentTest.status = 'skipped';
        console.log('  ' + colors.yellow('- SKIPPED') + ' ' + this.currentTest.name);
      } else if (result) {
        this.passed++;
        this.currentTest.status = 'passed';
        let slow = this.currentTest.duration > this.slowThreshold;
        let slowMsg = slow ? colors.yellow(' (SLOW)') : '';
        console.log('  ' + colors.green('✓') + ' ' + this.currentTest.name + slowMsg);
      } else {
        this.failed++;
        this.currentTest.status = 'failed';
        this.currentTest.error = error;
        console.log('  ' + colors.red('✗') + ' ' + this.currentTest.name);
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
    if (error.expected !== undefined && error.actual !== undefined) {
      // Assertion diff
      const diffLines = diff.createPatch('difference', String(error.expected), String(error.actual)).split('\n').slice(4);
      console.error(colors.red('--- Expected'));
      console.error(colors.green('+++ Received'));
      diffLines.forEach(line => {
        if (line.startsWith('-')) console.error(colors.red(line));
        else if (line.startsWith('+')) console.error(colors.green(line));
        else console.error(line);
      });
    }
    // Code frame
    if (error.stack) {
      const match = error.stack.match(/\(([^)]+):(\d+):(\d+)\)/);
      if (match) {
        const [file, line] = [match[1], parseInt(match[2], 10)];
        try {
          const lines = fs.readFileSync(file, 'utf8').split('\n');
          const start = Math.max(0, line - 3);
          const end = Math.min(lines.length, line + 2);
          for (let i = start; i < end; i++) {
            const prefix = (i + 1 === line) ? colors.bgRed.white('>') : ' ';
            console.error(prefix + ' ' + (i + 1).toString().padStart(4) + ' | ' + lines[i]);
          }
        } catch {}
      }
    }
    // Stack trace
    if (error.stack) {
      console.error(colors.gray(error.stack));
    } else {
      console.error(colors.red(error.toString()));
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

  printSummary() {
    // FIX: Ensure endTimer is called if not already
    if (!this.endTime && this.startTime) {
      this.endTimer();
    }
    
    const duration = this.endTime && this.startTime ? (this.endTime - this.startTime) : 0;
    if (this.testResults.length === 0) {
      console.log(colors.yellow('No tests found.'));
      return;
    }
    
    for (const result of this.testResults) {
      const suitePath = result.suite.filter(s => s !== 'root').length 
        ? result.suite.filter(s => s !== 'root').join(' > ') + ' > ' 
        : '';
      const statusColor = result.status === 'passed' ? colors.green : result.status === 'skipped' ? colors.yellow : colors.red;
      let slow = result.duration > this.slowThreshold;
      let slowMsg = slow ? colors.yellow(' (SLOW)') : '';
      
      console.log(
        '  ' + 
        statusColor(result.status.toUpperCase()) + 
        ' ' + 
        suitePath + 
        result.name + 
        colors.gray(` (${result.duration}ms)`) + 
        slowMsg
      );

      if (result.status === 'failed' && result.error) {
        this.printErrorDetails(result.error);
      }
    }
    
    console.log(
      colors.bold(`\n Test Suites: `) + 
      `${this.failed > 0 ? colors.red(this.failed + ' failed') : colors.green(this.passed + ' passed')} | ${this.total} total | ${colors.yellow(this.skipped + ' skipped')}`
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
