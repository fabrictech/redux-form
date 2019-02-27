
# @fabrictech/redux-form
We have forked this dependency as part of our React 16 upgrade. Originally, we attempted to just upgrade to the latest 6.x minor (`6.8.0`, at time of writing), but this was unsuccesful. The minimum version that supports React 16 is `6.6.3`, but we weren't able to get to that either.

The following breaking changes (made in patch versions) are preventing us from upgrading. Note that there could well be more - there are a lot of versions between `6.0.2` and `6.6.3`.

### `6.1.0` -> `6.1.1`: Numeric Validation Broken
The release notes say
> Fixed bug that did not allow decimal points to be entered. #1946 There is a slight chance that this could break an implementation that was assuming data to be a Number. If you absolutely want your value to be stored as a Number, you will need to use the parse and format lifecycle hooks.

This breaks inputs like the premium height input. We were able to work around it by modifying our `parse` hook, but rolling it out would require QAing all numeric inputs, as this could conflict with or otherwise brick our masking.

### `6.2.0` -> `6.2.1`: Formgenie placeholder labels stop showing up.
Didn't find an exact cause.

## Changes in Fork
* migrated from `React.propTypes` to `prop-types` (this was compared against the changes made to `redux-form` in `6.6.3`).
* peer dependencies updated to allow React 16
* dependencies pinned to the versions we had in Cashmere's `yarn.lock`.
* added a `yarn.lock` (mostly by accident)

# redux-form
---
[<img src="http://npm.packagequality.com/badge/redux-form.png" align="right"/>](http://packagequality.com/#?package=redux-form)

[![NPM Version](https://img.shields.io/npm/v/redux-form.svg?style=flat)](https://www.npmjs.com/package/redux-form)
[![NPM Downloads](https://img.shields.io/npm/dm/redux-form.svg?style=flat)](https://www.npmjs.com/package/redux-form)
[![Build Status](https://img.shields.io/travis/erikras/redux-form/v6.svg?style=flat)](https://travis-ci.org/erikras/redux-form)
[![codecov.io](https://codecov.io/gh/erikras/redux-form/branch/master/graph/badge.svg)](https://codecov.io/gh/erikras/redux-form)
[![PayPal donate button](http://img.shields.io/paypal/donate.png?color=yellowgreen)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=3QQPTMLGV6GU2)
[![Twitter URL](https://img.shields.io/twitter/url/https/github.com/erikras/redux-form.svg?style=social)](https://twitter.com/intent/tweet?text=With%20@ReduxForm,%20I%20can%20keep%20all%20my%20form%20state%20in%20Redux!%20Thanks,%20@erikras!)
[![Patreon](https://img.shields.io/badge/patreon-support%20the%20author-blue.svg)](https://www.patreon.com/erikras)

`redux-form` works with [React Redux](https://github.com/rackt/react-redux) to enable an html form in
[React](https://github.com/facebook/react) to use [Redux](https://github.com/rackt/redux) to store all of its state.

[<img src="logo.png" align="right" class="logo" height="151" width="250"/>](http://erikras.github.io/redux-form/)

## Installation
```npm install --save redux-form```

## Documentation

* [Getting Started](http://redux-form.com/6.0.2/docs/GettingStarted.md/)
* [Examples](http://redux-form.com/6.0.2/examples/)
* [API](http://redux-form.com/6.0.2/docs/api/)
* [FAQ](http://redux-form.com/6.0.2/docs/faq/)
* [Release Notes](https://github.com/erikras/redux-form/releases)
* [Older Documentation](http://redux-form.com/6.0.2/docs/DocumentationVersions.md/)

## Videos

- [Abstracting Form State with Redux Form at JS Channel - Bengaluru 2016](https://youtu.be/eDTi7lYR1VU)
[![Abstracting Form State with Redux Form at JS Channel - Bengaluru 2016](docs/video-thumb.jpg)](https://youtu.be/eDTi7lYR1VU)
