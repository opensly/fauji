import * as colors from 'colors/safe';
import * as diff from 'diff';
import fs from 'fs';

function formatValue(val) {
  if (typeof val === 'string') return JSON.stringify(val);
  if (typeof val === 'object') return JSON.stringify(val, null, 2);
  return String(val);
}

export function printErrorDetails(error, outStream) {
  if (!error) return;

  const isPrimitive = val => val === null || (typeof val !== 'object' && typeof val !== 'function');
  const isMultilineString = val => typeof val === 'string' && val.includes('\n');
  const isObjectOrArray = val => val && typeof val === 'object';

  // Jest-style output for custom matcher failures
  if (error.expected === undefined && error.matcherName) {
    outStream.write('    expect(received).' + error.matcherName + '()\n\n');
    outStream.write('    Received: ' + formatValue(error.actual) + '\n\n');
    return;
  }

  if (error.expected !== undefined && error.actual !== undefined) {
    outStream.write(colors.red('    Difference:') + '\n');
    outStream.write(colors.red('    - Expected: ') + String(error.expected) + '\n');
    outStream.write(colors.green('    + Received: ') + String(error.actual) + '\n');

    // Only show patch diff for objects, arrays, or multi-line strings
    if (
      (isObjectOrArray(error.expected) && isObjectOrArray(error.actual)) ||
      isMultilineString(error.expected) ||
      isMultilineString(error.actual)
    ) {
      try {
        const diffLines = diff.createPatch('difference', String(error.expected), String(error.actual)).split('\n').slice(4);
        if (diffLines.length > 0) {
          diffLines.forEach(line => {
            if (line.startsWith('-')) outStream.write('    ' + colors.red(line) + '\n');
            else if (line.startsWith('+')) outStream.write('    ' + colors.green(line) + '\n');
            else if (line.trim()) outStream.write('    ' + line + '\n');
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
          outStream.write(colors.red('    Difference:') + '\n');
          diffShown = true;
          hasShownDiff = true;
        }
        inDiffSection = true;
      } else if (inDiffSection && line.trim()) {
        if (line.startsWith('- Expected:')) {
          outStream.write('    ' + line + '\n');
        } else if (line.startsWith('+ Received:')) {
          outStream.write('    ' + line + '\n');
        } else if (line.startsWith('-') || line.startsWith('+')) {
          outStream.write('    ' + line + '\n');
        } else {
          outStream.write('    ' + colors.gray(line) + '\n');
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
        outStream.write(colors.gray(`\n    at ${file}:${lineNum}`) + '\n');
        for (let i = start; i < end; i++) {
          const prefix = (i + 1 === lineNum) ? colors.bgRed.white(' > ') : '   ';
          outStream.write(prefix + ' ' + (i + 1).toString().padStart(4) + ' | ' + lines[i] + '\n');
        }
      } catch {}
    } else if (location) {
      outStream.write(colors.gray(`\n    at ${location}`) + '\n');
    }
  }
  // Add a trailing newline for spacing before the next test
  outStream.write('\n');
}
