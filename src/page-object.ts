import { Client } from 'webdriverio';
import { mapVal } from './utils';
import component from './component';
import { default as collection, Collection } from './collection';

export interface DriverAPI {
  browser: Client<any>;
}

export interface WidgetAPI {
  scope: string;
  properties: PropertiesHash;
  widgets: WidgetsHash;
  actions: ActionsHash;
  availableActions(): Promise<ActionsHash>;
}

export interface WidgetsHash {
  [key: string]: Widget
}

export interface PageAction<T> {
  (bubbleFn: () => T): Promise<T>;
}

export interface ActionsHash {
  [key: string]: PageAction<any>;
}

export interface PropertyFn<T> {
  (): Promise<T>;
}

export interface PropertiesHash {
  [key: string]: PropertyFn<any>;
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

  get properties(): PropertiesHash {
    return {};
  }

  get widgets(): WidgetsHash {
    return {};
  }

  get browser(): Client<any> {
    return this.driverAPI.browser;
  }

  async availableActions(): Promise<ActionsHash> {
    return this.actions;
  }

  widget(WidgetClass: typeof Widget): Widget {
    return component(this, WidgetClass);
  }

  collection(itemScope: string, ChildWidgetClass: typeof Widget): Collection {
    return collection(this, itemScope, ChildWidgetClass);
  }
}
