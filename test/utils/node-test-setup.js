import {JSDOM} from 'jsdom';

globalThis.__PROBE_BENCH_IS_TEST__ = true;

const dom = new JSDOM('<!DOCTYPE html>');
globalThis.window = dom.window;
globalThis.document = dom.window.document;
globalThis.Element = dom.window.Element;
globalThis.__JSDOM__ = true;
