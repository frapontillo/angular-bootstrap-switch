/**
 * angular-bootstrap-switch
 * @version v0.3.0-alpha.1 - 2014-03-30
 * @author Francesco Pontillo (francescopontillo@gmail.com)
 * @link https://github.com/frapontillo/angular-bootstrap-switch
 * @license Apache License 2.0
**/

'use strict';
// Source: common/module.js
angular.module('frapontillo.bootstrap-switch', []);
// Source: dist/.temp/directives/bsSwitch.js
angular.module('frapontillo.bootstrap-switch').directive('bsSwitch', [
  '$timeout',
  function ($timeout) {
    return {
      restrict: 'EA',
      require: 'ngModel',
      template: '<input>',
      replace: true,
      scope: {
        switchActive: '@',
        switchOnText: '@',
        switchOffText: '@',
        switchOnColor: '@',
        switchOffColor: '@',
        switchAnimate: '@',
        switchSize: '@',
        switchLabel: '@',
        switchIcon: '@',
        switchWrapper: '@'
      },
      link: function link(scope, element, attrs, controller) {
        var listenToModel = function () {
          controller.$formatters.push(function (newValue) {
            if (newValue !== undefined) {
              $timeout(function () {
                element.bootstrapSwitch('state', newValue || false, true);
              });
            }
          });
          scope.$watch('switchActive', function (newValue) {
            var active = newValue === true || newValue === 'true' || !newValue;
            element.bootstrapSwitch('disabled', !active);
          });
          scope.$watch('switchOnText', function (newValue) {
            element.bootstrapSwitch('onText', getValueOrUndefined(newValue));
          });
          scope.$watch('switchOffText', function (newValue) {
            element.bootstrapSwitch('offText', getValueOrUndefined(newValue));
          });
          scope.$watch('switchOnColor', function (newValue) {
            attrs.dataOn = newValue;
            element.bootstrapSwitch('onColor', getValueOrUndefined(newValue));
          });
          scope.$watch('switchOffColor', function (newValue) {
            attrs.dataOff = newValue;
            element.bootstrapSwitch('offColor', getValueOrUndefined(newValue));
          });
          scope.$watch('switchAnimate', function (newValue) {
            element.bootstrapSwitch('animate', scope.$eval(newValue || 'true'));
          });
          scope.$watch('switchSize', function (newValue) {
            element.bootstrapSwitch('size', newValue);
          });
          scope.$watch('switchLabel', function (newValue) {
            element.bootstrapSwitch('labelText', newValue ? newValue : '&nbsp;');
          });
          scope.$watch('switchIcon', function (newValue) {
            if (newValue) {
              var spanClass = '<span class=\'' + newValue + '\'></span>';
              element.bootstrapSwitch('labelText', spanClass);
            }
          });
          scope.$watch('switchWrapper', function (newValue) {
            if (!newValue) {
              newValue = null;
            }
            element.bootstrapSwitch('wrapperClass', newValue);
          });
        };
        var listenToView = function () {
          element.on('switchChange.bootstrapSwitch', function (e, data) {
            scope.$apply(function () {
              controller.$setViewValue(data);
            });
          });
        };
        var getValueOrUndefined = function (value) {
          return value ? value : undefined;
        };
        listenToModel();
        element.bootstrapSwitch();
        listenToView();
        $timeout(function () {
          element.bootstrapSwitch('state', controller.$modelValue || false, true);
        });
        scope.$on('$destroy', function () {
          element.bootstrapSwitch('destroy');
        });
      }
    };
  }
]);