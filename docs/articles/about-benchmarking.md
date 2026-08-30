# About Benchmarking

probe.gl offers a `Bench` facility that makes it easy to create "micro-benchmarks" for optimization and regression testing purposes.

## Goals

* Fast benchmarking - Benchmarks are intended to run frequently, with a configurable tradeoff between speed and precision.
* Reporting - Provide custom formatters, or use built-in formatters such as the Markdown formatter.
* Priority - Assign a priority to each bench case to enable a quick run of top-level test cases or a more detailed run with multiple variations.
* Regression - Automatically stores values from previous runs and compares the current run against them.
* Browser and Node - As always, probe.gl makes sure that your benchmarks will run under Node.js as well as in the browser (be aware that performance can differ quite a bit between the two).


## What is a "Micro Benchmark"

A micro benchmark is simply a function you supply, that will be run for a number of times with a timer to determine how many times per second it can be executed.


## Structure of a Benchmark Suite

Instantiate the `Bench` class to create a benchmark suite. Use `bench.group` to add headers and group cases, and `bench.add` to register individual benchmarks.

By default, each test case now runs a single iteration before reporting results. You can control this by passing an `iterations` option (or `minIterations` for backwards compatibility) to the `Bench` constructor or individual test cases. Supplying `iterations` (the default) runs a fixed number of passes and skips the adaptive run-until-time behavior; explicitly clearing `iterations` restores the adaptive timing based on `minIterations` and `time`. Each test case also enforces a `maxTimeMs` (default 1000ms) budget to prevent runaway loops. Increasing the iteration count will re-run the benchmark that many times and aggregate the results, at the cost of longer total execution time.
