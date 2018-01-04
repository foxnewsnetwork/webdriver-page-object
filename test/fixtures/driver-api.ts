import { Client } from 'webdriverio';
import { DriverAPI } from '../../src/page-object';
import { waitMS } from '../../src/waiters';

class Router {
  routeName: string;

  constructor() {
    this.routeName = 'home';
  }

  async go(routeName) {
    await waitMS(5);
    return (this.routeName = routeName);
  }
}

export class FakeDriver implements DriverAPI {
  browser: Client<any>
  router: Router

  constructor() {
    this.router = new Router();
  }
}
