# StatsWidget

A DOM widget that displays counters and timings from a probe.gl `Stats` object.

## Usage

Create a `StatsWidget` HTML element to display tracked `Stats`. Each `Stat` can
be associated with a `formatter` that indicates how it should be displayed.

```js
import {Stats} from '@probe.gl/stats';
import StatsWidget from '@probe.gl/stats-widget';

const stats = new Stats({id: 'My stats'});
const frames = stats.get('Frames');
const widget = new StatsWidget(stats, {container: document.body});

frames.incrementCount();
widget.update();

// When the view is disposed:
widget.remove();
```

Create the widget in a browser after its container exists. Call `update()` from your application's render loop or interval; the widget does not schedule updates itself.

## Methods

### constructor

`new StatsWidget(stats, options)`

* `stats` (`Stats`) - a probe.gl `Stats` instance.
* `options`: (`Object`)
  - `title` (`String`) - header text for the widget. Defaults to the `id` of the `Stats` object.
  - `framesPerUpdate` (`Number`) - update cadence in calls (default `1`). The first call renders immediately. Allows the application
   to call `update` each frame with re-renders occurring at a slower rate.
  - `container` (DOMElement) - DOM element to use as container for the widget. Defaults to `document.body`; the widget appends its own child element.
  - `css` (`Object`) - css properties to apply to the container `div` of the widget. Two special keys can be used to modify the
   style of nested elements:
    + `header` (`Object`) - css properties to apply to the header `div` of the widget.
    + `item` (`Object`) - css properties to apply to the individual item `div`s for each stat displayed in the widget.
  - `formatters` (`Object`) - text formatters to use to display a stat. Keys are the stat's `name`. Value can either be
   a function that takes a single `stat` object as argument, or one of the following strings:
    + `count`: Display as a simple count.
    + `averageTime`: Display average time.
    + `totalTime`: Display total time.
    + `fps`: Display Hz as a frame rate.
    + `memory`: Display count as a memory measurement.
  - `resetOnUpdate` (`Object`) - whether a stat should be reset each time the widget is re-rendered. Keyed by the stat's `name`.

### setStats

Set Stats object rendered by the widget.

Parameters:

* `stats` (`Stats`) - [`Stats`](/docs/modules/stats) object.


### update

`statsWidget.update()`

Refresh displayed values, subject to `framesPerUpdate` (default `1`). Stats configured with `resetOnUpdate` are reset after their values are displayed.

### setCollapsed

`statsWidget.setCollapsed(true)`

Show or hide the stat rows. The header also toggles this state when clicked.

### remove

`statsWidget.remove()`

Remove the widget from its container. It cannot be reused after removal. Stop any application interval or render-loop callback that updates it.
