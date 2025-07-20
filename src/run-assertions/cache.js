import fs from 'fs';

export async function loadCache() {
  try {
    const data = fs.readFileSync('.fauji-cache.json', 'utf8');
    return JSON.parse(data);
  } catch {
    return {};
  }
}

export async function saveCache(cache) {
  fs.writeFileSync('.fauji-cache.json', JSON.stringify(cache, null, 2), 'utf8');
} 