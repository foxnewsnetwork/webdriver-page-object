import { Widget, text, click, isExisting, isVisible, click } from 'webdriver-page-object';

export default class App extends Widget {
  get widgets() {
    return {
      pagehead: this.widget(PageHead, {
        goCode: 3,
        goIssues: 4
      }),
      codePage: this.widget(CodePage),
      issuesPage: this.widget(IssuesPage)
    };
  }
}

class PageHead extends Widget {
  get scope() {
    return '.pagehead.repohead';
  }
  get widgets() {
    return {
      codeButton: this.navbuttons.at(0),
      issuesButton: this.navbuttons.at(1),
      prButton: this.navbuttons.at(2)
    };
  }
  get properties() {
    return {
      isVisible: isVisible(this)
    };
  }

  get navbuttons() {
    return this.collection('nav.reponav', PageHeadButton);
  }
}

class PageHeadButton extends Widget {
  get scope() {
    return '.reponav-item';
  }

  get properties() {
    return {
      label: text(this, '[itemprop=name]'),
      isVisible: isVisible(this)
    };
  }

  get actions() {
    return {
      click: click(this)
    };
  }
}

class CodePage extends Widget {
  get properties() {
    return {
      isLoaded: isExisting(this, '.file-wrap')
    };
  }
}
class IssuesPage extends Widget {
  get properties() {
    return {
      isLoaded: isExisting(this, '.issues-listing')
    };
  }
}
