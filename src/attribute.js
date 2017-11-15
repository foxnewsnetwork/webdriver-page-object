import { append } from './string';
import absoluteSelector from './absolute-selector';

export default async function attribute(widget, attrName, selector = '') {
  const { browser } = widget;
  const fullSelector = append(absoluteSelector(widget), selector);
  return await browser.getAttribute(fullSelector, attrName);
}
