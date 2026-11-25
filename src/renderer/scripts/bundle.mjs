import { bundle } from '@remotion/bundler';
import { rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(projectRoot, 'dist', 'bundle');

await rm(outDir, { recursive: true, force: true });

const bundlePath = await bundle({
  entryPoint: path.join(projectRoot, 'src', 'index.ts'),
  outDir,
});

console.log(`Remotion bundle created at ${bundlePath}`);
