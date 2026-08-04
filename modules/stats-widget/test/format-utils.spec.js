import {expect, test} from 'vitest';
import {formatTime, formatMemory} from '@probe.gl/stats-widget/format-utils';

test('StatsWidget#formatTime', () => {
  expect(typeof formatTime, 'formatTime import OK').toBe('function');

  expect(formatTime(1)).toBe('1.00ms');
  expect(formatTime(100)).toBe('100.00ms');
  expect(formatTime(1000)).toBe('1.00s');
  expect(formatTime(10000)).toBe('10.00s');
});

test('StatsWidget#formatMemory', () => {
  expect(typeof formatMemory, 'formatMemory import OK').toBe('function');

  expect(formatMemory(1)).toBe('1 bytes');
  expect(formatMemory(1000)).toBe('1000 bytes');
  expect(formatMemory(1e6)).toBe('976.56kB');
  expect(formatMemory(1e8)).toBe('95.37MB');
  expect(formatMemory(1e12)).toBe('931.32GB');
});
