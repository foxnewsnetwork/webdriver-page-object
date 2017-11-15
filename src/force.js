import absoluteSelector from './absolute-selector';

export default async function force(widget) {
  const { browser } = widget;
  const selector = absoluteSelector(widget);

  const isExisting = await browser.isExisting(selector);
  return { isExisting, widget };
}
