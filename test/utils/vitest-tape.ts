import {expect, test as vitestTest} from 'vitest';

type TestCallback = (test: Test) => void | Promise<void>;
type MatchPattern = RegExp | string;

function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (!value || typeof value !== 'object') {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function normalizeValue(value: unknown, seenValues: WeakSet<object> = new WeakSet()): unknown {
  if (typeof value === 'number' && Object.is(value, -0)) {
    return 0;
  }
  if (ArrayBuffer.isView(value)) {
    return Array.from(value as ArrayLike<number>, (item) => normalizeValue(item, seenValues));
  }
  if (Array.isArray(value)) {
    return value.map((item) => normalizeValue(item, seenValues));
  }
  if (isPlainObject(value)) {
    if (seenValues.has(value)) {
      return '[Circular]';
    }
    seenValues.add(value);
    const normalizedObject: Record<string, unknown> = {};
    for (const [key, entryValue] of Object.entries(value)) {
      normalizedObject[key] = normalizeValue(entryValue, seenValues);
    }
    seenValues.delete(value);
    return normalizedObject;
  }
  return value;
}

function usesExplicitEndSignal(callback: TestCallback): boolean {
  return /\.end\s*\(/.test(callback.toString());
}

export interface Test {
  comment(...messages: unknown[]): void;
  deepEqual(actual: unknown, expected: unknown, message?: string): void;
  deepEquals(actual: unknown, expected: unknown, message?: string): void;
  doesNotThrow(callback: () => unknown, message?: string): void;
  end(): void;
  equal(actual: unknown, expected: unknown, message?: string): void;
  equals(actual: unknown, expected: unknown, message?: string): void;
  fail(message?: string): never;
  falsy(value: unknown, message?: string): void;
  is(actual: unknown, expected: unknown, message?: string): void;
  ok(value: unknown, message?: string): void;
  pass(message?: string): void;
  throws(
    callback: () => unknown,
    expectedOrMessage?: MatchPattern | (new (...args: never[]) => Error) | string,
    message?: string
  ): void;
  truthy(value: unknown, message?: string): void;
}

class VitestTape implements Test {
  private readonly endPromise: Promise<void>;
  private endResolver: (() => void) | null = null;
  private hasEnded = false;

  constructor() {
    this.endPromise = new Promise((resolve) => {
      this.endResolver = resolve;
    });
  }

  comment(..._messages: unknown[]): void {}

  deepEqual(actual: unknown, expected: unknown, message?: string): void {
    expect(normalizeValue(actual), message).toEqual(normalizeValue(expected));
  }

  deepEquals(actual: unknown, expected: unknown, message?: string): void {
    this.deepEqual(actual, expected, message);
  }

  doesNotThrow(callback: () => unknown, message?: string): void {
    expect(callback, message).not.toThrow();
  }

  end(): void {
    if (!this.hasEnded) {
      this.hasEnded = true;
      this.endResolver?.();
    }
  }

  equal(actual: unknown, expected: unknown, message?: string): void {
    if (
      typeof actual === 'number' &&
      typeof expected === 'number' &&
      actual === 0 &&
      expected === 0
    ) {
      expect(true, message).toBe(true);
      return;
    }
    expect(actual, message).toBe(expected);
  }

  equals(actual: unknown, expected: unknown, message?: string): void {
    this.equal(actual, expected, message);
  }

  fail(message?: string): never {
    throw new Error(message || 'Forced failure');
  }

  falsy(value: unknown, message?: string): void {
    expect(Boolean(value), message).toBe(false);
  }

  is(actual: unknown, expected: unknown, message?: string): void {
    this.equal(actual, expected, message);
  }

  ok(value: unknown, message?: string): void {
    expect(Boolean(value), message).toBe(true);
  }

  pass(message?: string): void {
    expect(true, message).toBe(true);
  }

  throws(
    callback: () => unknown,
    expectedOrMessage?: MatchPattern | (new (...args: never[]) => Error) | string,
    message?: string
  ): void {
    if (typeof expectedOrMessage === 'string' && message === undefined) {
      expect(callback, expectedOrMessage).toThrow();
      return;
    }
    if (expectedOrMessage === undefined) {
      expect(callback, message).toThrow();
      return;
    }
    expect(callback, message).toThrow(expectedOrMessage as MatchPattern);
  }

  truthy(value: unknown, message?: string): void {
    expect(Boolean(value), message).toBe(true);
  }

  async run(callback: TestCallback): Promise<void> {
    const waitsForEnd = usesExplicitEndSignal(callback);
    await callback(this);
    if (waitsForEnd) {
      await this.endPromise;
    }
  }
}

export type TapeTestFunction = {
  (name: string, callback: TestCallback): ReturnType<typeof vitestTest>;
  only: (name: string, callback: TestCallback) => ReturnType<typeof vitestTest.only>;
  skip: (name: string, callback?: TestCallback) => ReturnType<typeof vitestTest.skip>;
};

function wrapTest(
  vitestImplementation: typeof vitestTest | typeof vitestTest.only
): (name: string, callback?: TestCallback) => ReturnType<typeof vitestImplementation> {
  return ((name: string, callback?: TestCallback) =>
    vitestImplementation(name, async () => {
      if (callback) {
        await new VitestTape().run(callback);
      }
    })) as (name: string, callback?: TestCallback) => ReturnType<typeof vitestImplementation>;
}

const test = wrapTest(vitestTest) as TapeTestFunction;
test.only = wrapTest(vitestTest.only);
test.skip = wrapTest(vitestTest.skip);

export default test;
