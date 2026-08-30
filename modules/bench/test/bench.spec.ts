import {expect, test, vi} from 'vitest';
import {Bench} from '@probe.gl/bench';

import iteratorBench from './iterator.bench';
import parseColorBench from './parse-color.bench';

(globalThis as any).__PROBE_BENCH_IS_TEST__ = true;

test('Bench#import', () => {
  expect(typeof Bench, 'Expected row logged').toBe('function');
});

test('Bench#constructor', () => {
  const suite = new Bench({id: 'test'});
  expect(suite instanceof Bench, 'suite created successfully').toBeTruthy();
});

test('Bench#run', async () => {
  const suite = new Bench({
    id: 'test',
    log: vi.fn()
  });

  suite.add('initFunc in options', {initialize: () => 1, unit: 'initializations'}, (value) => {
    // @ts-expect-error
    if (!value === 1) {
      throw new Error('initialize should return 1');
    }
  });

  iteratorBench(suite);
  parseColorBench(suite);

  expect(suite instanceof Bench, 'suite created successfully').toBeTruthy();
  await suite.run();
});

test('Bench#iterations option', async () => {
  const suite = new Bench({
    id: 'iteration-control',
    iterations: 2,
    time: 1,
    log: () => {}
  });

  let callCount = 0;

  suite.addAsync('respects iteration count', {_throughput: 1}, async () => {
    callCount++;
  });

  await suite.run();

  expect(callCount, 'runs configured number of iterations').toBe(2);
});

test('Bench#iterations runs fixed passes', async () => {
  const suite = new Bench({
    id: 'fixed-iteration-count',
    iterations: 1,
    time: 10000,
    log: () => {}
  });

  let callCount = 0;

  suite.add('single invocation', () => {
    callCount++;
    if (callCount > 1) {
      throw new Error('Benchmark ran more than once');
    }
  });

  await suite.run();

  expect(callCount, 'runs exactly one pass even if time threshold is high').toBe(1);
});

test('Bench#maxTimeMs caps total case time', async () => {
  const suite = new Bench({
    id: 'max-time-limit',
    iterations: 50,
    time: 10000,
    maxTimeMs: 25,
    log: () => {}
  });

  let callCount = 0;
  const start = Date.now();

  suite.addAsync('respects maxTimeMs', async () => {
    callCount++;
    await new Promise((resolve) => setTimeout(resolve, 10));
  });

  await suite.run();

  const duration = Date.now() - start;

  expect(callCount, 'stops iterating once maxTimeMs is reached').toBeLessThan(50);
  expect(duration, 'returns promptly when hitting the max time budget').toBeLessThan(500);
});
