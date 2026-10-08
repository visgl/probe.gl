# Probe API

probe.gl exports a singleton `probe` object

The `Probe` can be accessed through

- The singleton `probe` instance which is exported from `@probe.gl/log`.
- The singleton `probe` instance is also available on `globalThis.probe`
- Its constructor on `globalThis.Probe` (not a named package export).

## Usage

```ts
import {probe} from '@probe.gl/log';

const now = probe.getHighResolutionTimer();
```

Get Heap memory
```ts
import {probe} from '@probe.gl/log';

const heapMB = probe.getMemoryUsageMB();
if (heapMB !== null) {
  console.log(`heap: ${heapMB}MB`);
}
```

## Methods

### getHighResolutionTimer

`probe.getHighResolutionTimer()`

Returns a high-resolution timer value in milliseconds.

### getMemoryUsageMB

`probe.getMemoryUsageMB()`

Returns the current JS heap usage in integer megabytes, or `null` when not available.

The timestamp has a runtime-specific origin. Compare values from the same runtime to measure elapsed time; do not treat it as a wall-clock date.
