/**
 * angular-bootstrap-switch
 * @version v0.2.0 - 2013-12-16
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
      template: '<div data-on-label="{{switchOnLabel}}" data-off-label="{{switchOffLabel}}" ' + 'data-text-label="{{switchLabel}}" data-icon-label="{{switchIcon}}" ' + 'data-animated="{{switchAnimate}}" ng-class="{{getSizeClass()}}">' + '  <input ng-model="ngModel"/>' + '</div>',
      restrict: 'EA',
      replace: true,
      transclude: true,
      scope: {
        ngModel: '=',
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
      compile: function (element, attrs) {
        if (!attrs.switchType) {
          attrs.switchType = 'checkbox';
        }
        element.find('input').attr('type', attrs.switchType);
        return function link(scope, element, attrs) {
          var listenToModel = function () {
            scope.$watch('ngModel', function (newValue, oldValue) {
              if (newValue !== undefined && newValue !== oldValue) {
                element.bootstrapSwitch('setState', newValue || false);
              }
            });
            scope.$watch('switchActive', function (newValue) {
              var active = newValue === true || newValue === 'true' || !newValue;
              element.bootstrapSwitch('setActive', active);
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
              element.find('label').html(newValue || '&nbsp;');
            });
            scope.$watch('switchIcon', function (newValue) {
              if (newValue) {
                element.find('label').html('<i class="icon ' + newValue + '"></i>');
              } else {
                scope.switchLabel = undefined;
              }
            });
          };
          var listenToView = function () {
            element.on('switch-change', function (e, data) {
              var value = data.value;
              if (value !== scope.ngModel) {
                scope.$apply(function () {
                  scope.ngModel = value;
                });
              }
            });
          };
          scope.getSizeClass = function () {
            return attrs.switchSize ? 'switch-' + attrs.switchSize : '';
          };
          listenToModel();
          listenToView();
          element.bootstrapSwitch();
          $timeout(function () {
            element.bootstrapSwitch('setState', scope.ngModel || false);
          });
          scope.$on('$destroy', function () {
            element.bootstrapSwitch('destroy');
          });
        };
      }
    };
  }
]);