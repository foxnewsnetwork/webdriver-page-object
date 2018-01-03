import { Widget } from '../../src/page-object';
import component from '../../src/component';
import absoluteSelector from '../../src/absolute-selector';
import { waitMS } from '../../src/waiters';
import { ActionsHash } from '../../src/page-action';

class Router {
  routeName: string;

  constructor() {
    this.routeName = 'home';
  }

  async go(routeName) {
    await waitMS(5)
    return this.routeName = routeName;
  }
}

function captureActions(ctx: Widget): ActionsHash {
  let captured = {};
  for(let key in Object.keys(ctx.actions)) {
    const action = ctx.actions[key];
    captured[key] = action.bind(ctx);
  }
  return captured;
}

class App extends Widget {
  get actions() {
    return {
      async goHome() {
        await this.driverAPI.browser.url('home');
        return this.homePage;
      },

      async goProduct() {
        await this.driverAPI.browser.url('product');
        return this.productPage;
      }
    }
  }

  get homePage() {
    const { goProduct } = captureActions(this);
    return component(this, class extends HomePage {
      get actions() {
        return { clickBanner: goProduct };
      }
    });
  }

  get productPage() {
    const { goHome } = captureActions(this);
    return component(this, class extends ProductPage {
      get actions() {
        return { clickBack: goHome };
      }
    });
  }
}

class Banner extends Widget {
  async click(exit) {
    return exit();
  }

  async availableActions() {
    const { onClick } = captureActions(this);

    return {
      clickBanner: () => this.click(onClick)
    };
  }
}

class Detail extends Widget {
  async clickBack(exit) {
    return exit();
  }

  async availableActions() {
    const { onClick } = captureActions(this);

    return {
      clickBack: () => this.clickBack(onClick)
    };
  }
}
class ProductPage extends Widget {
  static get scope() {
    return '.product-page';
  }

  get isActive() {
    return this.driverAPI.router.routeName === 'product';
  }

  get detail() {
    const { clickBack } = captureActions(this);

    return component(this, class extends Detail {
      get actions() {
        return { onClick: clickBack };
      }
    });
  }
}
class HomePage extends Widget {
  static get scope() {
    return '.home-page';
  }

  get isActive() {
    return this.driverAPI.router.routeName === 'home';
  }

  get banner() {
    const { clickBanner } = captureActions(this);

    return component(this, class extends Banner {
      get actions() {
        return { onClick: clickBanner }
      }
    });
  }
}
