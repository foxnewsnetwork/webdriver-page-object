import absoluteSelector from './absolute-selector';
import { Widget } from './page-object';

export default function component(
  parentWidget: Widget,
  ChildWidgetClass: typeof Widget
): Widget {
  const parentScope = absoluteSelector(parentWidget);

  return new ChildWidgetClass(parentWidget.driverAPI, parentScope);
}
