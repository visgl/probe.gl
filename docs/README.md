# probe.gl

probe.gl is a collection of JavaScript debugging, logging, instrumentation, benchmarking, and testing utilities for browser and Node.js applications. The packages are published independently, so install only the modules your application needs.

| probe.gl module | Description |
| --- | --- |
| **`@probe.gl/log`** | Configurable console logging and performance instrumentation. |
| **`@probe.gl/env`** | Browser, Node.js, Electron, and device detection. |
| **`@probe.gl/stats`** | Counters and timing statistics for applications and frameworks. |
| **`@probe.gl/stats-widget`** | A DOM widget for displaying `@probe.gl/stats` objects. |
| **`@probe.gl/bench`** | Benchmark suites for measuring performance and tracking regressions. |
| **`@probe.gl/react-bench`** | React components for displaying `@probe.gl/bench` results. |
| **`@probe.gl/test-utils`** | Browser automation and testing utilities built around Puppeteer. |

The old unscoped `probe.gl` package was removed in v4. Replace it with the scoped package or packages that provide the functionality you use.

## Install

```bash
npm install @probe.gl/log
```

## Comparison with other Logging Solutions

probe.gl focuses on local debugging and performance instrumentation rather than production log shipping. Its APIs are designed to work with browser consoles and Node.js while adding minimal overhead when instrumentation is disabled.


## Features

* **Configurable** - `ProbeLog` can be disabled or filtered by log level, and configuration is persisted in browser storage.
* **Lightweight** - probe.gl is designed to have a small impact on application bundle size and to avoid dependencies on other modules.


### Logging Support

* **Log levels** - Messages are emitted only when the logger is enabled and its current level is at least the message's level.
* **Defeats log cascades** - Caches messages to ensure only one of each warning is emitted to avoid flooding the console.
* **Source Code Links** - Clicking probe.gl log messages in the browser console takes you to the source code line where the probe function was called, even though you are not calling `console` methods directly.


### Profiling Support

Instrument your applications by adding probes to get timings in browser console or in node. The probes then collect data about your application when you run it.

* **High-Resolution Timers** - probe.gl uses the best available timer APIs on the platform, such as `window.performance.now()` and Node.js `hrtime`.
* **Multiple Timers** - Your "probes" automatically log both time since operation start and delta time since last probe.
* **External Timers** - Timing metrics received from another source, such as a server, can be presented alongside client-side timings.


### Persistent Configuration

probe.gl offers a basic persistent configuration system:

* **Persistent Configuration** - probe.gl persists its configuration in local storage, so you can restart your app without having to change settings, speeding up debugging.
* **Persistent Configuration** - `ProbeLog` persists its enabled state and log level in browser storage so settings survive reloads.


### Cross-platform support

* **Supports Node and Browser** - Use with confidence in code that runs in both environments (e.g. test suites or isomorphic React apps).
* **Auto-detects platform APIs** - Uses the best available versions of platform-dependent facilities like high resolution timers, console methods etc.
* **Limited impact on global state** - The library does not install a global reference or modify application state.


### Benchmarking Support

In addition to in-app profiling, probe.gl provides a simple benchmarking rig:

* **Benchmark Suite** - Functions to run a suite of benchmarks and collect data.
* **Persist and Compare Benchmarks** - Persist results and compare runs to track regressions.


## History

probe.gl is maintained by the vis.gl community and is used by visualization frameworks in the vis.gl ecosystem.

The “probe” part of the name refers to instrumenting an application with information-collection checkpoints. The `.gl` suffix identifies the library as part of the vis.gl ecosystem; probe.gl does not depend on WebGL.
