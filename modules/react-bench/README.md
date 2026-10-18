# @probe.gl/react-bench

Deprecated compatibility adapter for the plain DOM `BenchResultsWidget` exported by `probe.gl/bench-widget`.

Existing `<BenchResults log={records} />` usage remains supported. New applications can embed the widget using a container ref and mount/update/unmount lifecycle methods, without installing this package. See the [widget and React integration guide](https://visgl.github.io/probe.gl/docs/modules/react-bench).
