import { Client } from 'webdriverio';
import { ActionsHash, PageAction } from './page-action';

export interface DriverAPI {
  browser: Client<any>;
}

export interface WidgetAPI {
  scope: string;
  actions: ActionsHash;
  availableActions(): Promise<ActionsHash>;
}

export class Widget implements WidgetAPI {
  driverAPI: DriverAPI;
  parentScope: string;

  constructor(driverAPI: DriverAPI, parentScope: string = '') {
    this.driverAPI = driverAPI;
    this.parentScope = parentScope;
  }

  get scope(): string {
    return '';
  }

  get actions(): ActionsHash {
    return {};
  }

  get browser(): Client<any> {
    return this.driverAPI.browser;
  }

  async availableActions(): Promise<ActionsHash> {
    return this.actions;
  }
}
