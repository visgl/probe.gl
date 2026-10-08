# BenchResults

`@probe.gl/react-bench` exports a React component for displaying benchmark records in a table with throughput bars.

```bash
npm install @probe.gl/react-bench
```

```jsx
import {BenchResults} from '@probe.gl/react-bench';

const records = [
  {id: 'Math', value: 0},
  {id: 'Math.sqrt', value: 1500000, formattedValue: '1.5M'}
];

export function Results() {
  return <BenchResults log={records} />;
}
```

## Props

`log` is an array of records:

| Field | Description |
| --- | --- |
| `id` | Row label. |
| `value` | Numeric throughput in iterations per second, used by the bar. |
| `formattedValue` | Display text for throughput. Omit it for a group heading. |

The component displays supplied data; it does not run benchmarks. `Bench` log callbacks emit a different record shape (`type`, `itersPerSecond`, and other fields). Convert those records to the fields above before passing them to this component.
