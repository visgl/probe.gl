import {expect, test} from 'vitest';
import {_getHiResTimestamp} from '@probe.gl/stats';

test('_getHiResTimestamp', () => {
  const t1hr = _getHiResTimestamp();
  const t1d = Date.now();
  expect(typeof _getHiResTimestamp, '_getHiResTimestamp imported OK').toBe('function');
  expect(typeof _getHiResTimestamp(), '_getHiResTimestamp returning time').toBe('number');
  const t2hr = _getHiResTimestamp();
  const t2d = Date.now();
  expect(
    Math.abs(t2hr - t1hr - (t2d - t1d)) < 2,
    '_getHiResTimestamp is reporting time'
  ).toBeTruthy();
});
