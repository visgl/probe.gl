# Console Logging

### Probe API Signature

A probe.gl function invocation typically looks like this:
```js
log.probe(logLevel, message, ...args)();
```

There are a lot of conventions and built-in capabilities. The following sections contain observations about this signature and provide more background about what is happening.


### Why Double Function Calls?

A distinctive aspect of the probe API is the requirement for two function calls, with an extra pair of parentheses at the end of `log.probe(...)()`. The second call lets the Chrome browser console preserve a clickable link to the probe call in your application source code.

The second call is an unusual JavaScript idiom, and if you omit it nothing will be logged. The returned function also lets probe.gl defer message formatting until the log is known to be enabled.


### Log Priority

A basic feature of probe.gl is that you can assign a `logLevel` threshold to each probe. A higher value makes a probe less likely to fire: a probe only fires when the logger's level is greater than or equal to the probe's level.

Because of this, most probe.gl APIs take a `logLevel` parameter as a first argument.

| `0` | Unconditional when the logger is enabled. Warnings and errors use level `0` by default. |
| `1` | Fires when the logger level is `1` or higher. |
| `2` | Fires when the logger level is `2` or higher. |
| `3` | Fires when the logger level is `3` or higher. |
| `4` | Fires when the logger level is `4` or higher. |

Note that regardless of log level, probes will only fire assuming probe itself is enabled.


### Log Options

The `logLevel` parameter can be supplied in the following ways:
* `logLevel` can be omitted. In this case, it defaults to `0`.
* `logLevel` can be a `Number`, in which case it is the minimum logger level required for this probe to fire.
* An options `Object` can be supplied with `logLevel`, `message`, and other options.

* `logLevel` (`Number`) - the minimum logger level required to emit the message. Defaults to `0`.
* `once` (`Boolean`) - if `true`, the message is cached and this log is emitted only once for the lifetime of the logger.


### Log Message

Many probe.gl API calls take a `message` parameter. This `message` is an overloaded parameter that can be either a string or a function that returns a string, which will be called every time the probe fires.

The main purpose of supporting functions is to avoid situations where a message string is being generated even when the probe doesn't fire:

A typical inconvenience when logging is unwanted performance impact when generating dynamic log messages. In the case below, the string template literal is being generated every time the line executes, *even when logging is disabled*:
```js
log.probe(1, `${object} has ${value}`)();
```
With probe, the solution is easy:
```js
log.probe(1, () => `${object} has ${value}`)();
```
Now the performance overhead of the probe is again minimized.


### Log Parameters

Most probe methods accept a variable number of additional arguments at the end of the function call. These arguments are passed directly to the underlying console method, allowing browser developer tools to expand objects and arrays.


## Probe Timings


## Types of Probes

### Groups

Chrome provides a wonderful grouping feature that allows us to organize logs in expandable headers.

### Tables

Chrome provides a table logging method
