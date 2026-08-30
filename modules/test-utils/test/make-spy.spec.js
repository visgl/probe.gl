import {expect, test} from 'vitest';

import {makeSpy} from '@probe.gl/test-utils';

test('import "@probe.gl/test-utils"', () => {
  expect(typeof makeSpy, 'makeSpy symbol imported').toBeTruthy();
});
