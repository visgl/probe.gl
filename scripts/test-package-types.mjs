// Exercise installed package declarations without repository paths or source aliases.
import assert from 'node:assert/strict';
import {mkdtemp, writeFile, rm} from 'node:fs/promises';
import {resolve} from 'node:path';
import ts from 'typescript';

const directory = await mkdtemp(resolve('.probe-package-types-'));
try {
  const fixture = resolve(directory, 'consumer.ts');
  await writeFile(fixture, `
import log, {Log, Stats, Stat} from 'probe.gl';
import {isBrowser} from 'probe.gl/env';
import {Log as SubpathLog} from 'probe.gl/log';
import {Stats as SubpathStats} from 'probe.gl/stats';
import {StatsWidget} from 'probe.gl/stats-widget';
import {Bench} from 'probe.gl/bench';
import {BenchResultsWidget} from 'probe.gl/bench-widget';
export {log, Log, Stats, Stat, isBrowser, SubpathLog, SubpathStats, StatsWidget,
  Bench, BenchResultsWidget};
`);
  for (const moduleResolution of [ts.ModuleResolutionKind.Node10, ts.ModuleResolutionKind.Bundler]) {
    const program = ts.createProgram([fixture], {
      module: ts.ModuleKind.ESNext,
      moduleResolution,
      target: ts.ScriptTarget.ES2020,
      strict: true,
      noEmit: true,
      skipLibCheck: true,
      ignoreDeprecations: '6.0',
      types: ['node']
    });
    const diagnostics = ts.getPreEmitDiagnostics(program);
    assert.equal(diagnostics.length, 0, ts.formatDiagnosticsWithColorAndContext(diagnostics, {
      getCanonicalFileName: (file) => file,
      getCurrentDirectory: () => process.cwd(),
      getNewLine: () => '\n'
    }));
  }
  console.log('Flat package declarations pass legacy and bundler TypeScript resolution.');
} finally {
  await rm(directory, {recursive: true, force: true});
}
