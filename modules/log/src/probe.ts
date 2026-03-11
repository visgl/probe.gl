import {isBrowser, process, window} from '@probe.gl/env';

declare global {
  type ProbeConstructor = new () => Probe;

  // eslint-disable-next-line no-var
  var Probe: ProbeConstructor;
  // eslint-disable-next-line no-var
  var probe: Probe;
}

export class Probe {
  markdown?: boolean;
  priority?: number;

  getHighResolutionTimer(): number {
    let timestamp;
    if (isBrowser() && window.performance) {
      timestamp = window?.performance?.now?.();
    } else if ('hrtime' in process) {
      // @ts-ignore
      const timeParts = process?.hrtime?.();
      timestamp = timeParts[0] * 1000 + timeParts[1] / 1e6;
    } else {
      timestamp = Date.now();
    }
    return timestamp;
  }

  getMemoryUsageMB(): number | null {
    const performance = window?.performance as {
      memory?: {
        usedJSHeapSize?: number | null;
      };
    };
    const usedJSHeapSize = performance?.memory?.usedJSHeapSize;
    if (usedJSHeapSize === undefined || usedJSHeapSize === null) {
      return null;
    }
    return Math.trunc(usedJSHeapSize / 1024 / 1024);
  }
}

export const probe = new Probe();

globalThis.Probe = Probe;
globalThis.probe = probe;
