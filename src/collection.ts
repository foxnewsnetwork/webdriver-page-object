import component from './component';
import absoluteSelector from './absolute-selector';
import force from './force';
import { append } from './string';
import { DriverAPI, Widget } from './page-object';
import { Client } from 'webdriverio';

class Collection {
  driverAPI: DriverAPI;
  itemScope: string;
  parentWidget: Widget;
  ChildWidgetClass: typeof Widget;

  constructor(
    driverAPI: DriverAPI,
    itemScope: string,
    parentWidget: Widget,
    ChildWidgetClass: typeof Widget
  ) {
    this.driverAPI = driverAPI;
    this.itemScope = itemScope;
    this.parentWidget = parentWidget;
    this.ChildWidgetClass = ChildWidgetClass;
  }

  get browser(): Client<any> {
    return this.driverAPI.browser;
  }
  /**
   * The async iterator allows us to use the `for await`
   * syntax, check out that junk here:
   *
   * https://github.com/tc39/proposal-async-iteration
   */
  async *[Symbol.asyncIterator]() {
    for (let childNo = 0; childNo < Infinity; childNo++) {
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

export default function collection(
  parentWidget: Widget,
  itemScope: string,
  ChildWidgetClass: typeof Widget
): Collection {
  return new Collection(parentWidget.driverAPI, itemScope, parentWidget, ChildWidgetClass);
}
