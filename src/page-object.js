export class Widget {
  static get scope() {
    return '';
  }

  constructor(browser = global.browser, ds = global.ds, parentScope = '') {
    this.browser = browser;
    this.ds = ds;
    this.parentScope = parentScope;
  }

  get scope() {
    return this.constructor.scope;
  }
}
