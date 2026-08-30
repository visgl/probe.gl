import {expect, test} from 'vitest';
import {getHiResTimestamp} from '@probe.gl/log';

test('getHiResTimestamp', () => {
  const t1hr = getHiResTimestamp();
  const t1d = Date.now();
  expect(typeof getHiResTimestamp, 'getHiResTimestamp imported OK').toBe('function');
  expect(typeof getHiResTimestamp(), 'getHiResTimestamp returning time').toBe('number');
  const t2hr = getHiResTimestamp();
  const t2d = Date.now();
  expect(
    Math.abs(t2hr - t1hr - (t2d - t1d)) < 2,
    'getHiResTimestamp is reporting time'
  ).toBeTruthy();
});
