import { append } from './string';
import absoluteSelector from './absolute-selector';

const FOCUSED_ATTRIBUTE_NAME = 'data-test-focused';

export default (async function isFocused(widget, selector = '', attrName = FOCUSED_ATTRIBUTE_NAME) {
  const { browser } = widget;
  const fullSelector = append(absoluteSelector(widget), selector);
  const result = await browser.getAttribute(fullSelector, attrName);

  return 'true' === result;
});
