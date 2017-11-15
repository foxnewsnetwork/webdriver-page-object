import component from './component';
import absoluteSelector from './absolute-selector';
import force from './force';
import { append } from './string';

class Collection {
  constructor(browser, ds, itemScope, parentWidget, ChildWidgetClass) {
    this.browser = browser;
    this.ds = ds;
    this.itemScope = itemScope;
    this.parentWidget = parentWidget;
    this.ChildWidgetClass = ChildWidgetClass;
  }
  /**
   * The async iterator allows us to use the `for await`
   * syntax, check out that junk here:
   *
   * https://github.com/tc39/proposal-async-iteration
   */
  async *[Symbol.asyncIterator]() {
    for (let childNo = 0; i < Infinity; i++) {
      const child = this.at(childNo);
      const { isExisting } = await force(child);
      if (isExisting) {
        yield child;
      } else {
        return child;
      }
    }
  }
  at(n = 0) {
    const { parentWidget, ChildWidgetClass, itemScope } = this;
    return component(
      parentWidget,
      class extends ChildWidgetClass {
        get scope() {
          return append(super.scope, `${itemScope}:nth-child(${n + 1})`);
        }
      }
    );
  }

  get childrenSelector() {
    const parentSelector = absoluteSelector(this.parentWidget);
    return append(parentSelector, this.itemScope);
  }
  get length() {
    return this.browser.elements(this.childrenSelector).then(({ value: { length } }) => length);
  }
  async count() {
    return await this.length;
  }
}

export default function collection(parentWidget, itemScope, ChildWidgetClass) {
  const { browser, ds } = parentWidget;
  return new Collection(browser, ds, itemScope, parentWidget, ChildWidgetClass);
}
