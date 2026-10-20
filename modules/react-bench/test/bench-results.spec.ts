import React from 'react';
import {render, unmountComponentAtNode} from 'react-dom';
import {expect, test} from 'vitest';
import {BenchResults} from '../src';

test('React adapter mounts, updates, unmounts, and remounts the DOM widget', () => {
  const container = document.createElement('div');
  render(
    React.createElement(BenchResults, {
      log: [{id: 'group'}, {id: 'test', value: 1e6, formattedValue: '1M'}]
    }),
    container
  );
  expect(container.querySelectorAll('tbody tr')).toHaveLength(2);
  render(
    React.createElement(BenchResults, {
      log: [{id: 'replacement', value: 2e6, formattedValue: '2M'}]
    }),
    container
  );
  expect(container.querySelectorAll('table')).toHaveLength(1);
  expect(container.textContent).toContain('2M iterations/s');
  unmountComponentAtNode(container);
  expect(container.children).toHaveLength(0);
  render(React.createElement(BenchResults, {log: []}), container);
  expect(container.querySelectorAll('table')).toHaveLength(1);
  unmountComponentAtNode(container);
});
