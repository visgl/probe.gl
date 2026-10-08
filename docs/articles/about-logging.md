# Console logging

`ProbeLog` (also exported as `Log`) adds levels, persistent configuration, and timing output to the runtime console.

## Emit a message

```js
import {Log} from '@probe.gl/log';

const log = new Log({id: 'my-app'});
log.setLevel(1);
log.probe(1, 'Data loaded', {rows: 100})();
```

The first call prepares the message and returns a function bound to the console method. The second call emits it. Calling that function immediately gives browser developer tools a useful source location. Omitting `()` produces no console output.

## Levels

A message is emitted when the logger is enabled and its level is at least the message's level. Level `0` is the default; use higher levels for increasingly detailed diagnostics. Warnings and errors use level `0`.

```js
log.setLevel(2);
log.log(2, 'Detailed diagnostics')();
log.enable(false);
```

Use an options object for additional controls:

```js
log.log({logLevel: 1, message: 'Connected', once: true})();
```

`once` caches messages per logger. Warnings use this behavior by default.

## Dynamic messages

The message can be a string or a function returning a string. Message functions are evaluated during the first call, before level filtering. They do not defer expensive work until logging is enabled.

```js
log.log(1, () => `Loaded ${items.length} items`)();
```

Guard expensive diagnostics explicitly:

```js
if (log.isEnabled() && log.getLevel() >= 2) {
  log.log(2, buildDiagnostics())();
}
```

Additional arguments are passed to the console method, so objects remain inspectable in developer tools.

## Timings and structured output

`log.probe()` includes elapsed and delta timings. It also includes heap usage when the runtime exposes `performance.memory`. Use `time()` and `timeEnd()` for named console timers, `group()` and `groupEnd()` for related messages, and `table()` for tabular data. These methods also return functions that must be called.

See the [Log reference](../modules/log/log.md) for signatures and configuration.
