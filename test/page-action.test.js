import { Widget } from '../src/page-object';
import component from '../src/component';
import absoluteSelector from '../src/absolute-selector';

class Page extends Widget {
  static get scope() {
    return '.home-page';
  }

  static get actions() {
    const quitPage = ::this.quitPage;
    return { quitPage };
  }

  private async quitPage() {
    return 'successfully quit';
  }

  get banner() {
    return component(this, class extends Widget {
      async unfocus(exit) {
        return exit();
      }

      async availableActions() {
        const { quitBanner } = this.constructor.actions;

        return [
          () => this.unfocus(quitBanner);
        ];
      }
    });
  }
}
