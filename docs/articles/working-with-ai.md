# Working with AI Coding Agents

probe.gl publishes a machine-readable documentation index at
[`llms.txt`](https://visgl.github.io/probe.gl/llms.txt). Each entry links to a Markdown
version of a documentation page. Fetch the index first, then read the pages relevant
to your task. Both are generated from the website sources on each production build.

## Start from your installed version

Check the application's package manifest, lockfile, and installed declarations before
using an API. The website describes current documentation; an older installed
package may expose a different API. See the [upgrade guide](../upgrade-guide.md)
when migrating older versions. Install scoped packages such as `@probe.gl/log` or
`@probe.gl/stats`; the legacy unscoped `probe.gl` package was removed in v4.

## Choose the relevant documentation

- [Logging and instrumentation](../get-started/adding-probes.md) explains log levels
  and configuration. Logging methods return a function: call the second pair of
  parentheses to emit output, for example `log.info('Ready')()`.
- [Stats](../modules/stats/stats.md) and [Stat](../modules/stats/stat.md) describe
  counters, timing, and sample windows. Check the documented units when displaying
  elapsed times or comparing measurements.
- [Benchmarking](../get-started/benchmarking.md) and
  [Bench](../modules/bench/bench.md) explain benchmark suites. Compare results under
  the same runtime and workload and account for warmup and measurement variability.
- [Environment utilities](../modules/env.md) describe portable runtime detection.
  The [stats widget](../modules/stats-widget/stats-widget.md) requires a DOM;
  [browser automation](../modules/test-utils/browser-driver.md) runs from Node.js.

## Verify changes in the repository

Read the affected module's source and tests before changing behavior. Run
`yarn lint` and `yarn test-node` for code changes, and use `yarn test-headless` when
browser behavior matters. Build the documentation with `cd website && yarn build`;
this also checks the generated index and Markdown links.

The machine-readable output includes current documentation. Standalone website
pages, examples, blogs, and older versioned documentation are excluded. There is
no combined `llms-full.txt`; follow individual links to retrieve focused context.
