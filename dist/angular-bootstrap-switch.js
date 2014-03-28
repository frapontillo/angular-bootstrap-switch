/**
 * angular-bootstrap-switch
 * @version v0.2.2 - 2014-03-28
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
      scope: {
        switchActive: '@',
        switchSize: '@',
        switchOn: '@',
        switchOff: '@',
        switchOnLabel: '@',
        switchOffLabel: '@',
        switchLabel: '@',
        switchIcon: '@',
        switchAnimate: '@'
      },
      template: function (tElement) {
        return ('' + tElement.nodeName).toLowerCase() === 'input' ? undefined : '<input>';
      },
      replace: true,
      link: function link(scope, element, attrs, controller) {
        /**
         * Listen to model changes.
         */
        var listenToModel = function () {
          // When the model changes
          controller.$formatters.push(function (newValue) {
            if (newValue !== undefined) {
              $timeout(function () {
                element.bootstrapSwitch('setState', newValue || false, true);
              });
            }
          });
          scope.$watch('switchActive', function (newValue) {
            var active = newValue === true || newValue === 'true' || !newValue;
            element.bootstrapSwitch('setDisabled', !active);
          });
          scope.$watch('switchOnLabel', function (newValue) {
            element.bootstrapSwitch('setOnLabel', newValue || 'Yes');
          });
          scope.$watch('switchOffLabel', function (newValue) {
            element.bootstrapSwitch('setOffLabel', newValue || 'No');
          });
          scope.$watch('switchOn', function (newValue) {
            attrs.dataOn = newValue;
            element.bootstrapSwitch('setOnClass', newValue || '');
          });
          scope.$watch('switchOff', function (newValue) {
            attrs.dataOff = newValue;
            element.bootstrapSwitch('setOffClass', newValue || '');
          });
          scope.$watch('switchAnimate', function (newValue) {
            element.bootstrapSwitch('setAnimated', scope.$eval(newValue || 'true'));
          });
          scope.$watch('switchSize', function (newValue) {
            element.bootstrapSwitch('setSizeClass', scope.getSizeClass(newValue));
          });
          scope.$watch('switchLabel', function (newValue) {
            element.bootstrapSwitch('setTextLabel', newValue);
          });
          scope.$watch('switchIcon', function (newValue) {
            element.bootstrapSwitch('setTextIcon', newValue);
          });
        };
        /**
         * Listen to view changes.
         */
        var listenToView = function () {
          // When the switch is clicked, set its value into the ngModelController's $viewValue
          element.on('switch-change', function (e, data) {
            scope.$apply(function () {
              controller.$setViewValue(data.value);
            });
          });
        };
        /**
         * Return the appropriate size class.
         */
        scope.getSizeClass = function () {
          return attrs.switchSize ? 'switch-' + attrs.switchSize : '';
        };
        // Listen and respond to model changes
        listenToModel();
        // Listen and respond to view changes
        listenToView();
        element.bootstrapSwitch();
        $timeout(function () {
          element.bootstrapSwitch('setState', controller.$modelValue || false, true);
        });
        // On destroy, collect ya garbage
        scope.$on('$destroy', function () {
          element.bootstrapSwitch('destroy');
        });
      }
    };
  }
]);