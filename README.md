<p align="right">
  <a href="https://www.npmjs.com/package/@probe.gl/log">
    <img src="https://img.shields.io/npm/v/%40probe.gl%2Flog.svg?style=flat-square" alt="version" />
  </a>
  <a href="https://github.com/visgl/probe.gl/actions/workflows/test.yml?query=branch%3Amaster">
    <img src="https://github.com/visgl/probe.gl/actions/workflows/test.yml/badge.svg?branch=master" alt="build" />
  </a>
  <a href="https://www.npmjs.com/package/@probe.gl/log">
    <img src="https://img.shields.io/npm/dm/%40probe.gl%2Flog.svg?style=flat-square" alt="downloads" />
  </a>
</p>

<h1 align="center">probe.gl | <a href="https://visgl.github.io/probe.gl/docs/">Docs</a></h1>

probe.gl is a collection of JavaScript debugging, logging, instrumentation, benchmarking, and testing utilities for browser and Node.js applications.

Install the dependency-free runtime package:

```bash
npm install probe.gl
```

```ts
import {Log, Stats} from 'probe.gl';
import {isBrowser} from 'probe.gl/env';
import {Bench} from 'probe.gl/bench';
import {BenchResultsWidget} from 'probe.gl/bench-widget';
import {StatsWidget} from 'probe.gl/stats-widget';
```

The root exports logging and statistics. Focused entry points are `probe.gl/log`,
`probe.gl/env`, `probe.gl/stats`, `probe.gl/stats-widget`, `probe.gl/bench`, and
`probe.gl/bench-widget`. Importing the root does not load benchmarks or widgets.
Widget modules can be imported in Node; create widgets only when a DOM exists.

Existing `@probe.gl/log`, `@probe.gl/env`, `@probe.gl/stats`,
`@probe.gl/stats-widget`, and `@probe.gl/bench` packages remain compatibility
re-exports of the same implementations. The legacy React adapter and
`@probe.gl/test-utils` remain separate packages.

See the [documentation](https://visgl.github.io/probe.gl/docs/) for guides and API references.
