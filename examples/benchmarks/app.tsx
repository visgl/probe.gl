// probe.gl benchmark example
import React, {PureComponent, createRef} from 'react';
import {render} from 'react-dom';

import {Bench, type LogEntry} from 'probe.gl/bench';
import {BenchResultsWidget} from 'probe.gl/bench-widget';

import addBenchmarks from '../../test/bench/samples.bench';

type AppProps = {};

export default class App extends PureComponent<AppProps> {
  constructor(props: AppProps) {
    super(props);

    addBenchmarks(this.suite);
  }

  private container = createRef<HTMLDivElement>();
  private widget: BenchResultsWidget | null = null;

  override componentDidMount() {
    this.widget = new BenchResultsWidget({container: this.container.current!, records: this.log});
    this.suite
      // Calibrate performance
      // @ts-ignore
      .calibrate()
      .run()
      // when running in browser, notify test the driver that it's done
      .then(() => {});
  }

  suite: Bench = new Bench({log: this._addResultToLog.bind(this)});
  log: LogEntry[] = [];

  _addResultToLog(logEntry: LogEntry) {
    this.log.push(logEntry);
    this.widget?.setProps({records: this.log});
  }

  override componentWillUnmount() {
    this.widget?.destroy();
    this.widget = null;
  }

  override render() {
    return (
      <div>
        <div ref={this.container} />
      </div>
    );
  }
}

export function renderToDOM(container) {
  render(<App />, container);
}
