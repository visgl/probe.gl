/* eslint-disable max-len */
import {expect, test} from 'vitest';
import {getBrowser} from '@probe.gl/env';

test('getBrowser', () => {
  expect(
    getBrowser(
      'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0'
    ),
    'should return Edge for IE 12'
  ).toBe('Edge');
});
