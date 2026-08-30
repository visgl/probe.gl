/* eslint-disable max-statements */
import {Stats, Stat} from '@probe.gl/stats';
import {expect, test} from 'vitest';

test('Stats#import', () => {
  expect(typeof Stats, 'Stats import OK').toBe('function');
});

test('Stats#counting', () => {
  const stats = new Stats({id: 'test'});
  const counter = stats.get('test');
  expect(() => counter.incrementCount(), 'stat.incrementCount works').not.toThrow();
  expect(() => counter.incrementCount(), 'stat.incrementCount works').not.toThrow();
  expect(() => counter.incrementCount(), 'stat.incrementCount works').not.toThrow();
  expect(counter.count, 'stat accumulates').toBe(3);
  expect(() => counter.addCount(3), 'stat.add works').not.toThrow();
  expect(counter.count, 'stat accumulates').toBe(6);
});

test('Stats#timer()', () => {
  const stats = new Stats({id: 'test'});
  const timer = stats.get('test');
  expect(() => timer.timeStart(), 'timer.timeStart works').not.toThrow();
  expect(() => timer.timeEnd(), 'timer.timeEnd works').not.toThrow();
  expect(() => timer.addTime(10), 'timer.addTime works').not.toThrow();
  expect(() => timer.getAverageTime(), 'timer.getAverageTime works').not.toThrow();
  expect(() => timer.getHz(), 'timer.getHz works').not.toThrow();
  expect(timer.samples, 'timer udpates samples').toBe(2);
  expect(timer.time, 'timer times').toBeGreaterThan(0);
  expect(timer.getAverageTime(), 'timer averages').toBeGreaterThan(0);
  expect(timer.getHz(), 'timer calculates hz').toBeGreaterThan(0);
});

test('Stats#reset()', () => {
  const stats = new Stats({id: 'test'});
  const stat = stats.get('test');
  stat.incrementCount();
  stat.addTime(1);
  expect(stat.count, 'stat setup OK').toBe(1);
  expect(stat.time, 'stat setup OK').toBe(1);
  expect(stat.lastTiming, 'stat setup OK').toBe(1);
  stats.reset();
  expect(stat.count, 'stat reset OK').toBe(0);
  expect(stat.time, 'stat reset OK').toBe(0);
  expect(stat.lastTiming, 'stat setup OK').toBe(0);
});

test('Stats#timing sampleSize', () => {
  const stats = new Stats({id: 'test'});
  const stat = stats.get('test').setSampleSize(3);
  stat.addTime(0);
  stat.addTime(2);
  expect(stat.time, "don't update time before sampling done").toBe(0);
  expect(stat.lastTiming, 'always update lastTiming').toBe(2);
  stat.addTime(1);
  expect(stat.time, 'update time after sampling done').toBe(3);
  expect(stat.lastTiming, 'always aupdate lastTiming').toBe(1);
  stat.addTime(1);
  stat.addTime(0);
  stat.addTime(2);

  expect(stat.lastSampleTime, 'lastSampleTime only tracks last sampling').toBe(3);
  expect(stat.time, 'time tracks entire history').toBe(6);
  expect(stat.lastTiming, 'always aupdate lastTiming').toBe(2);
});

test('Stats#timing sampleSize', () => {
  const stats = new Stats({id: 'test'});
  const stat = stats.get('test').setSampleSize(3);
  stat.incrementCount();
  stat.incrementCount();
  expect(stat.count, "don't update count before sampling done").toBe(0);
  stat.incrementCount();
  expect(stat.count, 'update count after sampling done').toBe(3);
  stat.incrementCount();
  stat.incrementCount();
  stat.incrementCount();
  expect(stat.lastSampleCount, 'lastSampleCount only tracks last sampling').toBe(3);
  expect(stat.count, 'count tracks entire history').toBe(6);
});

test('Stats#constructore with stats', () => {
  const statsContent = new Stats({
    id: 'test',
    stats: [
      new Stat('stat-1'),
      {
        name: 'stat-2',
        type: 'memory'
      },
      {
        name: 'stat-2',
        type: 'fps'
      }
    ]
  });

  const stats = new Stats({id: 'test', stats: statsContent});

  expect(stats.size, 'Should dedupe and ignore stat without name.').toBe(2);

  let stat = stats.get('stat-1');
  expect(stat.name, 'Should correctly set stat-1 name.').toBe('stat-1');

  stat = stats.get('stat-2');
  expect(stat.name, 'Should correctly set stat-2 name.').toBe('stat-2');
  expect(stat.type, 'Should correctly set stat-2 type.').toBe('memory');
});
