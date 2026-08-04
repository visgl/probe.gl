import {JSDOM} from 'jsdom';

const dom = new JSDOM('<!DOCTYPE html>');
globalThis.window = dom.window;
globalThis.document = dom.window.document;
globalThis.Element = dom.window.Element;
globalThis.__JSDOM__ = true;
