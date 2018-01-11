[![Build Status](https://travis-ci.org/foxnewsnetwork/webdriver-page-object.svg?branch=master)](https://travis-ci.org/foxnewsnetwork/webdriver-page-object)

# Webdriver Page Object

[webdriver.io](http://webdriver.io/) friendly page-object framework. Originally built to automate testing for PlayStation apps, but now open-sourced to do whatever.

What are page-objects? [Martin Fowler originally proposed them in 2013](https://martinfowler.com/bliki/PageObject.html) as a way to encapsulate page functionality to make integration tests more coherent and less brittle, and has since taken over as the go-to way to construct test suites.

# Why this library?

If you look at the [webdriver.io's selector guide](http://webdriver.io/guide/usage/selectors.html), they're clearly anticipating that users of their test engine would write selectors within a page-object context... however, they don't provide any guidelines or a framework to help the SDET (or regular developer) to construct a coherent and scalable collection of page-objects that can scale across an entire app.

This library takes inspiration from react and uses the latest es7 syntax to help you build a modern app-object automation project.

# Examples
Checkout the examples directory in this repo for more detailed usage.

For now, consider the following general guide of trying to build an app-object around github

```javascript
class App extends Widget {
  get widgets() {
    return {
      pagehead: this.widget(PageHead),
      codePage: this.widget(CodePage),
      someOtherPage: this.wdiget(OtherPage)
    };
  }
}
```

In react, html, ember, and whatever other framework you might use, your app is always constructed as a tree of widgets (nodes, components, elements, are other common names). Naturally, it makes sense to structure your app in a similar tree in the world of page-objects.

The `this.widget` method on `Widget` instances is a macro over instantiating `widget`s

```javascript
import { isVisible } from 'webdriver-page-object';

class PageHead extends Widget {
  /**
   * `scope` is a relative css selector
   * internally, this value is appended to the
   * parent's cope to create the actual selector
   */
  get scope() {
    return '.page-head';
  }

  get properties() {
    return {
      isVisible: isVisible(this)
    };
  }

  // ... other stuff
}
```
Notice that we put all the readable properties of an `Widget` inside a `properties` getter. In this case, we can access our `isVisible` property by doing something like `await pagehead.properties.isVisible`.

What what is this `isVisible(this)` call? It is an `async function` which interfaces with the browser provided to us via webdriver.io to extract the relevant property from the dom

```javascript
import { absoluteSelector } from 'webdriver-page-object';

async function isVisible(widget, selector = '') {
  const { driverAPI: { browser } } = widget;
  const fullSelector = absoluteSelector(widget, selector);}
  const exists = await browser.isExisting(fullSelector);
  const visible = await browser.isVisible(fullSelector);

  return exists && visible;
}
```

Currently, we ship with the following async property helpers:

- isVisible
- isExisting
- text
- attribute
- click

And will likely include more in the future. But in the meantime, writing your own is easy, just return a promise-like object that will eventually evaluate to your desired property.

But what if we have a collection of widgets like an `ul` or something like:

```html
<nav class='my-navs'>
  <a href='somewhere'>Somewhere</a>
  <a href='somewhere-else'>Elsewhere</a>
</nav>
```

We can use the `collection` helper to declare collection widgets:

```javascript
class PageHead extends Widget {
  get widgets() {
    return {
      navbuttons: this.collection('.my-navs', NavButton, {
        afterClick: () => this
      });
    };
  }
}
```
Then, we can access our nav buttons like so: `pagehead.widgets.navbuttons.at(0)` or `.count()` etc.

Finally, no page object would be complete without being able to declare user interactions:

```javascript
import { click } from 'webdriver-page-object';

class NavButton extends Widget {
  // ... other stuff

  get actions() {
    const { afterClick } = this.attrs;
    return {
      click: () => click(this).then(afterClick)
    };
  }
}
```

By convention, we follow a sort of DDAU with parents passing attributes down to children. Children, in turn, can call action functions given to them from their parents. Typically, we use the bubbling up of actions to return what should be the next active widget. By composing our app-object out of page and widget objects in this way, we have one coherent interface to interface with our entire app

# Q&A

Q: What's the difference between a service like [webdriver.io](http://webdriver.io/) and something like [testem.js](https://github.com/testem/testem)
A: testem is a testing harness for running javascript code in different browser environments. Meanwhile, webdriver.io is an API platform for automating a browser via node.js (or python). What a test harness like testem does is load up a browser via some API (internally, this *may* be via webdriver.io, but the exact implementation is encapsulated from us), serve our desired test suite into the browser, then running that test in the browser environment. Meanwhile, webdriver loads up a browser which, as a part of our test suite, we can control. Furthermore, our tests in webdriver are all run in the node environment

Q: which is better?
A: testing via webdriver is more "black-box" but also affords more user-like control over the actions. Testing via testem (or similar) harness gives a lot more control by affording more access to the JS objects in the browser JS environment that the tests can interact with, but doesn't afford the same level of user-simulation. Typically, developers should write testem.js tests to do their really coarse-grain testing before they get their features accepted, while QA and SDETs should write webdriver tests to ensure the app is sensible at the user level. A truly quality app would have both (lol good luck with that)

# Inspiration and References

- [Fowler's original article](https://martinfowler.com/bliki/PageObject.html)
- [ember-cli-page-objects](http://ember-cli-page-object.js.org/docs/v1.12.x/)
- [webdriver.io](http://webdriver.io/)
- [component and action structure inspired by react](https://reactjs.org/)
