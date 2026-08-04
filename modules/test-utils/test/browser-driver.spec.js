import {expect, test} from 'vitest';

import {BrowserDriver} from '@probe.gl/test-utils';

test('BrowserDriver#import', () => {
  expect(BrowserDriver, 'BrowserDriver symbol imported').toBeTruthy();
});
