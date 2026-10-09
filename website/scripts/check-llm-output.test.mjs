import assert from 'node:assert/strict';
import {mkdtempSync, mkdirSync, readFileSync, writeFileSync, rmSync} from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {test} from 'node:test';
import {fileURLToPath} from 'node:url';

const scriptsDirectory = path.dirname(fileURLToPath(import.meta.url));
const websiteDirectory = path.dirname(scriptsDirectory);
const checker = readFileSync(path.join(scriptsDirectory, 'check-llm-output.mjs'), 'utf8');
const siteUrl = 'https://visgl.github.io/probe.gl/';

function fixture(run) {
  // Keep fixtures under the website so the checker resolves its declared dependencies.
  const directory = mkdtempSync(path.join(websiteDirectory, '.llm-output-test-'));
  const write = (relativePath, content) => {
    const filePath = path.join(directory, relativePath);
    mkdirSync(path.dirname(filePath), {recursive: true});
    writeFileSync(filePath, content);
  };
  const pages = ['docs.md', 'docs/custom-route.md'];
  const index = '# probe.gl\n\n## docs\n\n' + pages.map(
    (page) => `- [Documentation](${siteUrl}${page})`
  ).join('\n');
  write('scripts/check-llm-output.mjs', checker);
  write('build/llms.txt', index);
  for (const page of pages) {
    write(`build/${page}`, '# Documentation\n\nA current documentation page with useful content.\n');
  }
  for (const [i, permalink] of ['/probe.gl/docs/', '/probe.gl/docs/custom-route'].entries()) {
    write(`.docusaurus/docusaurus-plugin-content-docs/default/doc-${i}.json`,
      JSON.stringify({version: 'current', permalink, draft: false}));
  }
  // Versioned documents and drafts are not expected in current generated output.
  write('.docusaurus/docusaurus-plugin-content-docs/default/old.json',
    JSON.stringify({version: 'v1', permalink: '/probe.gl/docs/v1/old'}));
  write('.docusaurus/docusaurus-plugin-content-docs/default/draft.json',
    JSON.stringify({version: 'current', permalink: '/probe.gl/docs/draft', draft: true}));
  const check = () => spawnSync(process.execPath,
    [path.join(directory, 'scripts/check-llm-output.mjs')], {encoding: 'utf8'});
  try {
    run({write, check, directory, index});
  } finally {
    rmSync(directory, {recursive: true, force: true});
  }
}

test('valid current routes, custom slugs, and reference links pass', () => fixture(({write, check}) => {
  write('build/docs.md', '# Documentation\n\n[API][api]\n\n[api]: ./docs/custom-route.md\n');
  const result = check();
  assert.equal(result.status, 0, result.stderr);
}));

for (const reference of ['[API][api]', '[api][]', '[api]', '![API][api]']) {
  test(`rejects broken reference link: ${reference}`, () => fixture(({write, check}) => {
    write('build/docs.md', `# Documentation\n\n${reference}\n\n[api]: ./missing.md\n`);
    const result = check();
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /broken Markdown links/);
  }));
}

test('ignores Markdown-looking links inside code fences', () => fixture(({write, check}) => {
  write('build/docs.md', '# Documentation\n\n```md\n[API](./missing.md)\n[api]: ./missing.md\n```\n');
  const result = check();
  assert.equal(result.status, 0, result.stderr);
}));

test('rejects a current page missing from both files and index', () => fixture(({write, check, directory}) => {
  rmSync(path.join(directory, 'build/docs/custom-route.md'));
  write('build/llms.txt', '# probe.gl\n\n## docs\n\n' + `- [Documentation](${siteUrl}docs.md)\n`);
  const result = check();
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /is missing .*custom-route.md/);
}));

test('rejects an indexed current page without its generated file', () => fixture(({check, directory}) => {
  rmSync(path.join(directory, 'build/docs/custom-route.md'));
  const result = check();
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /missing docs\/custom-route.md/);
}));
