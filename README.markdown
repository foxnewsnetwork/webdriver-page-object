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

# Inspiration and References

- [Fowler's original article](https://martinfowler.com/bliki/PageObject.html)
- [ember-cli-page-objects](http://ember-cli-page-object.js.org/docs/v1.12.x/)
- [webdriver.io](http://webdriver.io/)
- [component and action structure inspired by react](https://reactjs.org/)