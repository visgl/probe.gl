/** @deprecated Use your test framework's spy utilities instead. */
export {makeSpy} from './make-spy';

/** @deprecated Use Playwright or your test runner's browser support instead. */
export {default as BrowserDriver} from './browser-automation/browser-driver';
/** @deprecated Use Playwright or your test runner's browser support instead. */
export {default as BrowserTestDriver} from './browser-automation/browser-test-driver';

// EXPERIMENTAL TEST UTILS

// Image tools
/** @deprecated Use your test runner's screenshot assertions or pixelmatch directly instead. */
export {default as _diffImages} from './utils/diff-images';
// DOM logging
/** @deprecated Use console logging or your test runner's reporting instead. */
export {enableDOMLogging as _enableDOMLogging} from './utils/log-to-dom';
