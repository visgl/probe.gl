/* eslint-disable no-console */
import {getHiResTimestamp, Log, probe} from '@probe.gl/log';
import {expect, test} from 'vitest';

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

test('getHiResTimestamp', () => {
  const t1hr = getHiResTimestamp();
  const t1d = Date.now();
  expect(typeof getHiResTimestamp, 'getHiResTimestamp imported OK').toBe('function');
  expect(typeof getHiResTimestamp(), 'getHiResTimestamp returning time').toBe('number');
  const t2hr = getHiResTimestamp();
  const t2d = Date.now();
  expect(Math.abs(t2hr - t1hr - (t2d - t1d)), 'getHiResTimestamp is reporting time').toBeLessThan(2);
});

test('Probe#getHighResolutionTimer', () => {
  const t1 = probe.getHighResolutionTimer();
  const d1 = Date.now();
  const t2 = probe.getHighResolutionTimer();
  const d2 = Date.now();

  expect(typeof t1, 'returns number').toBe('number');
  expect(t2, 'timer is monotonic in this context').toBeGreaterThanOrEqual(t1);
  expect(Math.abs(t2 - t1 - (d2 - d1)), 'getHighResolutionTimer is reporting time').toBeLessThan(5);
});

test('Probe#getMemoryUsageMB', () => {
  const MEMORY_BYTES = 7_340_032;
  let memoryUsage: number | null = null;
  const canSet = withPerformanceMemory(MEMORY_BYTES, () => {
    memoryUsage = probe.getMemoryUsageMB();
  });
  if (canSet) {
    expect(memoryUsage, 'returns integer megabytes').toBe(7);
  }
});

test('Probe#getMemoryUsageMB (memory unavailable)', () => {
  let memoryUsage: number | null = 0;
  const canSet = withPerformanceMemory(undefined, () => {
    memoryUsage = probe.getMemoryUsageMB();
  });
  if (canSet) {
    expect(memoryUsage, 'returns null when performance.memory is unavailable').toBeNull();
  }
});

test('Log#probe includes memory usage when available', () => {
  const originalLog = console.log;
  const calls: unknown[][] = [];
  console.log = (...args) => {
    calls.push(args);
  };

  try {
    const canSet = withPerformanceMemory(2 * 1024 * 1024 + 123, () => {
      const log = new Log({id: 'probe-memory-test'});
      log.probe(1, 'message')();
    });
    if (canSet) {
      expect(calls, 'logs exactly once').toHaveLength(1);
      expect(calls[0][0], 'adds integer MB prefix').toMatch(/2MB message/);
    }
  } finally {
    console.log = originalLog;
  }
});

test('Log#probe does not include memory usage when unavailable', () => {
  const originalLog = console.log;
  const calls: unknown[][] = [];
  console.log = (...args) => {
    calls.push(args);
  };

  try {
    const canSet = withPerformanceMemory(undefined, () => {
      const log = new Log({id: 'probe-memory-test-no-memory'});
      log.probe(1, 'message')();
    });
    if (canSet) {
      expect(calls, 'logs exactly once').toHaveLength(1);
      expect(calls[0][0], 'does not include MB prefix').not.toMatch(/\b\d+MB message/);
    }
  } finally {
    console.log = originalLog;
  }
});
