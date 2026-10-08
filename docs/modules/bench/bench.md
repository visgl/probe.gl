# Bench

Bench is a benchmark harness that allows you to organize a number of
benchmarks or performance tests into a benchmark suite that can be executed
with a single command. 

Each test must be registered with a unique `id` which allows `Bench` to compare results across runs and perform limited regression testing.

> Precise, repeatable performance measurement on a modern multitasking OS is hard because subsequent runs may be scheduled differently by the OS. Measure repeated runs in the same environment before interpreting small changes as improvements.

## Usage

```js
import {Bench} from '@probe.gl/bench';

const bench = new Bench()
  .group('Utility tests')
  .add('Math.sqrt', () => Math.sqrt(100))
  ;

await bench.run();
```

## Methods

### constructor

`new Bench(options)`

All options are optional:

| Option | Default | Description |
| --- | --- | --- |
| `id` | `''` | Browser-storage key for saved comparisons. Use a distinct id per suite. |
| `log` | Console reporter | Callback receiving group, test, and completion entries. |
| `time` | `80` | Target milliseconds for adaptive timing. |
| `delay` | `5` | Idle milliseconds between cases. |
| `iterations` | `1` | Fixed number of measured calls per case. |
| `minIterations` | `1` | Adaptive repetitions when `iterations` is explicitly `undefined`. |
| `maxTimeMs` | `1000` | Budget checked between measured runs; does not interrupt a running function. |

The current implementation defaults to fixed iteration mode. For adaptive micro-benchmarks, construct `new Bench({iterations: undefined, minIterations: 3})`. A warmup runs before measurement. A case can override suite options.

### group(id)

Adds a group header.

`bench.group(id)`

### add

Adds a test case. Supports multiple signatures:

`bench.add(id: string, testCaseProps: TestCaseProps, testFunc: () => unknown)`
`bench.add(id: string, testFunc: () => unknown)`

Parameters

* `id` (String) - The unique string for this test. Used as the description of the test in the results.
* `testFunc` (Function) - Function run for each test iteration.

Options

* `priority`=`0` (Number, optional) - controls which results are reported against `globalThis.probe.priority`. It does not skip execution.
* `initialize`=: `() => any` initialization function called before each measured batch (and warmup).
* `time`=`80` (Number) - minimum duration in milliseconds used for each adaptive benchmark run.
* `delay`=`5` (Number) - idle time in milliseconds between test cases.
* `minIterations`=`1` (Number) - number of adaptive benchmark runs used to calculate the result. A test-case option can override the suite default.
* `multiplier`=`1` : `Number` Multiplier applied to the number of actual iterations. Use this if each test case already performs a number of iterations. Affects reporting only.
* `unit`=`''` (String) - custom unit label for benchmark results.
* `_throughput` (Number) - with `addAsync`, runs the specified number of iterations in parallel. Automatic iteration selection is not available in this mode.

Returns: itself for chaining.

### addAsync

Adds an async test case. Use when `testFunc` returns a promise. Supports same signatures as `add`. 

`bench.addAsync(id: string, testCaseProps: TestCaseProps, testFunc: () => Promise<unknown>)`
`bench.addAsync(id: string, testFunc: () => Promise<unknown>)`

When using `addAsync`, `testFunc` is expected to return a promise.

### run()

`await bench.run()`

Returns a promise that resolves after all cases finish. Browser results are compared with saved maxima for the suite id and stored in browser storage. Node.js has no persistent browser storage.

### calibrate

Reserved for future calibration support. The current method is a no-op and
returns the `Bench` instance.
