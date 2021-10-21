const _colors = require('colors/safe');

class Logger {
  constructor() {
    this.total = 0;
    this.passed = 0;
    this.failed = 0;
  }

  perceive(context, msg) {
    if (context == 'describe') {
      console.log('\n' + msg);
    } else {
      console.log(msg);
    }
  }

  status(result) {
    this.total++;
    if (result) {
      this.passed++;
      console.log(' - ' + _colors.green('PASSED'));
    } else {
      this.failed++;
      console.log(' - ' + _colors.red('FAILED'));
    }
  }

  getStats() {
    return {
      'total': this.total,
      'passed': this.passed,
      'failed': this.failed
    }
  }

}

module.exports = { Logger }