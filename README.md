angular-bootstrap-switch
========================

[![Bower version][bower-version-image]][bower-url]
[![NPM version][npm-version-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Apache License][license-image]][license-url]

AngularJS directive for the [bootstrap-switch](https://github.com/nostalgiaz/bootstrap-switch) jQuery plugin.

##Usage

###Installation
```shell
$ bower install angular-bootstrap-switch
```

or

```shell
$ npm install angular-bootstrap-switch
```

This will install AngularJS, jQuery, and the original bootstrap-switch.

###Registration

To be able to use the directive, you need to register the `angular-bootstrap-switch` module as a dependency:

```javascript
angular.module('yourModule', ['frapontillo.bootstrap-switch'
    // other dependencies
]);
```

###Directive
The directive can work on both element and attribute levels. The following example contains all of the supported attributes:

```html
<input
    bs-switch
    ng-model="isSelected"
    type="checkbox"
    switch-active="{{ isActive }}"
    switch-readonly="{{ isReadonly }}"
    switch-size="{{ size }}"
    switch-animate="{{ animate }}"
    switch-label="{{ label }}"
    switch-icon="{{ icon }}"
    switch-on-text="{{ onLabel }}"
    switch-off-text="{{ offLabel }}"
    switch-on-color="{{ on }}"
    switch-off-color="{{ off }}"
    switch-radio-off="{{ radioOff }}"
    switch-label-width="{{ labelWidth }}"
    switch-handle-width="{{ handleWidth }}"
    switch-inverse="{{ inverse }}"
    ng-true-value="'yep'"
    ng-false-value="'nope'">
```

Short doc for all of the attributes:

* `ng-model`, the value to bind the switch to
* `type`, has to be one of `checkbox` and `radio`. 
This value is mandatory and must be a string, as it cannot be changed once set (see [this answer on StackOverflow](http://stackoverflow.com/a/15155407/801065)).
If you choose `radio`, be sure to follow the [AngularJS radio specs](https://docs.angularjs.org/api/ng/input/input%5Bradio%5D), 
meaning you have to specify the same `ngModel` and a different `value` or `ng-value` attribute for each radio
* `switch-active`, determines if the switch is enabled or not (changes the inner input's `disabled` attribute)
* `switch-readonly`, determines if the switch is read-only or not (changes the inner input's `readonly` attribute)
* `switch-size`, can be the empty string as default, `mini`, `small`, `large`
* `switch-animate`, determines if the switch animates when toggled
* `switch-on-text`, sets the positive (checked) text
* `switch-off-text`, sets the negative (unchecked) text
* `switch-on-color`, sets the positive (checked) class, can be `primary` (as default), `default`, `info`, `success`, `warning`, `danger`
* `switch-off-color`, sets the negative (unchecked) class, can be `default` (as default), `primary`, `info`, `success`, `warning`, `danger`
* `switch-label`, sets the toggle label
* `switch-icon`, sets the toggle icon (e.g. `icon-save`)
* `switch-wrapper`, sets the main container class, use a falsy value to fall back to the default one
* `switch-radio-off`, allows a radio button to be unchecked by the user (from `true` to `false`)
* `switch-label-width`, sets the width of the middle label
* `switch-handle-width`, sets the width of both handles
* `switch-inverse`, inverts the on/off handles

###Migrating from bootstrap-switch~2

Read the [CHANGELOG](CHANGELOG.md#030-alpha1-2014-02-22) information to learn what's different in `0.3.0`.

###Examples

The `example` folder shows a simple working demo of the switch.

###Compatibility

IE8 requires you to attach the directive to an `<input type="checkbox">` or `<input type="radio">`. Due to some incompatibilities it is not possible to use a custom tag or `div` instead.

##Development

###Test and build

To build the directive yourself you need to have NodeJS. Then do the following:

```shell
$ npm install -g grunt-cli bower karma
$ npm install
$ bower install
$ grunt test-travis
$ grunt build
```

###Contribute

To contribute, please follow the generic [AngularJS Contributing Guidelines](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md), with the only exception to send the PR to the `develop` branch instead of `master`.

##Author

Francesco Pontillo (<mailto:francescopontillo@gmail.com>)

##License

```
   Copyright 2014-2015 Francesco Pontillo

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.

```

[license-image]: http://img.shields.io/badge/license-Apache_2.0-blue.svg?style=flat
[license-url]: LICENSE

[bower-version-image]: http://img.shields.io/bower/v/angular-bootstrap-switch.svg?style=flat
[bower-url]: http://bower.io/search/?q=angular-bootstrap-switch

[npm-url]: https://npmjs.org/package/angular-bootstrap-switch
[npm-version-image]: http://img.shields.io/npm/v/angular-bootstrap-switch.svg?style=flat

[travis-image]: http://img.shields.io/travis/frapontillo/angular-bootstrap-switch/develop.svg?style=flat
[travis-url]: https://travis-ci.org/frapontillo/angular-bootstrap-switch
