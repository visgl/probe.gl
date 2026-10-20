# Working with AI Coding Agents

probe.gl publishes a machine-readable documentation index at
[`llms.txt`](https://visgl.github.io/probe.gl/llms.txt). Each entry links to a Markdown
version of a documentation page. Fetch the index first, then read the pages relevant
to your task. Both are generated from the website sources on each production build.

## Start from your installed version

Check the application's package manifest, lockfile, and installed declarations before
using an API. The website describes current documentation; an older installed
package may expose a different API. See the [upgrade guide](../upgrade-guide.md)
when migrating older versions. Install `probe.gl` for v5 and use flat entry points such as `probe.gl/log` and
`probe.gl/stats`. The scoped packages are no longer part of the release.

## Choose the relevant documentation

- [Logging and instrumentation](../get-started/adding-probes.md) explains log levels
  and configuration. Logging methods return a function: call the second pair of
  parentheses to emit output, for example `log.info('Ready')()`.
- [Stats](../api/stats.md) and [Stat](../api/stat.md) describe
  counters, timing, and sample windows. Check the documented units when displaying
  elapsed times or comparing measurements.
- [Benchmarking](../get-started/benchmarking.md) and
  [Bench](../api/bench.md) explain benchmark suites. Compare results under
  the same runtime and workload and account for warmup and measurement variability.
- [Environment utilities](../api/env.md) describe portable runtime detection.
  The [stats widget](../api/stats-widget.md) requires a DOM when constructed.

## Verify changes in the repository

Read the affected module's source and tests before changing behavior. Run
`yarn lint` and `yarn test-node` for code changes, and use `yarn test-headless` when
browser behavior matters. Build the documentation with `cd website && yarn build`;
this also checks the generated index and Markdown links.

The machine-readable output includes current documentation. Standalone website
pages, examples, blogs, and older versioned documentation are excluded. There is
no combined `llms-full.txt`; follow individual links to retrieve focused context.
