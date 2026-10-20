# probe.gl

Dependency-free logging, instrumentation, statistics, and benchmarking for browser and Node.js.

```ts
import {Log, Stats} from 'probe.gl';
import {Bench} from 'probe.gl/bench';
import {BenchResultsWidget} from 'probe.gl/bench-widget';
import {StatsWidget} from 'probe.gl/stats-widget';
```

Also available: `probe.gl/log`, `probe.gl/env`, and `probe.gl/stats`.
The root exports logging and statistics only. Widget entry points do not access the DOM until construction.
React is not required; an application can embed either widget using a container ref.
