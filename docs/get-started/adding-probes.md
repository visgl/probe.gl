# Add logging and instrumentation

The `@probe.gl/log` package exports a full-featured `ProbeLog` class, also
available as `Log`, plus a default logger instance. Logging methods return a
function that should be called immediately. This extra call lets probe.gl
avoid formatting messages when they are filtered out and preserves useful
source locations in browser developer tools.

## Install

```bash
npm install @probe.gl/log
```

## Create a logger

Use the default logger for simple applications:

```js
import log from '@probe.gl/log';

log.info(0, 'Application started')();
log.probe(1, 'Loaded data')();
```

For an application-specific logger, create a `Log` instance with an id. The
id is also used as the key for persisted browser configuration:

```js
import {Log} from '@probe.gl/log';

const log = new Log({id: 'my-app'});
log.enable();
log.setLevel(2);

log.log(1, 'A debug message')();
log.warn('A warning')();
```

The logger is enabled by default. Set a higher level to allow messages with
higher levels, or disable the logger entirely:

```js
log.setLevel(2);
log.enable(false);
```

Levels are inclusive: a logger at level `2` emits messages at levels `0`, `1`,
and `2`. Warnings and errors use level `0` and are emitted whenever the logger
is enabled.

## Defer expensive messages

Pass a function when building the message is expensive. The function is only
called if the message will be emitted:

```js
log.log(2, () => `Loaded ${items.length} items`)();
```

## Configure from the browser console

`ProbeLog` persists its `enabled` and `level` settings in browser storage, so
they survive page reloads. Expose an application logger yourself when useful
for interactive debugging:

```js
window.appLog = log;
```

You can then inspect or change it from the developer console:

```js
appLog.getLevel();
appLog.setLevel(3);
appLog.enable(false);
```
