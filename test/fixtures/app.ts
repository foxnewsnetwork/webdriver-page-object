import { Widget, ActionsHash } from '../../src/page-object';
import component from '../../src/component';
import { FakeDriver } from './driver-api';

function captureActions(ctx: Widget): ActionsHash {
  const keys = Object.keys(ctx.actions);
  let captured = {};
  for(let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const action = ctx.actions[key];
    captured[key] = action.bind(ctx);
  }
  return captured;
}

class FakeWidget extends Widget {
  driverAPI: FakeDriver;
}

export default class App extends FakeWidget {
  get actions() {
    return {
      async goHome() {
        await this.driverAPI.router.go('home');
        return this.homePage;
      },

      async goProduct() {
        await this.driverAPI.router.go('product');
        return this.productPage;
      }
    }
  }

  get homePage() {
    const { goProduct } = captureActions(this);
    return component(this, class ActionableHomePage extends HomePage {
      get actions() {
        return { clickBanner: goProduct };
      }
    });
  }

  get productPage() {
    const { goHome } = captureActions(this);
    return component(this, class ActionableProductPage extends ProductPage {
      get actions() {
        return { clickBack: goHome };
      }
    });
  }
}

class Banner extends FakeWidget {
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

class Detail extends FakeWidget {
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
class ProductPage extends FakeWidget {
  get scope() {
    return '.product-page';
  }

  get isActive() {
    return this.driverAPI.router.routeName === 'product';
  }

  get detail() {
    const { clickBack } = captureActions(this);

    return component(this, class ActionableDetail extends Detail {
      get actions() {
        return { onClick: clickBack };
      }
    });
  }
}
class HomePage extends FakeWidget {
  get scope() {
    return '.home-page';
  }

  get isActive() {
    return this.driverAPI.router.routeName === 'home';
  }

  get banner() {
    const { clickBanner } = captureActions(this);

    return component(this, class ActionableBanner extends Banner {
      get actions() {
        return { onClick: clickBanner }
      }
    });
  }
}
