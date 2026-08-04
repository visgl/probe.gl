import {normalizeArguments} from '@probe.gl/log/loggers/probe-log';
import {expect, test} from 'vitest';

function makeOpts(logLevel, message, ...args) {
  return {logLevel, message, args: arguments};
}

const NORMALIZE_ARGUMENTS_TEST_CASES = [
  {
    args: makeOpts(1, 'Hi', 0, 1),
    opts: {logLevel: 1, message: 'Hi', args: [0, 1]}
  },
  {
    args: makeOpts('Hi', 0, 1),
    opts: {logLevel: 0, message: 'Hi', args: [0, 1]}
  },
  {
    args: makeOpts({}, 'Hi', 0, 1),
    opts: {logLevel: 0, message: 'Hi', args: [0, 1]}
  },
  {
    args: makeOpts({logLevel: 3, color: 'green'}, 'Hi', 0, 1),
    opts: {logLevel: 3, color: 'green', message: 'Hi', args: [0, 1]}
  }
  // {
  //   args: makeOpts({logLevel: 3, color: 'green', message: 'Hi', args: [0, 1]}),
  //   opts: {logLevel: 3, color: 'green', message: 'Hi', args: [0, 1]}
  // }
];

test('normalizeArguments', () => {
  for (const tc of NORMALIZE_ARGUMENTS_TEST_CASES) {
    const opts = normalizeArguments({...tc.args});

    expect(
      opts,
      `log(${JSON.stringify(tc.args)}) => ${JSON.stringify(opts)} args parsed correctly`
    ).toEqual(tc.opts);
  }
});
