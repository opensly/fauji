// Async test file discovery for Fauji
import fs from 'fs/promises';
import path from 'path';
import isEmptyDir from 'is-empty-dir';

export async function findTestFiles({ dir, pattern, name }) {
  // Check if the directory is empty (ignoring dotfiles and node_modules)
  const empty = await isEmptyDir(dir, { ignore: [/^\./, 'node_modules'] });
  if (empty) {
    console.warn(`No test files found in directory: ${dir}`);
    return [];
  }

  let testFiles = [];
  async function getFilesOfDir(currentDir) {
    const items = await fs.readdir(currentDir);
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = await fs.stat(fullPath);
      if (stat.isDirectory()) {
        await getFilesOfDir(fullPath);
      } else if (
        (!pattern || item.includes(pattern)) &&
        (!name || item.includes(name))
      ) {
        testFiles.push(fullPath);
      }
    }
  }
  await getFilesOfDir(dir);
  return testFiles;
} 