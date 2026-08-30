/* eslint-disable max-len */
import {expect, test} from 'vitest';
import {mean, std, cv} from '@probe.gl/bench/stat-utils';

// wolfram alpha: mean {1, 2, 3}
test('statistics#mean', () => {
  const MEAN_TESTS = [
    {
      input: [1],
      output: 1
    },
    {
      input: [1, 2],
      output: 1.5
    },
    {
      input: [1, 2, 3],
      output: 2
    }
  ];
  for (const tc of MEAN_TESTS) {
    const result = mean(tc.input);
    expect(result.toPrecision(11), 'returns correct mean').toBe(tc.output.toPrecision(11));
  }
});

// wolfram alpha: standard deviation {1, 2, 3}
test('statistics#std', () => {
  const STD_TESTS = [
    {
      input: [1],
      output: 0
    },
    {
      input: [1, 2, 3, 4],
      output: 1.2909944487
    },
    {
      input: [1, 2, 3, 4, 5, 6, 7],
      output: 2.1602468995
    }
  ];
  for (const tc of STD_TESTS) {
    const result = std(tc.input);
    expect(result.toPrecision(11), 'returns correct standard deviation').toBe(
      tc.output.toPrecision(11)
    );
  }
});

// wolfram alpha: coefficient of variation {1, 2, 3}
test('statistics#cv', () => {
  const STD_ERR_TESTS = [
    {
      input: [1],
      output: 0
    },
    {
      input: [15, 31, 25, 22, 22, 19, 17, 28, 24, 5, 22, 24, 22, 20, 26, 21],
      output: 0.27516265016
    }
  ];
  for (const tc of STD_ERR_TESTS) {
    const result = cv(tc.input);
    expect(result.toPrecision(11), 'returns correct standard deviation').toBe(
      tc.output.toPrecision(11)
    );
  }
});
