import {expect, test} from 'vitest';

import {BrowserTestDriver} from '@probe.gl/test-utils';

function createTestCanvas() {
  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, {position: 'fixed', top: 0, left: 0, zIndex: 99});
  canvas.width = 40;
  canvas.height = 40;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('context');
  }
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, 40, 40);
  ctx.strokeStyle = '#000';
  ctx.fillStyle = '#f00';
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(8, 8);
  ctx.lineTo(32, 8);
  ctx.lineTo(20, 32);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();

  return canvas;
}

test('BrowserTestDriver#import', () => {
  expect(BrowserTestDriver, 'BrowserTestDriver symbol imported').toBeTruthy();
});

test('BrowserTestDriver#ImageDiff', async () => {
  if (typeof document === 'undefined' || !window.browserTestDriver_captureAndDiffScreen) {
    return;
  }

  const canvas = createTestCanvas();
  document.body.append(canvas);

  const diffSettings = {
    threshold: 0.99,
    goldenImage: 'test/golden-images/test.png',
    region: {x: 0, y: 0, width: 40, height: 40}
  };

  try {
    let result = await window.browserTestDriver_captureAndDiffScreen(diffSettings);
    if (result.success) {
      expect(result.success, `Screenshot matches golden image: ${result.matchPercentage}`).toBe(
        true
      );
    } else if (result.error) {
      throw new Error(`Image diff throws error: ${result.error}`);
    } else {
      throw new Error(`Screenshot should match golden image: ${result.matchPercentage}`);
    }

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ff0';
    ctx.fillRect(10, 10, 12, 12);
    result = await window.browserTestDriver_captureAndDiffScreen(diffSettings);
    if (result.success) {
      throw new Error(`Screenshot should not match golden image: ${result.matchPercentage}`);
    } else if (result.error) {
      throw new Error(`Image diff throws error: ${result.error}`);
    } else {
      expect(
        result.success,
        `Screenshot does not match golden image: ${result.matchPercentage}`
      ).toBe(false);
    }
  } catch (ex) {
    throw new Error(`Unexpected error: ${ex}`);
  }

  document.body.removeChild(canvas);
});
