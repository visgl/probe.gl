---
sidebar_label: Introduction
---

# Introduction

probe.gl is a modular TypeScript toolbox for **logging**, **instrumentation**, and **benchmarking** in JavaScript applications. Start with a logger, then add counters, timers, or benchmark suites as needed.

The core utilities run in browsers and Node.js. The widgets require a DOM when constructed. probe.gl has no WebGL dependency.

## Export entry points

Install `probe.gl` and import the entry points your application needs. Version 5 no longer includes the former testing utilities.

| Entry point | Description |
| --- | --- |
| [`probe.gl/log`](./api/log.md) | Console logging with levels, persistent settings, and timing output. |
| [`probe.gl/env`](./api/env.md) | Runtime detection and portable global references. |
| [`probe.gl/stats`](./api/stats.md) | Counters and timing statistics. |
| [`probe.gl/stats-widget`](./api/stats-widget.md) | A DOM widget for displaying statistics. |
| [`probe.gl/bench`](./api/bench.md) | Benchmark suites and comparisons with saved browser results. |
| [`probe.gl/bench-widget`](./api/bench-widget.md) | A plain DOM benchmark results table, with React integration. |

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

The consolidated `probe.gl` package provides the entry points above. Version 5 publishes only `probe.gl`; see the [upgrade guide](./upgrade-guide.md) for migration details.
