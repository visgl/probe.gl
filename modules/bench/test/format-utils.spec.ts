/* eslint-disable max-len */
import {expect, test} from 'vitest';
import {formatSI} from '@probe.gl/bench/format-utils';

const FORMAT_SI_TESTS = [
  {value: 0, result: '0.00'},
  {value: 1.234, result: '1.23'},
  {value: 1234, result: '1.23K'},
  {value: 12340, result: '12.3K'},
  {value: 0.1234, result: '123m'},
  {value: 0.0001234, result: '123µ'}
];

test('formatters#formatSI', () => {
  for (const tc of FORMAT_SI_TESTS) {
    const result = formatSI(tc.value);
    expect(result, `formatSI(${tc.value}) should be ${tc.result}`).toBe(tc.result);
  }
});
