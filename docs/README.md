---
sidebar_label: Introduction
---

# Introduction

probe.gl is a modular TypeScript toolbox for **logging**, **instrumentation**, and **benchmarking** in JavaScript applications. Start with a logger, then add counters, timers, or benchmark suites as needed.

The core utilities run in browsers and Node.js. The stats widget requires a DOM, and browser automation runs from Node.js. probe.gl has no WebGL dependency.

## Modules

Install `probe.gl` and import the entry points your application needs. Testing utilities remain a separate package.

| Module | Description |
| --- | --- |
| [`probe.gl/log`](./modules/log/log.md) | Console logging with levels, persistent settings, and timing output. |
| [`probe.gl/env`](./modules/env.md) | Runtime detection and portable global references. |
| [`probe.gl/stats`](./modules/stats/stats.md) | Counters and timing statistics. |
| [`probe.gl/stats-widget`](./modules/stats-widget/stats-widget.md) | A DOM widget for displaying statistics. |
| [`probe.gl/bench`](./modules/bench/bench.md) | Benchmark suites and comparisons with saved browser results. |
| [`probe.gl/bench-widget`](./modules/react-bench.md) | A plain DOM benchmark results table, with React integration. |
| [`@probe.gl/test-utils`](./articles/about-testing.md) | Function spies and Puppeteer-based browser automation. |

## Quick start

```bash
npm install probe.gl
```

```js
import {Log} from 'probe.gl/log';

const log = new Log({id: 'my-app'});
log.info('Application started')();
log.setLevel(1);
log.probe(1, 'Data loaded')();
```

Logging methods return a function. Call it immediately with the second pair of parentheses to emit the message and preserve useful console source locations.

See [logging and instrumentation](./get-started/adding-probes.md) for configuration, or [benchmarking](./get-started/benchmarking.md) to measure a function.

## Scope

probe.gl supports local debugging and performance measurement. It does not provide a service for collecting or shipping production logs. Logger settings persist in browser storage; importing `probe.gl/log` also installs the timing helper as `globalThis.probe` and its constructor as `globalThis.Probe`.

The consolidated `probe.gl` package provides the entry points above. Existing scoped packages remain compatibility re-exports; see the [upgrade guide](./upgrade-guide.md) for migration details.
