import absoluteSelector from './absolute-selector';

export default function component(parentWidget, ChildWidgetClass) {
  const { browser, ds } = parentWidget;
  const parentScope = absoluteSelector(parentWidget);

  return new ChildWidgetClass(browser, ds, parentScope);
}
