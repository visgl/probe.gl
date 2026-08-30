# Debugging with probe.gl

`ProbeLog` does not install a global variable automatically. When interactive
debugging is useful, expose the logger from your application during startup:

```js
import log from '@probe.gl/log';

window.appLog = log;
```

You can then inspect and change the logger from the browser developer console:

```js
appLog.getLevel();
appLog.setLevel(2);
appLog.enable(false);
appLog.settings();
```

`ProbeLog` stores its `enabled` and `level` settings in browser storage, so
these changes persist across page reloads. Remove the exposed reference from
your application code when it is no longer needed.
