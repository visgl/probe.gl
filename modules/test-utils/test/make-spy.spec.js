import test from 'test/utils/vitest-tape';

import {makeSpy} from '@probe.gl/test-utils';

test('import "@probe.gl/test-utils"', (t) => {
  t.ok(typeof makeSpy, 'makeSpy symbol imported');
  t.end();
});
