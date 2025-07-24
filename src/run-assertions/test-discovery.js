import path from 'path';
import fs from 'fs/promises';
import isEmptyDir from 'is-empty-dir';
import * as colors from 'colors/safe';

const SUPPORTED_PATTERNS = {
  '**/*.test.js': /\.test\.js$/,
  '**/*.spec.js': /\.spec\.js$/,
  '**/*.test.ts': /\.test\.ts$/,
  '**/*.spec.ts': /\.spec\.ts$/,
};

const DEFAULT_IGNORED_DIRS = new Set(['node_modules', '.git', '.next', 'dist', 'build']);

function compilePatterns(testMatch) {
  const compiled = [];

  for (const pattern of testMatch) {
    const regex = SUPPORTED_PATTERNS[pattern];
    if (!regex) {
      console.error(colors.red(`\n❌ Unsupported test pattern: ${pattern}`));
      console.log(colors.gray('\nSupported patterns:'));
      for (const key of Object.keys(SUPPORTED_PATTERNS)) {
        console.log(colors.gray(`  - ${key}`));
      }
      process.exit(1);
    }
    compiled.push(regex);
  }

  return compiled;
}

/**
 * @param {Object} options
 * @param {string} options.targetDir
 * @param {string[]} options.testMatch
 * @param {string[]} [options.ignoreDirs]
 * @returns {Promise<string[]>}
 */
export async function findTestFiles({ targetDir, testMatch, ignoreDirs = [] }) {
  const isDirEmpty = await isEmptyDir(targetDir, { ignore: [/^\./, 'node_modules'] });
  if (isDirEmpty) {
    console.error(colors.red(`\n❌ No test files found in directory: ${targetDir}`));
    process.exit(1);
  }

  const ignored = new Set([...DEFAULT_IGNORED_DIRS, ...ignoreDirs]);
  const compiledPatterns = compilePatterns(testMatch);

  const testFiles = [];
  const seenDirs = new Set();
  const dirQueue = [path.resolve(targetDir)];

  while (dirQueue.length > 0) {
    const currentDir = dirQueue.pop();

    if (seenDirs.has(currentDir)) continue;
    seenDirs.add(currentDir);

    let entries;
    try {
      entries = await fs.readdir(currentDir, { withFileTypes: true });
    } catch {
      continue; // Skip unreadable directory
    }

    const subDirs = [];

    await Promise.all(entries.map(async (entry) => {
      const name = entry.name;

      // Skip ignored dirs and dot-directories
      if (entry.isDirectory()) {
        if (name.startsWith('.') || ignored.has(name)) return;
        subDirs.push(path.join(currentDir, name));
        return;
      }

      // Files only
      if (entry.isFile()) {
        const absPath = path.join(currentDir, name);
        const relativePath = path.relative(process.cwd(), absPath).replace(/\\/g, '/');

        for (const regex of compiledPatterns) {
          if (regex.test(relativePath)) {
            testFiles.push(absPath);
            break;
          }
        }
      }
    }));

    dirQueue.push(...subDirs);
  }

  if (testFiles.length === 0) {
    console.error(colors.red(`\n❌ No test files matching the allowed patterns were found in: ${targetDir}`));
    process.exit(1);
  }

  return testFiles;
}
