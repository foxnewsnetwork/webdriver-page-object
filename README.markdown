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