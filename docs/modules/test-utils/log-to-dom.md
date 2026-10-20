# enableDOMLogging (experimental)

> **Removed in v5:** This page documents the historical `@probe.gl/test-utils` package. It is no longer included in this repository or release. Use your test framework's spies, browser automation, screenshot assertions, and reporting for new code.


A utility that takes console output and display a copy in the dom for easy debugging. Inspired by [tap-browser-color](https://github.com/kirbysayshi/tap-browser-color).


## Usage

```js
import {_enableDOMLogging as enableDOMLogging} from '@probe.gl/test-utils';
enableDOMLogging();
```


## Function

### enableDOMLogging(options : Any)

Turn DOM logging on/off.

* if `options` is not provided, enable DOM logging with default options.
* if `options` is an object, enable DOM logging. The following options are available:
  - `container` (DOMElement) - the container to log into. If not provided, will append a new `div` to the document.
  - `getStyle` (Function) - called when the log updates to get the css styles object for the container.
* if `options` is `false`, disable all DOM logging.
