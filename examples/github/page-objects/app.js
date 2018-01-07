'use strict';

const { Widget } = require('../../../dist/index');

class App extends Widget {
  get widgets() {
    return {
      pagehead: this.component(PageHead),
      filewrap: this.component(FileWrap)
    };
  }
}

class PageHead extends Widget {
  get properties() {
    return {
      isVisible: this.property(isVisible, '.repohead.pagehead')
    };
  }
  async availableActions() {

  }
}

class FileWrap extends Widget {

}