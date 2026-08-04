/* eslint-disable max-statements, no-console */
import Probe, {Log, ConsoleLog, MemoryLog, ProbeLog} from '@probe.gl/log';
import {expect, test} from 'vitest';

test('Log#import', () => {
  expect(typeof Log, 'Log imported OK').toBe('function');
  expect(typeof Probe, 'default (Probe) imported OK').toBe('object');
  expect(
    Probe.VERSION.match(/\d+\.\d+\.\d+/) || Probe.VERSION === 'untranspiled source',
    'Probe.VERSION imported OK'
  ).toBeTruthy();
  expect(Log === ProbeLog, 'Log export is an alias for ProbeLog').toBeTruthy();
  expect(typeof ConsoleLog, 'ConsoleLog imported OK').toBe('function');
});

test('Probe#probe', () => {
  expect(() => Probe.probe('test'), 'Probe.probe works').not.toThrow();
  expect(() => Probe.probe(0, 'test'), 'Probe.probe works').not.toThrow();
});

test('Probe#getTotal()', () => {
  const time1 = Probe.getTotal();
  const time2 = Probe.getTotal();
  expect(Number.isFinite(time1), 'Probe.getTotal() returned number').toBeTruthy();
  expect(Number.isFinite(time2), 'Probe.getTotal() returned number').toBeTruthy();
  expect(time2 - time1, 'Probe.getTotal() is monotonic').toBeGreaterThanOrEqual(0);
});

test('Log#log', () => {
  const log = new Log({id: 'test'});
  expect(log instanceof Log, 'log created successfully').toBeTruthy();
  expect(() => log.log('test')(), 'log.log works').not.toThrow();
  expect(() => log.log(0, 'test')(), 'log.log works').not.toThrow();
});

test('Log#log(functions)', () => {
  const log = new Log({id: 'test'});
  expect(log instanceof Log, 'log created successfully').toBeTruthy();
  expect(() => log.log(() => 'test')(), 'log.log works').not.toThrow();
  expect(() => log.log(0, '() => test')(), 'log.log works').not.toThrow();
});

test('Log#group - create, log, end', () => {
  const log = new Log({id: 'test'});
  expect(log instanceof Log, 'log created successfully').toBeTruthy();

  expect(() => log.group('test-group')(), '.group() - initiation works').not.toThrow();
  expect(() => log.log(1, 'test0')(), 'logging to group works').not.toThrow();
  expect(() => log.groupEnd('test-group')(), '.groupEnd() - ending group works').not.toThrow();
});

test('Log#log(functions2)', () => {
  const log = new Log({id: 'test'});
  expect(log instanceof Log, 'log created successfully').toBeTruthy();
  expect(() => log.log(() => 'test')(), 'log.log works').not.toThrow();
  expect(() => log.log(0, '() => test')(), 'log.log works').not.toThrow();
});

test('Log#once', () => {
  const log = new Log({id: 'test'});
  expect(log instanceof Log, 'log created successfully').toBeTruthy();
  expect(() => log.once('test')(), 'log.once works').not.toThrow();
  expect(() => log.once(0, 'test')(), 'log.once works').not.toThrow();
});

test('ConsoleLog#once', () => {
  const consoleLog = new ConsoleLog();
  const originalDebug = console.debug;
  const originalInfo = console.info;
  const calls = [];

  console.debug = (...args) => {
    calls.push(args);
  };
  console.info = (...args) => {
    calls.push(args);
  };

  consoleLog.once(0, 'test')();
  consoleLog.once(0, 'test')();

  expect(calls.length, 'console.once logs once per message').toBe(1);

  console.debug = originalDebug;
  console.info = originalInfo;
});

test('MemoryLog#once', () => {
  const memoryLog = new MemoryLog();

  memoryLog.once(0, 'test')();
  memoryLog.once(0, 'test')();

  expect(memoryLog.messages.length, 'memory log records once only once').toBe(1);
  expect(memoryLog.messages[0], 'memory log stores once entry').toEqual({
    type: 'once',
    level: 0,
    message: 'test',
    args: []
  });
});

test('MemoryLog#onMessage', () => {
  const messages = [];
  const memoryLog = new MemoryLog({
    onMessage: (message) => messages.push(message)
  });

  memoryLog.log(0, 'test')();

  expect(messages.length, 'onMessage called when logging').toBe(1);
  expect(messages[0], 'onMessage receives serialized entry').toEqual({
    type: 'log',
    level: 0,
    message: 'test',
    args: []
  });
});

test('Log#warn', () => {
  const log = new Log({id: 'test'});
  expect(log instanceof Log, 'log created successfully').toBeTruthy();
  expect(() => log.warn('test')(), 'log.warn works').not.toThrow();
});

test('Log#error', () => {
  const log = new Log({id: 'test'});
  expect(log instanceof Log, 'log created successfully').toBeTruthy();
  expect(() => log.error('test')(), 'log.error works').not.toThrow();
});

test('Log#assert', () => {
  const log = new Log({id: 'test'});
  expect(log instanceof Log, 'log created successfully').toBeTruthy();
  expect(() => log.assert(true, 'test'), 'log.assert works').not.toThrow();
  expect(() => log.assert(false, 'test'), 'log.assert works').toThrow();
});

test('Log#table', () => {
  const log = new Log({id: 'test'});
  expect(log instanceof Log, 'log created successfully').toBeTruthy();
  expect(() => log.table(0, {a: {c: 1}, b: {c: 2}})(), 'log.table works').not.toThrow();
  expect(() => log.table(0, {a: {c: 1}, b: {c: 2}})(), 'log.table(columns) works').not.toThrow();
});

test('Log#get', () => {
  const log = new Log({id: 'test'});
  expect(log instanceof Log, 'log created successfully').toBeTruthy();
  expect(() => log.get('level'), "log.get('level') works").not.toThrow();
});

test('Log#set', () => {
  const log = new Log({id: 'test'});
  expect(log instanceof Log, 'log created successfully').toBeTruthy();
  expect(() => log.set('level', 1), "log.set('level', 1) works").not.toThrow();
});

test('Log#settings', () => {
  const log = new Log({id: 'test'});
  expect(log instanceof Log, 'log created successfully').toBeTruthy();
  expect(() => log.settings(), 'log.settings() works').not.toThrow();
});

test('Log stores configuration per log id', () => {
  const logA = new Log({id: 'alpha'});
  const logB = new Log({id: 'beta'});

  logA.setLevel(1);
  logB.enable(false);

  expect(logA.getLevel(), 'logA level updated independently').toBe(1);
  expect(logB.getLevel(), 'logB retains default level').toBe(0);
  expect(logA.isEnabled(), 'logA remains enabled').toBe(true);
  expect(logB.isEnabled(), 'logB enabled flag updated independently').toBe(false);

  expect(logA._storage.config, 'logA stores its configuration under its own id').toEqual({
    alpha: {enabled: true, level: 1}
  });

  expect(logB._storage.config, 'logB stores its configuration under its own id').toEqual({
    beta: {enabled: false, level: 0}
  });
});
