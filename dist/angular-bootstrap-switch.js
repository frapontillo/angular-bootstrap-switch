/**
 * angular-bootstrap-switch
 * @version v0.1.0 - 2013-08-12
 * @author Francesco Pontillo (francescopontillo@gmail.com)
 * @link https://github.com/frapontillo/angular-bootstrap-switch
 * @license Apache License 2.0
**/

'use strict';
angular.module('frapontillo.bootstrap-switch', []).directive('bsSwitch', [
  '$timeout',
  function ($timeout) {
    return {
      template: '<div class="switch" data-on-label="{{switchOnLabel}}" data-off-label="{{switchOffLabel}}" ' + 'data-on="{{switchOn}}" data-off="{{switchOff}}" ' + 'data-text-label="{{switchLabel}}" data-icon-label="{{switchIcon}}" ' + 'data-animated="{{switchAnimate}}" ng-class="switch {{getSizeClass()}}">' + '  <input type="{{switchType}}" ng-model="ngModel"/>' + '</div>',
      restrict: 'EA',
      replace: true,
      transclude: true,
      scope: {
        ngModel: '=',
        switchType: '@',
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
      link: function postLink(scope, element, attrs) {
        var setDefaults = function () {
          if (!scope.ngModel) {
            scope.ngModel = false;
          }
          if (!scope.switchType) {
            scope.switchType = 'checkbox';
          }
          if (scope.switchActive === undefined) {
            scope.switchActive = true;
          }
          if (!scope.switchOnLabel) {
            scope.switchOnLabel = 'Yes';
          }
          if (!scope.switchOffLabel) {
            scope.switchOffLabel = 'No';
          }
        };
        var listenToModel = function () {
          scope.$watch('ngModel', function (newValue) {
            element.bootstrapSwitch('setState', newValue || false);
          });
          scope.$watch('switchActive', function (newValue) {
            element.bootstrapSwitch('setActive', newValue || true);
          });
          scope.$watch('switchType', function (newValue) {
            if (!newValue) {
              scope.switchType = 'checkbox';
            }
          });
          scope.$watch('switchOnLabel', function (newValue) {
            element.bootstrapSwitch('setOnLabel', newValue || 'Yes');
          });
          scope.$watch('switchOffLabel', function (newValue) {
            element.bootstrapSwitch('setOffLabel', newValue || 'No');
          });
          scope.$watch('switchOn', function (newValue) {
            element.bootstrapSwitch('setOnClass', newValue || '');
          });
          scope.$watch('switchOff', function (newValue) {
            element.bootstrapSwitch('setOffClass', newValue || '');
          });
          scope.$watch('switchAnimate', function (newValue) {
            element.bootstrapSwitch('setAnimated', scope.$eval(newValue || 'true'));
          });
          scope.$watch('switchSize', function (newValue) {
            element.bootstrapSwitch('setSizeClass', scope.getSizeClass(newValue));
          });
          scope.$watch('switchLabel', function (newValue) {
            element.bootstrapSwitch('setTextLabel', newValue || '');
          });
          scope.$watch('switchIcon', function (newValue) {
            element.bootstrapSwitch('setTextIcon', newValue);
          });
        };
        var listenToView = function () {
          element.on('switch-change', function (e, data) {
            var value = data.value;
            scope.ngModel = value;
            scope.$apply();
          });
        };
        scope.getSizeClass = function () {
          return attrs.switchSize ? 'switch-' + attrs.switchSize : '';
        };
        $timeout(function () {
          setDefaults();
          element.bootstrapSwitch();
          listenToModel();
          listenToView();
        });
        scope.$on('$destroy', function () {
          element.bootstrapSwitch('destroy');
        });
      }
    };
  }
]);