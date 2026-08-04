// @ts-nocheck

import {expect, test} from 'vitest';
import {Stats} from '@probe.gl/stats';
import {StatsWidget} from '@probe.gl/stats-widget';

const _global = typeof global === 'undefined' ? window : global;

const statsContent = [
  {
    name: 'Count',
    type: 'count'
  },
  {
    name: 'Total Time',
    type: 'totalTime'
  },
  {
    name: 'GPU Memory',
    type: 'memory'
  }
];

function getStatsObject() {
  const stats = new Stats({id: 'test-stats'});
  statsContent.forEach(({name, type}) => {
    stats.get(name, type);
  });
  return stats;
}

test('StatsWidget#import', () => {
  expect(typeof StatsWidget, 'Stats import OK').toBe('function');
});

test('StatsWidget#Constructor with no stats or options', () => {
  const statsWidget = new StatsWidget(null);
  expect(statsWidget._container, 'Should create a dom container.').toBeTruthy();
  expect(statsWidget._header, 'Should create a dom header.').toBeTruthy();
  expect(
    statsWidget._innerContainer.parentElement === statsWidget._container,
    'Should append inner container to container'
  ).toBeTruthy();
  expect(
    statsWidget._innerContainer.childNodes[0] === statsWidget._header,
    'Should append header to inner container as the first child'
  ).toBeTruthy();
  expect(
    statsWidget._innerContainer.childNodes[1] === statsWidget._statsContainer,
    'Should append stats container to inner container as the second child'
  ).toBeTruthy();
  statsWidget.remove();
});

test('StatsWidget#Constructor with container', () => {
  const container = _global.document.createElement('div');
  container.id = 'test-stats-widget-container';
  const statsWidget = new StatsWidget(null, {container});
  expect(statsWidget._container, 'container has been set').toBe(container);
  statsWidget.remove();
});

test('StatsWidget#setStats', () => {
  const container = _global.document.createElement('div');
  container.id = 'test-stats-widget-container';
  const statsWidget = new StatsWidget(null, {container});
  const stats = getStatsObject();

  expect(Object.keys(statsWidget._items).length, 'Should have no items when no stats.').toBe(0);

  statsWidget.setStats(stats);

  expect(Object.keys(statsWidget._items).length, 'Should have 3 items.').toBe(3);
  expect(statsWidget._container.childNodes.length, 'Should have 2 child nodes.').toBe(1);
  expect(statsWidget._innerContainer.childNodes.length, 'Should have 2 child nodes.').toBe(2);
  expect(statsWidget._statsContainer.childNodes.length, 'Should have 3 child nodes.').toBe(3);
  expect(statsWidget._counter, 'Should call update() and increase _counter.').toBe(1);

  statsWidget.remove();
});

test('StatsWidget#collapse', () => {
  const container = _global.document.createElement('div');
  container.id = 'test-stats-widget-container';
  const statsWidget = new StatsWidget(getStatsObject(), {container});

  expect(statsWidget.collapsed, 'Starts uncollapsed').toBeFalsy();
  expect(statsWidget._statsContainer.style.display, 'Starts in block display').toBe('block');

  statsWidget.setCollapsed(true);

  expect(statsWidget.collapsed, 'Collapses').toBeTruthy();
  expect(statsWidget._statsContainer.style.display, 'Collapses to none display').toBe('none');

  statsWidget.setCollapsed(false);

  expect(statsWidget.collapsed, 'Uncollapses').toBeFalsy();
  expect(statsWidget._statsContainer.style.display, 'Uncollapses to block display').toBe('block');

  statsWidget.remove();
});

/* eslint-disable */
test('StatsWidget#Update stats', () => {
  const container = _global.document.createElement('div');
  container.id = 'test-stats-widget-container';
  const statsWidget = new StatsWidget(null, {container});
  const stats = getStatsObject();

  statsWidget.setStats(stats);

  stats.get('Count').incrementCount();
  statsWidget.update();

  // @ts-expect-error
  expect(Object.keys(statsWidget._items).length, 'Should have 3 items.').toBe(3);
  // @ts-expect-error
  expect(statsWidget._container.childNodes.length, 'Should have 1 child nodes.').toBe(1);
  expect(statsWidget._innerContainer.childNodes.length, 'Should have 2 child nodes.').toBe(2);
  expect(statsWidget._statsContainer.childNodes.length, 'Should have 3 child nodes.').toBe(3);

  // @ts-expect-error
  expect(statsWidget._items.Count.innerHTML, 'Should correctly update count stats.').toBe(
    'Count: 1'
  );

  stats.get('GPU Memory').addCount(1500);
  statsWidget.update();

  expect(
    // @ts-expect-error
    statsWidget._items['GPU Memory'].innerHTML,
    'Should correctly update memory stats.'
  ).toBe('GPU Memory: 1.46kB');

  statsWidget.remove();
});

test('StatsWidget#formatters', () => {
  // @ts-expect-error
  const container = _global.document.createElement('div');
  container.id = 'test-stats-widget-container';
  const statsWidget = new StatsWidget(null, {
    container,
    formatters: {
      'GPU Memory': 'count',
      Count: (stat) => `${stat.name}: ${(stat.count / 1000).toFixed(1)}k`
    }
  });
  const stats = getStatsObject();

  statsWidget.setStats(stats);

  stats.get('Count').addCount(1000);
  stats.get('GPU Memory').addCount(1500);
  statsWidget.update();

  // @ts-expect-error
  expect(statsWidget._items.Count.innerHTML, 'Should use customized formatter.').toBe(
    'Count: 1.0k'
  );
  expect(
    // @ts-expect-error
    statsWidget._items['GPU Memory'].innerHTML,
    'Should use customized formatter.'
  ).toBe('GPU Memory: 1500');

  statsWidget.setStats(new Stats({id: 'test-stats-2'}));
  // @ts-expect-error
  expect(statsWidget._header.innerText, "Should use the new stats' header.").toBe(
    '\u2b07 test-stats-2'
  );

  statsWidget.remove();
});

test('StatsWidget#resetOnUpdate', () => {
  // @ts-expect-error
  const container = _global.document.createElement('div');
  container.id = 'test-stats-widget-container';
  const statsWidget = new StatsWidget(null, {
    container,
    resetOnUpdate: {Count: true}
  });
  const stats = getStatsObject();

  statsWidget.setStats(stats);

  stats.get('Count').addCount(1000);
  stats.get('GPU Memory').addCount(1500);
  statsWidget.update();

  expect(stats.get('Count').count, 'Should reset count.').toBe(0);
  expect(stats.get('GPU Memory').count, 'Should not reset memory.').toBe(1500);

  statsWidget.remove();
});

test('StatsWidget#remove', () => {
  const container = _global.document.createElement('div');
  container.id = 'test-stats-widget-container';
  const statsWidget = new StatsWidget(null, {container});
  expect(statsWidget._container === container).toBeTruthy();
  expect(statsWidget._container.childNodes.length, 'Should have 1 child node.').toBe(1);
  statsWidget.remove();
  expect(statsWidget._container.childNodes.length, 'Should have 0 child nodes.').toBe(0);
});
