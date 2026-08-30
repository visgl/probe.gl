# About Testing

probe.gl provides a set of test utilities intended to facilitate typical testing tasks.


## Browser Test Automation

A key part of the test utilities is a framework for automating browser tests using puppeteer. The intention is to make browser tests invokable from the terminal by e.g. `package.json` scripts, by spawning a browser and waiting until the test results are available, then closing the browser and reporting back the results to the shell script.

* `BrowserDriver` is a relatively low-level class that provides a `Promise` based interface to `puppeteer` as well as facilities for spawning a "dev server" and communicating status via exit codes back to the invoking shell. This class is intended as a building block for custom automation tasks.
* `BrowserTestDriver` is a subclass of `BrowserDriver` intended to be a turnkey solution for typical browser tests.


## Function Spies

probe.gl provides a `makeSpy` function that enables you to check whether your functions were called during test execution.


## Visual Regression Testing

probe.gl provides experimental image loading and diffing tools. Together with the automation facilities, these can be used to create visual regression tests.
