import isEmptyDir from 'is-empty-dir';
import { globSync } from 'glob';
import * as colors from 'colors/safe';

export async function findTestFiles({ targetDir, testMatch }) {
  // Validate the targetDir is legitimate or not
  const empty = await isEmptyDir(targetDir, { ignore: [/^\./, 'node_modules'] });
  if (empty) {
    console.log(colors.red(`\n Error: No test files found in directory: ${targetDir}`));
    process.exit(1);
  }
  let files = [];
  for (const pattern of testMatch) {
    files = files.concat(globSync(pattern, { cwd: targetDir, absolute: true, ignore: ['**/node_modules/**'] }));
  }
  if (files.length === 0) {
    console.log(colors.red(`\n Error: No test files matching the allowed patterns were found in targetDir: ${targetDir}`));
    process.exit(1);
  }
  return files;
}