# probe.gl

Install one dependency-free package and import the entry points your application needs:

```sh
npm install probe.gl
```

The root exports the logging API and statistics classes:

```ts
import log, {Log, Stats, Stat} from 'probe.gl';

const appLog = new Log({id: 'app'});
appLog.info('Ready')();
const stats = new Stats({id: 'app'});
stats.get('Frames').incrementCount();
```

The default export is the shared logger instance. The root and `probe.gl/log` share that instance, and the root and `probe.gl/stats` export the same `Stats` and `Stat` classes within each module format.

## Subpaths

| Import | API |
| --- | --- |
| [`probe.gl/log`](./log.md) | Loggers and the [`probe`](./probe.md) timing helper. |
| [`probe.gl/env`](./env.md) | Runtime detection and portable globals. |
| [`probe.gl/stats`](./stats.md) | `Stats` collections and individual [`Stat`](./stat.md) counters and timers. |
| [`probe.gl/stats-widget`](./stats-widget.md) | A DOM display for statistics. |
| [`probe.gl/bench`](./bench.md) | Benchmark suites and typed result records. |
| [`probe.gl/bench-widget`](./bench-widget.md) | A plain DOM benchmark results table, including a React integration example. |

Benchmarking, environment helpers, and widgets require explicit subpath imports. The root does not load benchmark or widget code. Widget modules can be imported during server rendering; create widgets only after a DOM container exists.

All entry points provide ES module, CommonJS, and TypeScript declarations. React is only needed by applications that choose to use it; `probe.gl` has no runtime or peer dependencies.

For migration from the retired scoped packages, see the [v5 upgrade guide](../upgrade-guide.md#upgrading-to-v50).
