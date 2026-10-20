import {readFile} from 'node:fs/promises';

const pkg = JSON.parse(await readFile(new URL('../modules/core/package.json', import.meta.url), 'utf8'));
const version = process.argv[2] || pkg.version;
// Build metadata does not make a version a prerelease.
const prerelease = version.split('+')[0].includes('-');
console.log(`tag=${prerelease ? 'beta' : 'latest'}`);
