import { Widget } from './page-object';
import { append } from './string';
import absoluteSelector from './absolute-selector';

export default async function attribute(
  widget: Widget,
  attrName: string,
  selector: string = ''
) {
  const { browser } = widget.driverAPI;
  const fullSelector = append(absoluteSelector(widget), selector);

  return await browser.getAttribute(fullSelector, attrName).then(s => s);
}
