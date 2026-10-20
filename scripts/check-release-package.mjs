// Keep the release surface restricted to the dependency-free probe.gl package.
import assert from 'node:assert/strict';
import {readFile, readdir} from 'node:fs/promises';

const packages = [];
for (const parent of ['modules', 'examples']) {
  for (const entry of await readdir(parent, {withFileTypes: true})) {
    if (!entry.isDirectory()) continue;
    const name = entry.name;
    try {
      const pkg = JSON.parse(await readFile(`${parent}/${name}/package.json`, 'utf8'));
      if (!pkg.private) packages.push({path: `${parent}/${name}`, ...pkg});
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
  }
}
assert.deepEqual(packages.map((pkg) => [pkg.path, pkg.name]), [['modules/core', 'probe.gl']]);
const [pkg] = packages;
assert.equal(Object.keys(pkg.dependencies || {}).length, 0);
assert.equal(Object.keys(pkg.peerDependencies || {}).length, 0);
const {version} = JSON.parse(await readFile('lerna.json', 'utf8'));
assert.equal(pkg.version, version);
if (process.env.GITHUB_REF_TYPE === 'tag') {
  assert.equal(process.env.GITHUB_REF_NAME, `v${version}`);
}
console.log(`Only probe.gl@${version} is publishable; it has no runtime or peer dependencies.`);
