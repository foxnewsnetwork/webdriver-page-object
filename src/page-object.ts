import { Client } from 'webdriverio';

export interface DriverAPI {
  browser: Client<any>;
}

export class Widget {
  static get scope(): string {
    return '';
  }

  driverAPI: DriverAPI
  parentScope: string

  constructor(driverAPI: DriverAPI, parentScope: string = '') {
    this.driverAPI = driverAPI;
    this.parentScope = parentScope;
  }

  get scope(): string {
    return this.constructor.scope;
  }

  get browser(): Client<any> {
    return this.driverAPI.browser;
  }
}
