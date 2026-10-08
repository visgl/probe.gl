# Console source locations

A wrapper that calls `console.log()` internally usually makes developer tools link to the wrapper instead of the application call site.

probe.gl returns a bound console function. Calling it immediately keeps the console invocation in application code:

```js
import {Log} from '@probe.gl/log';

const log = new Log({id: 'my-app'});
log.log(1, 'Data loaded')();
```

This pattern also supports level filtering and repeated-message suppression. See [console logging](./about-logging.md) for the calling convention and its performance implications.
