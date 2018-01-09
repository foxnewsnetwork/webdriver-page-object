import { Widget } from './page-object';
import { append } from './string';
import absoluteSelector from './absolute-selector';

export default async function click(widget: Widget, selector: string = '') {
  const { browser } = widget.driverAPI;
  const fullSelector = append(absoluteSelector(widget), selector);

  return await browser.click(fullSelector);
}
