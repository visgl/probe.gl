/* eslint-disable max-statements */
import Probe, {Log} from '@probe.gl/log';
import test from 'tape-promise/tape';

test('Log#import', (t) => {
  t.equals(typeof Log, 'function', 'Log imported OK');
  t.equals(typeof Probe, 'object', 'default (Probe) imported OK');
  t.ok(
    Probe.VERSION.match(/\d+\.\d+\.\d+/) || Probe.VERSION === 'untranspiled source',
    'Probe.VERSION imported OK'
  );
  t.end();
});

test('Probe#probe', (t) => {
  t.doesNotThrow(() => Probe.probe('test'), 'Probe.probe works');
  t.doesNotThrow(() => Probe.probe(0, 'test'), 'Probe.probe works');
  t.end();
});

test('Probe#getTotal()', (t) => {
  const time1 = Probe.getTotal();
  const time2 = Probe.getTotal();
  t.ok(Number.isFinite(time1), 'Probe.getTotal() returned number');
  t.ok(Number.isFinite(time2), 'Probe.getTotal() returned number');
  t.ok(time2 - time1 >= 0, 'Probe.getTotal() is monotonic');
  t.end();
});

test('Log#log', (t) => {
  const log = new Log({id: 'test'});
  t.ok(log instanceof Log, 'log created successfully');
  t.doesNotThrow(() => log.log('test')(), 'log.log works');
  t.doesNotThrow(() => log.log(0, 'test')(), 'log.log works');
  t.end();
});

test('Log#log(functions)', (t) => {
  const log = new Log({id: 'test'});
  t.ok(log instanceof Log, 'log created successfully');
  t.doesNotThrow(() => log.log(() => 'test')(), 'log.log works');
  t.doesNotThrow(() => log.log(0, '() => test')(), 'log.log works');
  t.end();
});

test('Log#group - create, log, end', (t) => {
  const log = new Log({id: 'test'});
  t.ok(log instanceof Log, 'log created successfully');

  t.doesNotThrow(() => log.group('test-group')(), '.group() - initiation works');
  t.doesNotThrow(() => log.log(1, 'test0')(), 'logging to group works');
  t.doesNotThrow(() => log.groupEnd('test-group')(), '.groupEnd() - ending group works');
  t.end();
});

test('Log#log(functions2)', (t) => {
  const log = new Log({id: 'test'});
  t.ok(log instanceof Log, 'log created successfully');
  t.doesNotThrow(() => log.log(() => 'test')(), 'log.log works');
  t.doesNotThrow(() => log.log(0, '() => test')(), 'log.log works');
  t.end();
});

test('Log#once', (t) => {
  const log = new Log({id: 'test'});
  t.ok(log instanceof Log, 'log created successfully');
  t.doesNotThrow(() => log.once('test')(), 'log.once works');
  t.doesNotThrow(() => log.once(0, 'test')(), 'log.once works');
  t.end();
});

test('Log#warn', (t) => {
  const log = new Log({id: 'test'});
  t.ok(log instanceof Log, 'log created successfully');
  t.doesNotThrow(() => log.warn('test')(), 'log.warn works');
  t.end();
});

test('Log#error', (t) => {
  const log = new Log({id: 'test'});
  t.ok(log instanceof Log, 'log created successfully');
  t.doesNotThrow(() => log.error('test')(), 'log.error works');
  t.end();
});

test('Log#assert', (t) => {
  const log = new Log({id: 'test'});
  t.ok(log instanceof Log, 'log created successfully');
  t.doesNotThrow(() => log.assert(true, 'test'), 'log.assert works');
  t.throws(() => log.assert(false, 'test'), 'log.assert works');
  t.end();
});

test('Log#table', (t) => {
  const log = new Log({id: 'test'});
  t.ok(log instanceof Log, 'log created successfully');
  t.doesNotThrow(() => log.table(0, {a: {c: 1}, b: {c: 2}})(), 'log.table works');
  t.doesNotThrow(() => log.table(0, {a: {c: 1}, b: {c: 2}})(), 'log.table(columns) works');
  t.end();
});

test('Log#get', (t) => {
  const log = new Log({id: 'test'});
  t.ok(log instanceof Log, 'log created successfully');
  t.doesNotThrow(() => log.get('level'), "log.get('level') works");
  t.end();
});

test('Log#set', (t) => {
  const log = new Log({id: 'test'});
  t.ok(log instanceof Log, 'log created successfully');
  t.doesNotThrow(() => log.set('level', 1), "log.set('level', 1) works");
  t.end();
});

test('Log#settings', (t) => {
  const log = new Log({id: 'test'});
  t.ok(log instanceof Log, 'log created successfully');
  t.doesNotThrow(() => log.settings(), 'log.settings() works');
  t.end();
});

test('Log stores configuration per log id', (t) => {
  const logA = new Log({id: 'alpha'});
  const logB = new Log({id: 'beta'});

  logA.setLevel(1);
  logB.enable(false);

  t.equal(logA.getLevel(), 1, 'logA level updated independently');
  t.equal(logB.getLevel(), 0, 'logB retains default level');
  t.equal(logA.isEnabled(), true, 'logA remains enabled');
  t.equal(logB.isEnabled(), false, 'logB enabled flag updated independently');

  t.deepEquals(
    logA._storage.config,
    {alpha: {enabled: true, level: 1}},
    'logA stores its configuration under its own id'
  );

  t.deepEquals(
    logB._storage.config,
    {beta: {enabled: false, level: 0}},
    'logB stores its configuration under its own id'
  );

  t.end();
});
