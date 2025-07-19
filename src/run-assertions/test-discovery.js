// Async test file discovery for Fauji
const fs = require('fs').promises;
const path = require('path');

async function findTestFiles({ dir, pattern, name }) {
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

module.exports = { findTestFiles }; 