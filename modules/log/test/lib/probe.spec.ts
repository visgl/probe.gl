/* eslint-disable no-console */
import {getHiResTimestamp, Log, probe} from '@probe.gl/log';
import test from 'tape-promise/tape';

type PerformanceDescriptor = ReturnType<typeof Object.getOwnPropertyDescriptor>;

function withPerformanceMemory(value: number | undefined, testFn: () => void): boolean {
  const performance = globalThis.performance;
  const descriptor = Object.getOwnPropertyDescriptor(performance, 'memory');
  const canSet = setPerformanceMemory(performance, descriptor, value);
  if (!canSet) {
    return false;
  }

  try {
    testFn();
    return true;
  } finally {
    restorePerformanceMemory(performance, descriptor);
  }
}

function setPerformanceMemory(
  performance: {memory?: unknown},
  descriptor: PerformanceDescriptor,
  value: number | undefined
): boolean {
  try {
    if (value === undefined) {
      if (descriptor?.configurable) {
        Object.defineProperty(performance, 'memory', {
          configurable: true,
          writable: true,
          value: undefined
        });
      } else if (performance.memory !== undefined) {
        // eslint-disable-next-line no-param-reassign
        performance.memory = undefined;
      } else {
        delete performance.memory;
      }
    } else if (descriptor?.configurable) {
      Object.defineProperty(performance, 'memory', {
        configurable: true,
        writable: true,
        value: {usedJSHeapSize: value}
      });
    } else {
      performance.memory = {usedJSHeapSize: value};
    }

    return true;
  } catch (error) {
    return false;
  }
}

function restorePerformanceMemory(
  performance: {memory?: unknown},
  descriptor: PerformanceDescriptor
): void {
  if (descriptor?.configurable) {
    Object.defineProperty(performance, 'memory', descriptor);
    return;
  }

  if (descriptor) {
    if (descriptor.get) {
      descriptor.get();
    } else if ('value' in descriptor) {
      // eslint-disable-next-line no-param-reassign
      performance.memory = descriptor.value;
    }
    return;
  }

  delete performance.memory;
}

test('getHiResTimestamp', (t) => {
  const t1hr = getHiResTimestamp();
  const t1d = Date.now();
  t.equals(typeof getHiResTimestamp, 'function', 'getHiResTimestamp imported OK');
  t.equals(typeof getHiResTimestamp(), 'number', 'getHiResTimestamp returning time');
  const t2hr = getHiResTimestamp();
  const t2d = Date.now();
  t.ok(Math.abs(t2hr - t1hr - (t2d - t1d)) < 2, 'getHiResTimestamp is reporting time');
  t.end();
});

test('Probe#getHighResolutionTimer', (t) => {
  const t1 = probe.getHighResolutionTimer();
  const d1 = Date.now();
  const t2 = probe.getHighResolutionTimer();
  const d2 = Date.now();

  t.ok(typeof t1 === 'number', 'returns number');
  t.ok(t2 >= t1, 'timer is monotonic in this context');
  t.ok(Math.abs(t2 - t1 - (d2 - d1)) < 5, 'getHighResolutionTimer is reporting time');
  t.end();
});

test('Probe#getMemoryUsageMB', (t) => {
  const MEMORY_BYTES = 7_340_032;
  if (
    !withPerformanceMemory(MEMORY_BYTES, () => {
      t.equal(probe.getMemoryUsageMB(), 7, 'returns integer megabytes');
    })
  ) {
    t.skip('performance.memory could not be mocked in this environment');
  }
  t.end();
});

test('Probe#getMemoryUsageMB (memory unavailable)', (t) => {
  if (
    !withPerformanceMemory(undefined, () => {
      t.equal(
        probe.getMemoryUsageMB(),
        null,
        'returns null when performance.memory is unavailable'
      );
    })
  ) {
    t.skip('performance.memory could not be mocked in this environment');
  }
  t.end();
});

test('Log#probe includes memory usage when available', (t) => {
  const originalLog = console.log;
  const calls = [];
  console.log = (...args) => {
    calls.push(args);
  };

  if (
    !withPerformanceMemory(2 * 1024 * 1024 + 123, () => {
      const log = new Log({id: 'probe-memory-test'});
      log.probe(1, 'message')();
    })
  ) {
    console.log = originalLog;
    t.skip('performance.memory could not be mocked in this environment');
    t.end();
    return;
  }

  t.equal(calls.length, 1, 'logs exactly once');
  t.match(calls[0][0], /2MB message/, 'adds integer MB prefix');

  console.log = originalLog;
  t.end();
});

test('Log#probe does not include memory usage when unavailable', (t) => {
  const originalLog = console.log;
  const calls = [];
  console.log = (...args) => {
    calls.push(args);
  };

  if (
    !withPerformanceMemory(undefined, () => {
      const log = new Log({id: 'probe-memory-test-no-memory'});
      log.probe(1, 'message')();
    })
  ) {
    console.log = originalLog;
    t.skip('performance.memory could not be mocked in this environment');
    t.end();
    return;
  }

  t.equal(calls.length, 1, 'logs exactly once');
  t.notMatch(calls[0][0], /\b\d+MB message/, 'does not include MB prefix');

  console.log = originalLog;
  t.end();
});
