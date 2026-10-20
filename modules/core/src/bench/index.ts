// probe.gl, MIT license

export type {
  BenchProps,
  BenchTestCaseProps,
  LogEntry,
  LogFunction,
  GroupLogEntry,
  TestLogEntry,
  CompleteLogEntry
} from './bench';

export {Bench} from './bench';

export {
  logResultsAsMarkdownTable,
  logResultsAsTree,
  logResultsAsTreeWithElapsed
} from './bench-loggers';
