#!/usr/bin/env node
/** Build the real private desktop frontend without copying its source into this repo. */
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { cp, mkdtemp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const sourceRoot = path.resolve(process.argv[2] || path.join(siteRoot, '..'));
const desktopRoot = path.join(sourceRoot, 'apps/desktop');
const require = createRequire(path.join(desktopRoot, 'package.json'));
const viteEntry = path.join(path.dirname(require.resolve('vite/package.json')), 'dist/node/index.js');
const { build, loadConfigFromFile, mergeConfig } = await import(pathToFileURL(viteEntry).href);
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const { default: tailwindConfig } = await import(pathToFileURL(path.join(desktopRoot, 'tailwind.config.js')).href);
const temporaryRoot = await mkdtemp(path.join(desktopRoot, '.marker-site-demo-'));
const outputRoot = path.join(siteRoot, 'assets/demo');

try {
  await cp(path.join(siteRoot, 'demo'), temporaryRoot, { recursive: true });
  await writeFile(path.join(temporaryRoot, 'tsconfig.json'), JSON.stringify({
    extends: path.join(desktopRoot, 'tsconfig.json'),
    include: ['entry.tsx', 'documents.ts', 'fixtures.ts', path.join(desktopRoot, 'src/vite-env.d.ts')],
    references: [],
  }));
  execFileSync(process.execPath, [require.resolve('typescript/bin/tsc'), '--project', path.join(temporaryRoot, 'tsconfig.json')], {
    cwd: desktopRoot, stdio: 'inherit',
  });
  const loaded = await loadConfigFromFile({ command: 'build', mode: 'production' }, path.join(desktopRoot, 'vite.config.ts'));
  if (!loaded) throw new Error('The Marker frontend Vite configuration could not be loaded.');
  await build(mergeConfig(loaded.config, {
    configFile: false,
    logLevel: 'warn',
    root: temporaryRoot,
    base: './',
    publicDir: false,
    envDir: false,
    resolve: { alias: [{ find: '@marker/fixtures', replacement: path.join(temporaryRoot, 'fixtures.ts') }] },
    css: {
      postcss: {
        plugins: [tailwindcss({
          ...tailwindConfig,
          content: [path.join(desktopRoot, 'index.html'), path.join(desktopRoot, 'src/**/*.{js,ts,jsx,tsx}'), path.join(temporaryRoot, '**/*.{html,tsx}')],
        }), autoprefixer()],
      },
    },
    build: {
      outDir: outputRoot,
      emptyOutDir: true,
      target: 'es2022',
      minify: 'esbuild',
      sourcemap: false,
      assetsInlineLimit: file => path.basename(file) === 'sample-image.png' ? true : undefined,
      rollupOptions: { output: { sourcemap: false } },
    },
  }));
  await cp(path.join(desktopRoot, 'public/marker-icon.svg'), path.join(outputRoot, 'marker-icon.svg'));
  for (const runtime of ['javascript-sandbox.js', 'preview-network.js', 'preview-size.js']) {
    await cp(path.join(desktopRoot, 'public', runtime), path.join(outputRoot, runtime));
  }
  for (const [source, destination] of [
    ['OFL.txt', 'MarkerExport-OFL.txt'],
    ['OFL-Symbols.txt', 'MarkerExport-Symbols-OFL.txt'],
  ]) {
    await cp(path.join(desktopRoot, 'src/export/fonts', source), path.join(outputRoot, destination));
  }
  // Only distributable browser files are allowed in the public output.
  const allowed = new Set(['.html', '.js', '.css', '.woff', '.woff2', '.ttf', '.png', '.svg', '.txt']);
  const pending = [outputRoot];
  let count = 0;
  while (pending.length > 0) {
    const directory = pending.pop();
    for (const item of await readdir(directory, { withFileTypes: true })) {
      const filename = path.join(directory, item.name);
      if (item.isDirectory()) pending.push(filename);
      else if (!item.isFile() || !allowed.has(path.extname(item.name))) {
        throw new Error(`Unexpected public demo output: ${path.relative(outputRoot, filename)}`);
      } else {
        count += 1;
        if (['.js', '.css', '.html'].includes(path.extname(filename))) {
          const text = await readFile(filename, 'utf8');
          if (/sourceMappingURL|\/Users\/|BEGIN (?:OPENSSH|RSA|EC|PRIVATE) KEY/.test(text)) {
            throw new Error(`Private source or debug metadata found in ${item.name}`);
          }
        }
      }
    }
  }
  await mkdir(outputRoot, { recursive: true });
  const revision = execFileSync('git', ['-C', sourceRoot, 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
  const sourceDirty = execFileSync('git', ['-C', sourceRoot, 'status', '--porcelain', '--untracked-files=no', '--', 'apps/desktop', 'packages'], { encoding: 'utf8' }).trim().length > 0;
  await writeFile(path.join(outputRoot, 'build.json'), `${JSON.stringify({ sourceRevision: revision, sourceDirty, files: count, sourcemaps: false }, null, 2)}\n`);
  process.stdout.write(`Built Marker web experience (${count} browser assets, source ${revision.slice(0, 7)}).\n`);
} finally {
  await rm(temporaryRoot, { recursive: true, force: true });
}
