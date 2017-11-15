import { append } from './string';
import absoluteSelector from './absolute-selector';

export default async function text(widget, selector = '') {
  const { browser } = widget;
  const fullSelector = append(absoluteSelector(widget), selector)

  return await browser.getText(fullSelector);
}
