// Preserve package boundaries when esbuild sees the development TypeScript aliases.
// Without explicit externals, each public entry bundles its own logger/classes.
import {readdir, readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {existsSync} from 'node:fs';
import {build} from 'esbuild';

for (const name of await readdir(new URL('../modules/', import.meta.url))) {
  const root = resolve('modules', name);
  if (!existsSync(resolve(root, 'package.json'))) continue;
  const pkg = JSON.parse(await readFile(resolve(root, 'package.json'), 'utf8'));
  for (const entry of Object.values(pkg.exports || {})) {
    if (entry.import && entry.require) {
      await build({
        absWorkingDir: root,
        entryPoints: [entry.import],
        outfile: entry.require,
        bundle: true,
        format: 'cjs',
        target: 'node16',
        packages: 'external',
        external: ['probe.gl', 'probe.gl/*', '@probe.gl/*'],
        sourcemap: true,
        sourcesContent: false
      });
    }
  }
}
