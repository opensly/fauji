// Async cache logic for Fauji
const fs = require('fs').promises;
const path = require('path');

const CACHE_FILE = path.join(process.cwd(), '.fauji-cache.json');

async function loadCache() {
  try {
    await fs.access(CACHE_FILE);
    const data = await fs.readFile(CACHE_FILE, 'utf8');
    return JSON.parse(data);
  } catch (e) {}
  return {};
}

async function saveCache(cache) {
  try {
    await fs.writeFile(CACHE_FILE, JSON.stringify(cache, null, 2));
  } catch (e) {}
}

module.exports = { loadCache, saveCache }; 