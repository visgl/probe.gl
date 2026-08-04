import {expect, test, vi} from 'vitest';
import {Bench} from '@probe.gl/bench';

import iteratorBench from './iterator.bench';
import parseColorBench from './parse-color.bench';

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
