// Copyright (c) 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

// @ts-nocheck

import {afterEach, beforeEach, expect, test, vi} from 'vitest';

import api from '../src/api';

beforeEach(() => {
  api.clean();
  api.listeners.clear();
  delete globalThis.__SEER_INITIALIZED__;
});

afterEach(() => {
  api.clean();
  api.listeners.clear();
  delete globalThis.__SEER_INITIALIZED__;
  vi.restoreAllMocks();
});

test('[API] check exports', () => {
  expect(api, 'The global object is defined').toBeTruthy();
  expect(Object.keys(api).length, 'Some methods are exported').toBeGreaterThan(0);
  expect(api.send, 'The send method is defined').toBeTruthy();
});

test('[API] send', () => {
  const postMessage = vi.spyOn(window, 'postMessage').mockImplementation(() => {});

  api.send('BEFORE_INIT');
  expect(postMessage, 'postMessage should not have been called before init').not.toHaveBeenCalled();

  // @ts-expect-error
  globalThis.__SEER_INITIALIZED__ = true;

  api.send('AFTER_INIT');
  expect(postMessage, 'postMessage should now been called after init').toHaveBeenCalledOnce();
  expect(postMessage.mock.calls[0][0].type, 'The action type should match').toBe('AFTER_INIT');
});

// eslint-disable-next-line max-statements
test('[API] listeners', () => {
  const addEventListener = vi.spyOn(window, 'addEventListener').mockImplementation(() => {});

  api.init();
  api.init();

  // @ts-expect-error
  expect(window.__SEER_LISTENER__, 'The listener should have been defined').toBeTruthy();
  expect(addEventListener, 'It should have added the listener').toHaveBeenCalledOnce();
  expect(addEventListener.mock.calls[0][0], 'The listener should be on message events').toBe(
    'message'
  );

  expect(api.listeners.size, 'There should be no listeners').toBe(0);

  // @ts-expect-error
  expect(api.listenFor).toThrow();

  const deck = vi.fn();
  api.listenFor('deck.gl', deck);

  expect(api.listeners.size, 'There should be a new listener added').toBe(1);
  expect(api.listeners.has('deck.gl'), 'It should be indexed with the type').toBeTruthy();
  expect(api.listeners.get('deck.gl').length, 'It should be an array of callbacks').toBe(1);

  const listener = addEventListener.mock.calls[0][1];
  listener();
  listener({});
  listener({data: {source: 'redux'}});
  listener({data: {type: 'undefined.gl', payload: 42, source: 'seer-core'}});
  listener({data: {type: 'deck.gl', payload: 42, source: 'seer-core'}});

  expect(deck, 'The deck listener should have been called').toHaveBeenCalledOnce();
  expect(deck.mock.calls[0][0], 'With the answer').toBe(42);

  const removeEventListener = vi.spyOn(window, 'removeEventListener').mockImplementation(() => {});

  api.clean();
  api.clean();
  // @ts-expect-error
  expect(window.__SEER_LISTENER__).toBeFalsy();
  expect(removeEventListener, 'The listener should have been removed').toHaveBeenCalledOnce();

  api.listenFor('deck.gl', (f) => f);
});

test('[API] methods', () => {
  const postMessage = vi.spyOn(window, 'postMessage').mockImplementation(() => {});
  // @ts-expect-error
  globalThis.__SEER_INITIALIZED__ = true;
  [
    ['LIST', 'list'],
    ['LIST_ITEM', 'listItem']
  ].forEach(([type, method], index) => {
    api[method]({key: 'deck.gl'});
    expect(postMessage.mock.calls.length, 'The call count should increment each time').toBe(
      index + 1
    );
    expect(postMessage.mock.calls[index][0].source, 'The source should be correct').toBe(
      'seer-agent'
    );
    expect(postMessage.mock.calls[index][0].type, 'The type should match').toBe(type);
  });
});
