import {expect, test} from 'vitest';
import {isBrowser} from '@probe.gl/env';

import {_diffImages as diffImages} from '@probe.gl/test-utils';

test('diffImage', async () => {
  if (isBrowser()) {
    return;
  }
  const dataDir = './modules/test-utils/test/data';

  const TEST_CASES = [
    {
      title: 'identical images',
      source1: `${dataDir}/icon-marker.png`,
      source2: `${dataDir}/icon-marker-2.png`,
      testMatch: (match) => match === 1,
      success: true
    },
    {
      title: 'aliased edges',
      source1: `${dataDir}/icon-marker.png`,
      source2: `${dataDir}/icon-marker-blur.png`,
      success: true
    },
    {
      title: 'aliased edges',
      source1: `${dataDir}/icon-marker.png`,
      source2: `${dataDir}/icon-marker-blur.png`,
      success: true
    },
    {
      title: 'aliased edges',
      source1: `${dataDir}/icon-marker.png`,
      source2: `${dataDir}/icon-marker-blur.png`,
      options: {includeAA: true},
      success: false
    },
    {
      title: 'color difference',
      source1: `${dataDir}/icon-marker.png`,
      source2: `${dataDir}/icon-marker-color.png`,
      options: {threshold: 0.5},
      success: true
    },
    {
      title: 'color difference',
      source1: `${dataDir}/icon-marker.png`,
      source2: `${dataDir}/icon-marker-color.png`,
      options: {threshold: 0.5, includeEmpty: false},
      success: false
    },
    {
      title: 'non-existent file',
      source1: `${dataDir}/icon-marker.png`,
      source2: `${dataDir}/non-existent.png`,
      success: false
    }
  ];

  for (const testCase of TEST_CASES) {
    const result = await diffImages(testCase.source1, testCase.source2, testCase.options);
    expect(result.success, `${testCase.title}: returns correct result`).toBe(testCase.success);
  }
});
