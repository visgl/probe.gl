// probe.gl, MIT license
import type {LogEntry} from './bench';

/** The widget accepts benchmark log entries directly, including completion records. */
export type BenchResult = LogEntry;

export type BenchResultsWidgetProps = {
  container: HTMLElement;
  records?: readonly BenchResult[];
};

/** A framework-independent benchmark table. Only construction accesses the DOM. */
export class BenchResultsWidget {
  readonly element: HTMLDivElement;
  private records: readonly BenchResult[];
  private destroyed = false;

  constructor({container, records = []}: BenchResultsWidgetProps) {
    this.element = container.ownerDocument.createElement('div');
    this.element.className = 'probe-bench-results';
    this.element.style.cssText =
      'font:inherit;color:var(--probe-bench-color,inherit);overflow-x:auto';
    this.records = records;
    container.appendChild(this.element);
    this.render();
  }

  setProps(props: Partial<Pick<BenchResultsWidgetProps, 'records'>>): void {
    if (this.destroyed) {
      return;
    }
    if (props.records !== undefined) {
      this.records = props.records;
    }
    this.render();
  }

  /** Removes only this widget's DOM. Safe to call more than once. */
  destroy(): void {
    this.destroyed = true;
    this.records = [];
    this.element.remove();
  }

  private render(): void {
    const doc = this.element.ownerDocument;
    const table = doc.createElement('table');
    table.style.cssText = 'width:100%;border-collapse:collapse;text-align:left';
    const caption = table.createCaption();
    caption.textContent = 'Benchmark results';
    const header = table.createTHead().insertRow();
    for (const label of ['Id', 'Throughput', 'Score']) {
      const cell = doc.createElement('th');
      cell.scope = 'col';
      cell.textContent = label;
      cell.style.padding = '6px 10px';
      header.appendChild(cell);
    }
    const body = table.createTBody();
    for (const record of this.records.filter((entry) => entry.type !== 'complete')) {
      const row = body.insertRow();
      const label = doc.createElement('th');
      label.scope = 'row';
      label.textContent = record.id;
      label.style.padding = '6px 10px';
      row.appendChild(label);
      if (record.type === 'group') {
        label.colSpan = 3;
        row.style.background = 'var(--probe-bench-group-background,#eee)';
      } else {
        const value = row.insertCell();
        value.textContent = `${record.itersPerSecond} ${record.unit || 'iterations'}/s`;
        value.style.padding = '6px 10px';
        value.title = `±${(record.error * 100).toFixed(2)}%`;
        const score = row.insertCell();
        score.style.cssText = 'width:35%;padding:6px 10px';
        const track = doc.createElement('div');
        track.setAttribute('aria-hidden', 'true');
        track.style.cssText = 'background:var(--probe-bench-track,#dadada);border-radius:2px';
        const bar = doc.createElement('div');
        const throughput = record.iterationsPerSecond;
        const valid = Number.isFinite(throughput) && throughput > 0;
        const percent = valid
          ? Math.min(Math.max(((Math.log10(throughput) - 5) * 100) / 3, 5), 100)
          : 0;
        const color =
          throughput < 1e6
            ? 'var(--probe-bench-low,#ff2e00)'
            : throughput < 1e7
              ? 'var(--probe-bench-medium,#ffbf00)'
              : 'var(--probe-bench-high,#85cc00)';
        bar.style.cssText = `width:${percent}%;min-height:20px;background:${color};border-radius:2px;transition:width .2s ease-out`;
        // Bound decoration even for very large throughputs.
        bar.textContent = valid ? '★'.repeat(Math.min(Math.floor(throughput / 5e7), 5)) : '';
        track.appendChild(bar);
        score.appendChild(track);
      }
    }
    const legend = doc.createElement('p');
    legend.textContent =
      'Throughput bands: < 1M (red), 1M–10M (orange), ≥ 10M (green). ★ = 50M (up to 5 stars).';
    this.element.replaceChildren(table, legend);
  }
}
