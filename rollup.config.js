import path from 'path';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { builtinModules } from 'module';

// Custom plugin to transform dynamic imports in ESM build
function transformDynamicImports() {
  return {
    name: 'transform-dynamic-imports',
    transform(code, id) {
      // Only transform ESM files
      if (!id.endsWith('.js')) return null;

      // Replace .js with .mjs in dynamic imports using URL
      return {
        code: code.replace(
          /new URL\(['"](.+?)\.js['"]/g,
          (match, p1) => `new URL('${p1}.mjs'`
        ),
        map: null
      };
    }
  };
}

const external = [
  ...builtinModules,
  ...builtinModules.map(m => `node:${m}`),
  // Add your dependencies here if you want them external (e.g., 'jsdom')
  'jsdom',
  'is-empty-dir',
  'deep-equal-check',
  'colors',
  'diff',
  'file-system'
];

export default [
  // ESM build
  {
    input: [
      'src/index.js',
      'src/run-assertions/worker-thread.js'
    ],
    output: {
      dir: 'dist/esm',
      format: 'esm',
      entryFileNames: '[name].mjs',
      chunkFileNames: '[name]-[hash].mjs',
      sourcemap: true,
      exports: 'named',
      preserveModules: true,
      preserveModulesRoot: 'src',
    },
    external,
    plugins: [transformDynamicImports(), resolve(), commonjs(), json()]
  },
  // CJS build
  {
    input: [
      'src/index.js',
      'src/run-assertions/worker-thread.js'
    ],
    output: {
      dir: 'dist/cjs',
      format: 'cjs',
      entryFileNames: '[name].cjs',
      chunkFileNames: '[name]-[hash].cjs',
      sourcemap: true,
      exports: 'named',
      preserveModules: true,
      preserveModulesRoot: 'src',
    },
    external,
    plugins: [resolve(), commonjs(), json()]
  }
]; 