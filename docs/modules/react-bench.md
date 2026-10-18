# BenchResultsWidget

`probe.gl/bench-widget` displays benchmark results using plain DOM APIs. It has no React or table-library dependencies. Importing it is safe in Node and server-rendered applications; construct it only after a DOM container exists.

```ts
import {Bench, type LogEntry} from 'probe.gl/bench';
import {BenchResultsWidget} from 'probe.gl/bench-widget';

const records: LogEntry[] = [];
const widget = new BenchResultsWidget({container: document.body});
const bench = new Bench({
  log(entry) {
    records.push(entry);
    widget.setProps({records});
  }
});
bench.add('square root', () => Math.sqrt(42));
await bench.run();
// When removing the view:
widget.destroy();
```

## API and records

- `new BenchResultsWidget({container, records?})` appends a widget to the supplied element.
- `setProps({records})` replaces the displayed records. Call it after modifying an existing array too.
- `destroy()` removes only the widget's elements. Repeated calls are safe; updates after destruction are ignored.

`BenchResult`, exported from `/bench-widget`, is the benchmark runner's `LogEntry` union. Group records become headings, test records become result rows, and completion records are ignored. Test records include numeric `iterationsPerSecond` for bar sizing, formatted `itersPerSecond` for display, `unit`, fractional `error`, elapsed `time`, `id`, and `message`. No parsing of SI-formatted strings is needed.

The table includes textual throughput and uncertainty in each value's tooltip. Decorative bars use a logarithmic scale; stars indicate 50M units/s each, capped at five. Styles inherit the application's font. Customize colors using `--probe-bench-color`, `--probe-bench-group-background`, `--probe-bench-track`, `--probe-bench-low`, `--probe-bench-medium`, and `--probe-bench-high` on the container.

## React integration

For React versions supporting hooks, an application-local wrapper is sufficient:

```tsx
import {useEffect, useRef} from 'react';
import {BenchResultsWidget, type BenchResult} from 'probe.gl/bench-widget';

export function BenchResults({records}: {records: readonly BenchResult[]}) {
  const container = useRef<HTMLDivElement>(null);
  const widget = useRef<BenchResultsWidget | null>(null);

  useEffect(() => {
    const instance = new BenchResultsWidget({container: container.current!});
    widget.current = instance;
    return () => {
      instance.destroy();
      widget.current = null;
    };
  }, []);

  useEffect(() => {
    widget.current?.setProps({records});
  }, [records]);

  return <div ref={container} />;
}
```

Supply a new records array when updating React state. React owns the empty container; the widget owns its children. Cleanup supports development remounts. Server rendering produces an empty container and the widget appears after mounting. In frameworks with server components, put this wrapper in a client component.

The runnable `examples/benchmarks` application demonstrates the equivalent class lifecycle integration, compatible with its existing React 16.3 dependency.

## Migration from react-bench

`@probe.gl/react-bench` remains a deprecated compatibility adapter for `<BenchResults log={legacyRecords} />`. It now delegates rendering to this widget and no longer depends on `react-table` or CSS loaders. New applications should import `/bench-widget` directly; React is not a dependency of `probe.gl/bench`.
