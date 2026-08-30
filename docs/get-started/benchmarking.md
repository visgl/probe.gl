# Benchmarking

Use `@probe.gl/bench` to group related micro-benchmarks and run them as a
suite:

```bash
npm install @probe.gl/bench
```

```js
import {Bench} from '@probe.gl/bench';

const bench = new Bench({id: 'math'});
bench
  .group('Math')
  .add('Math.sqrt', () => Math.sqrt(100));

await bench.run();
```

Use `addAsync` for benchmarks that return promises. See the [benchmarking
guide](/docs/articles/about-benchmarking) and [`Bench` API reference](/docs/modules/bench)
for iteration, timing, and reporting options.
