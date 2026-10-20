// Run after yarn build. Check published exports without the development aliases.
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {readFile} from 'node:fs/promises';
const require = createRequire(import.meta.url);
const core = JSON.parse(await readFile(new URL('../modules/core/package.json', import.meta.url), 'utf8'));
assert.deepEqual(Object.keys(core.exports), ['.', './log', './env', './stats', './stats-widget', './bench', './bench-widget']);
assert.equal(Object.keys(core.dependencies || {}).length, 0);
assert.equal(Object.keys(core.peerDependencies || {}).length, 0);
assert.equal(typeof document, 'undefined');

const root = require('probe.gl');
assert.equal(root.Log, require('probe.gl/log').Log);
assert.equal(root.default, require('probe.gl/log').default);
assert.equal(root.Stats, require('probe.gl/stats').Stats);
assert.ok(!Object.keys(require.cache).some((file) => /core\/dist\/(bench|stats-widget)/.test(file)));

for (const load of [async (name) => require(name), async (name) => import(name)]) {
  const main = await load('probe.gl');
  const log = await load('probe.gl/log');
  assert.equal(main.Log, log.Log);
  assert.equal(main.default, log.default);
  assert.equal(main.Stats, (await load('probe.gl/stats')).Stats);
  for (const [oldName, newName] of [
    ['@probe.gl/env', 'probe.gl/env'],
    ['@probe.gl/log', 'probe.gl/log'],
    ['@probe.gl/stats', 'probe.gl/stats'],
    ['@probe.gl/stats-widget', 'probe.gl/stats-widget'],
    ['@probe.gl/bench', 'probe.gl/bench'],
    ['@probe.gl/bench/widget', 'probe.gl/bench-widget']
  ]) {
    const legacy = await load(oldName);
    const current = await load(newName);
    for (const key of Object.keys(current)) {
      if (key !== '__esModule') assert.equal(legacy[key], current[key], `${oldName}: ${key}`);
    }
  }
}
console.log('All flat ESM/CommonJS exports load without a DOM; compatibility identities match.');
