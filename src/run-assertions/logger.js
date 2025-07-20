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
    this.progressBarLength = 40;
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
      this.currentTest = { name: msg, suite: [...this.suiteStack], status: null, error: null, duration: 0, skipped: false };
      if (annotations && Object.keys(annotations).length) {
        this.currentTest.annotations = annotations;
      }
      this.currentTest.start = Date.now();
      let ann = annotations && Object.keys(annotations).length ? ' ' + colors.cyan(JSON.stringify(annotations)) : '';
      process.stdout.write('  ' + msg + ann);
    }
  }

  status(result, error = null, skipped = false) {
    this.total++;
    if (this.currentTest) {
      this.currentTest.duration = Date.now() - this.currentTest.start;
      this.currentTest.skipped = skipped;
      if (skipped) {
        this.skipped++;
        this.currentTest.status = 'skipped';
        console.log(' ' + colors.yellow('- SKIPPED'));
      } else if (result) {
        this.passed++;
        this.currentTest.status = 'passed';
        let slow = this.currentTest.duration > this.slowThreshold;
        let slowMsg = slow ? colors.yellow(' (SLOW)') : '';
        console.log(' ' + colors.green('✓') + slowMsg);
      } else {
        this.failed++;
        this.currentTest.status = 'failed';
        this.currentTest.error = error;
        console.log(' ' + colors.red('✗'));
        this.printErrorDetails(error);
      }
      this.testResults.push(this.currentTest);
      this.currentTest = null;
      this.printProgressBar();
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

  printProgressBar() {
    const done = this.passed + this.failed + this.skipped;
    const percent = done / this.total;
    const filled = Math.round(this.progressBarLength * percent);
    const bar = colors.green('█'.repeat(filled)) + colors.gray('░'.repeat(this.progressBarLength - filled));
    process.stdout.write(`\rProgress: [${bar}] ${done}/${this.total}`);
    if (done === this.total) process.stdout.write('\n');
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
        annotations: r.annotations || {},
      }))
    };
  }

  getResultsHTML() {
    const results = this.getResultsJSON();
    const html = [];
    html.push('<!DOCTYPE html><html><head><meta charset="utf-8"><title>Fauji Test Report</title>');
    html.push('<style>body{font-family:sans-serif;} .passed{color:green;} .failed{color:red;} .skipped{color:orange;} .suite{font-weight:bold;} .test{margin-left:2em;} .duration{color:gray;} pre{background:#f8f8f8;padding:1em;}</style>');
    html.push('</head><body>');
    html.push(`<h1>Fauji Test Report</h1>`);
    html.push(`<p><b>Total:</b> ${results.stats.total} &nbsp; <span class="passed">Passed:</span> ${results.stats.passed} &nbsp; <span class="failed">Failed:</span> ${results.stats.failed} &nbsp; <span class="skipped">Skipped:</span> ${results.stats.skipped} &nbsp; <b>Time:</b> ${(results.duration/1000).toFixed(2)}s</p>`);
    let lastSuite = [];
    for (const test of results.tests) {
      let suiteDiffIdx = 0;
      while (suiteDiffIdx < test.suite.length && lastSuite[suiteDiffIdx] === test.suite[suiteDiffIdx]) suiteDiffIdx++;
      for (let i = suiteDiffIdx; i < test.suite.length; i++) {
        html.push(`<div class="suite" style="margin-left:${i}em;">${test.suite[i]}</div>`);
      }
      lastSuite = test.suite;
      let statusClass = test.status;
      let slow = test.duration > this.slowThreshold;
      let slowMsg = slow ? ' <span style="color:orange;">(SLOW)</span>' : '';
      let ann = test.annotations && Object.keys(test.annotations).length ? `<span style='color:teal;'> ${JSON.stringify(test.annotations)}</span>` : '';
      html.push(`<div class="test ${statusClass}" style="margin-left:${test.suite.length}em;">${test.status === 'passed' ? '✓' : test.status === 'skipped' ? '-' : '✗'} ${test.name}${ann} <span class="duration">(${test.duration}ms${slowMsg})</span></div>`);
      if (test.status === 'failed' && test.error) {
        html.push(`<pre>${(test.error.stack || test.error).replace(/</g,'&lt;').replace(/>/g,'&gt;')}</pre>`);
      }
    }
    html.push('</body></html>');
    return html.join('\n');
  }

  printSummary() {
    this.endTimer();
    const duration = this.endTime && this.startTime ? (this.endTime - this.startTime) : 0;
    console.log(colors.bold('\nTest Suites: ') + `${this.failed > 0 ? colors.red(this.failed + ' failed') : colors.green(this.passed + ' passed')} | ${this.total} total | ${colors.yellow(this.skipped + ' skipped')}`);
    console.log(colors.bold('Tests:      ') + `${colors.green(this.passed + ' passed')}, ${colors.red(this.failed + ' failed')}, ${colors.yellow(this.skipped + ' skipped')}, ${this.total} total`);
    console.log(colors.bold('Time:       ') + `${(duration / 1000).toFixed(2)}s`);
    for (const result of this.testResults) {
      const suitePath = result.suite.length ? result.suite.join(' > ') + ' > ' : '';
      const statusColor = result.status === 'passed' ? colors.green : result.status === 'skipped' ? colors.yellow : colors.red;
      let slow = result.duration > this.slowThreshold;
      let slowMsg = slow ? colors.yellow(' (SLOW)') : '';
      console.log('  ' + statusColor(result.status.toUpperCase()) + ' ' + suitePath + result.name + colors.gray(` (${result.duration}ms)`) + slowMsg);
      if (result.status === 'failed' && result.error) {
        this.printErrorDetails(result.error);
      }
    }
  }
}

export { Logger };