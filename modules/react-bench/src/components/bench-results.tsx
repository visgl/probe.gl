import React, {Component, createRef} from 'react';
import {BenchResultsWidget} from 'probe.gl/bench-widget';
import type {BenchResult} from 'probe.gl/bench-widget';

/** Legacy records supported during migration to Bench log entries. */
export type LegacyBenchResult = {
  id: string;
  value?: number;
  formattedValue?: string;
  formattedError?: string;
};

export type BenchResultsProps = {
  log: readonly LegacyBenchResult[];
};

/** @deprecated Use BenchResultsWidget from probe.gl/bench-widget. */
export class BenchResults extends Component<BenchResultsProps> {
  private container = createRef<HTMLDivElement>();
  private widget: BenchResultsWidget | null = null;

  override componentDidMount(): void {
    if (this.container.current) {
      this.widget = new BenchResultsWidget({container: this.container.current});
      this.componentDidUpdate();
    }
  }

  override componentDidUpdate(): void {
    const records: BenchResult[] = this.props.log.map((record) =>
      record.formattedValue === undefined
        ? {type: 'group', id: record.id, message: record.id}
        : {
            type: 'test',
            id: record.id,
            message: record.id,
            iterationsPerSecond: record.value ?? 0,
            itersPerSecond: record.formattedValue,
            unit: 'iterations',
            error: parseFloat(record.formattedError || '0') / 100,
            time: 0
          }
    );
    this.widget?.setProps({records});
  }

  override componentWillUnmount(): void {
    this.widget?.destroy();
    this.widget = null;
  }

  override render() {
    return <div ref={this.container} />;
  }
}
