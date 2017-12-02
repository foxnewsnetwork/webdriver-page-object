import { Widget } from '../src/page-object';
import component from '../src/component';
import absoluteSelector from '../src/absolute-selector';
import { waitMS } from '../src/waiters';

class Router {
  constructor() {
    this.routeName = 'home';
  }

  async go(routeName) {
    await waitMS(5)
    return this.routeName = routeName;
  }
}

class App extends Widget {
  get actions() {
    const goHome = ::this.goHome;
    const goProduct = ::this.goProduct;
    return { goHome, goProduct };
  }

  get homePage() {
    const { goProduct } = this.actions;
    return component(this, class extends HomePage {
      get actions() {
        return { clickBanner: goProduct };
      }
    });
  }

  get productPage() {
    const { goHome } = this.actions;
    return component(this, class extends ProductPage {
      get actions() {
        return { clickBack: goHome };
      }
    });
  }

  private async goHome() {
    await this.driverAPI.app.go('home');
    return this.homePage;
  }

  private async goProduct() {
    await this.driverAPI.app.go('product');
    return this.productPage;
  }
}

class Banner extends Widget {
  async click(exit) {
    return exit();
  }

  async availableActions() {
    const { onClick } = this.constructor.actions;

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
    const { onClick } = this.actions;

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
    const { clickBack } = this.actions;

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
    const { clickBanner } = this.actions;

    return component(this, class extends Banner {
      get actions() {
        return { onClick: clickBanner }
      }
    });
  }
}
