import {expect, test} from 'vitest';
import {BenchResultsWidget, type BenchResult} from '../src/widget';

const result: BenchResult = {
  type: 'test',
  id: '<script>example</script>',
  message: '',
  iterationsPerSecond: 1500000,
  itersPerSecond: '1.5M',
  unit: '',
  error: 0.01,
  time: 1
};

test('widget renders typed logs safely and updates without duplicating its table', () => {
  const container = document.createElement('div');
  const widget = new BenchResultsWidget({
    container,
    records: [
      {type: 'group', id: 'Math', message: 'Math'},
      result,
      {type: 'complete', time: 1, message: 'Complete'}
    ]
  });
  expect(container.querySelectorAll('tbody tr')).toHaveLength(2);
  expect(container.textContent).toContain('<script>example</script>');
  expect(container.querySelector('script')).toBeNull();
  expect(container.textContent).toContain('1.5M iterations/s');
  widget.setProps({records: []});
  expect(container.querySelectorAll('table')).toHaveLength(1);
  expect(container.querySelectorAll('tbody tr')).toHaveLength(0);
  widget.destroy();
});

test('widget cleanup preserves host content and supports remounts', () => {
  const container = document.createElement('div');
  const sibling = document.createElement('span');
  container.appendChild(sibling);
  const widget = new BenchResultsWidget({container});
  widget.destroy();
  widget.destroy();
  widget.setProps({records: [result]});
  expect(container.children).toHaveLength(1);
  expect(container.firstChild).toBe(sibling);
  const replacement = new BenchResultsWidget({container});
  expect(container.querySelectorAll('table')).toHaveLength(1);
  replacement.destroy();
});

test('widget bounds invalid and extreme throughput decoration', () => {
  const container = document.createElement('div');
  const widget = new BenchResultsWidget({container});
  for (const iterationsPerSecond of [0, -1, NaN, Infinity, 1e100]) {
    widget.setProps({records: [{...result, iterationsPerSecond}]});
    const bar = container.querySelector<HTMLElement>('[aria-hidden] > div')!;
    expect(bar.style.width).toBe(iterationsPerSecond === 1e100 ? '100%' : '0%');
    expect(bar.textContent!.length).toBeLessThanOrEqual(5);
  }
  widget.destroy();
});
