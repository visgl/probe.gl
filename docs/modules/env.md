# Environment utilities

`@probe.gl/env` provides runtime detection and references to globals for shared browser and Node.js code.

```bash
npm install @probe.gl/env
```

```js
import {isBrowser, isElectron, getBrowser} from '@probe.gl/env';

if (isBrowser()) {
  console.log(getBrowser());
}
```

## Functions

| Function | Result |
| --- | --- |
| `isBrowser()` | `false` for a Node.js process; Electron is treated as a browser environment. |
| `isElectron(mockUserAgent?)` | Checks Electron process markers and the user agent. |
| `getBrowser(mockUserAgent?)` | Returns `Node`, `Electron`, `Chrome`, `Firefox`, `Safari`, `Edge`, or `Unknown`. |
| `isMobile()` | Checks whether `globalThis.orientation` exists. This is a heuristic, not a complete device classifier. |
| `assert(condition, message?)` | Throws an error if the condition is falsy. |

Browser detection uses runtime markers and user-agent heuristics. Prefer checking the API you need when deciding whether a feature is available.

## Global references

The package exports `self`, `window`, `global`, `document`, `process`, and `console`. `self`, `window`, and `global` reference `globalThis`; `document` and `process` fall back to empty objects when unavailable. These references do not polyfill DOM or Node.js APIs.
