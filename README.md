
angular-bootstrap-switch [![Build Status](https://travis-ci.org/frapontillo/angular-bootstrap-switch.png)](https://travis-ci.org/frapontillo/angular-bootstrap-switch)
========================

AngularJS directive for the [bootstrap-switch](https://github.com/nostalgiaz/bootstrap-switch) jQuery plugin.

##Usage

###Installation
```shell
bower install angular-bootstrap-switch
```

This will install AngularJS, jQuery, and the original bootstrap-switch.

###Directive
The directive can work on both element and attribute levels. The following example contains all of the supported attributes:

```html
<input bs-switch ng-model="isSelected" 
	switch-type="{{type}}" switch-active="{{active}}"
	switch-size="{{size}}" switch-animate="{{animate}}"
	switch-label={{text}} switch-icon="{{icon}}"
	switch-on-label="{{onLabel}}" switch-off-label="{{offLabel}}"
	switch-on="{{on}}" switch-off="{{off}}">
```

Short doc for all of the attributes:

* `ng-model`, the value to bind the switch to
* `switch-type`, can be `chechbox` (default) or `radio`
* `switch-active`, determines if the switch is enabled or not
* `switch-size`, can be the empty string as default, `mini`, `small`, `large`
* `switch-animate`, determines if the switch animates when toggled
* `switch-label`, sets the toggle label
* `switch-icon`, sets the toggle icon (e.g. `icon-save`)
* `switch-on-label`, sets the positive (checked) text
* `switch-off-label`, sets the negative (unchecked) text
* `switch-on`, sets the positive (checked) class, can be `primary` (as default), `default`, `info`, `success`, `warning`, `danger`
* `switch-off`, sets the positive (checked) class, can be `default` (as default), `primary`, `info`, `success`, `warning`, `danger`
* `change-event`, sets a scope function to be called once the value of the model has changed (useful when you cannot use watches)

###Examples
TODO

## Building

To build the directive yourself you need to have NodeJS. Then do the following:

```shell
$ npm install -g grunt-cli bower karma
$ npm install
$ bower install
$ grunt test
$ grunt build
```

##Author

Francesco Pontillo (<mailto:francescopontillo@gmail.com>)

##License

```
   Copyright 2013 Francesco Pontillo

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