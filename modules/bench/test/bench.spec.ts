import test from 'tape-promise/tape';
import {Bench} from '@probe.gl/bench';

import iteratorBench from './iterator.bench';
import parseColorBench from './parse-color.bench';

test('Bench#import', (t) => {
  t.equals(typeof Bench, 'function', 'Expected row logged');
  t.end();
});

test('Bench#constructor', (t) => {
  const suite = new Bench({id: 'test'});
  t.ok(suite instanceof Bench, 'suite created successfully');
  t.end();
});

test('Bench#run', (t) => {
  const suite = new Bench({
    id: 'test',
    log: ({message}) => t.comment(message)
  });

  suite.add('initFunc in options', {initialize: () => 1, unit: 'initializations'}, (value) => {
    // @ts-expect-error
    if (!value === 1) {
      t.fail();
    }
  });

  iteratorBench(suite);
  parseColorBench(suite);

  t.ok(suite instanceof Bench, 'suite created successfully');
  suite.run().then(() => t.end());
});

test('Bench#iterations option', (t) => {
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

  suite.run().then(() => {
    t.equals(callCount, 2, 'runs configured number of iterations');
    t.end();
  });
});

test('Bench#iterations runs fixed passes', async (t) => {
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

  t.equals(callCount, 1, 'runs exactly one pass even if time threshold is high');
  t.end();
});
