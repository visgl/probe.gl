// probe.gl, MIT license

import {BenchResultsWidget, type BenchResult} from 'probe.gl/bench-widget';
import {Bench} from 'probe.gl/bench';
import addBenchmarks from './samples.bench';

const records: BenchResult[] = [];
const widget = new BenchResultsWidget({container: document.body});
const suite = new Bench({
  log(entry) {
    records.push(entry);
    widget.setProps({records});
  }
});

addBenchmarks(suite);

suite
  // Calibrate performance
  .calibrate()
  .run();
