# Bench

Bench is a benchmark harness that allows you to organize a number of
benchmarks or performance tests into a benchmark suite that can be executed
with a single command. 

Each test must be registered with a unique `id` which allows `Bench` to do compare results across runs and perform limited regression testing.

> Precise, repeatable performance measurement on a modern multitasking OS is hard because subsequent runs may be scheduled differently by the OS. Results from repeated benchmark tests can vary by 10–15%, which is generally sufficient for verifying incremental improvements.

## Usage

```js
import {Bench} from '@probe.gl/bench';

const bench = new Bench()
  .group('Utility tests')
  .add('Math.sqrt', () => Math.sqrt(100))
  ;

bench.run();
```

## Methods

### constructor

`new Bench({})`

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

* `priority`=`0` (Number, optional) - allows controlling which bench cases execute. Can also be specified through the `options` object.
* `initialize`=: `() => any` initialization function called once before `testFunc` iterations start.
* `time`=`80` (Number) - minimum duration in milliseconds used when adaptive iteration timing is enabled.
* `maxTimeMs`=`1000` (Number) - maximum duration in milliseconds for a single test case.
* `delay`=`5` (Number) - idle time in milliseconds between test cases.
* `minIterations`=`1` (Number) - minimum number of iterations in adaptive mode.
* `iterations`=`1` (Number) - number of fixed iterations to run for each test case.
* `multiplier`=`1` : `Number` Multiplier applied to the number of actual iterations. Use this if each test case already performs a number of iterations. Affects reporting only.
* `unit`=`''` (String) - custom unit label for benchmark results.
* `_throughput` (Number) - with `addAsync`, runs the specified number of iterations in parallel. Automatic iteration selection is not available in this mode.

Returns: itself for chaining.

## addAsync

Adds an async test case. Use when `testFunc` returns a promise. Supports same signatures as `add`. 

`bench.addAsync(id: string, testCaseProps: TestCaseProps, testFunc: () => Promise<unknown>)`
`bench.addAsync(id: string, testFunc: () => Promise<unknown>)`

When using `addAsync`, `testFunc` is expected to return a promise.

### run()

`bench.run()`

### calibrate

Reserved for future calibration support. The current method is a no-op and
returns the `Bench` instance.
