import absoluteSelector from './absolute-selector';
import { Widget } from './page-object';

interface ForceWidget {
  isExisting: boolean;
  widget: Widget
}

export default async function force(widget: Widget): Promise<ForceWidget> {
  const { browser } = widget.driverAPI;
  const selector = absoluteSelector(widget);

  const isExisting = await browser.isExisting(selector);
  return { isExisting, widget };
}
