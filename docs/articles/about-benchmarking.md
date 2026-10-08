# Benchmarking

A micro-benchmark measures a small function in isolation. Use `Bench` to group cases, measure throughput, and report results in browsers or Node.js.

```js
import {Bench} from '@probe.gl/bench';

const bench = new Bench({
  id: 'math',
  iterations: undefined,
  minIterations: 3,
  time: 80
});
bench.group('Math').add('Math.sqrt', () => Math.sqrt(100));
await bench.run();
```

The current default is one fixed measured call per case. Set `iterations: undefined` to use adaptive timing: batches grow until they reach the `time` target, and `minIterations` controls repeated batches. Increasing the target and repetitions can improve stability at the cost of longer runs.

Use `addAsync()` for functions returning promises. Initialization and warmup can call your function before measurement, so cases should tolerate repeated execution.

Results depend on the runtime, JIT optimization, and other system activity. Compare repeated runs under similar conditions. Browser runs save results under the suite id and compare with prior maxima; this storage is not available in Node.js.

See the [Bench reference](../modules/bench/bench.md) for options and custom reporting.
