// probe.gl, MIT license

import {Bench} from '@probe.gl/bench';
import addBenchmarks from './samples.bench';

const suite = new Bench();

addBenchmarks(suite);

suite
  // Calibrate performance
  .calibrate()
  .run();
