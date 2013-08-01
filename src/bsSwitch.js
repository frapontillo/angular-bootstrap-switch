'use strict';

angular.module('frapontillo.bootstrap-switch', [])
  .directive('bsSwitch', function ($timeout) {
    return {
      template:
        '<div class="switch" data-on-label="{{switchOnLabel}}" data-off-label="{{switchOffLabel}}" data-on="{{switchOn}}" data-off="{{switchOff}}" ' +
          'data-animated="{{switchAnimate}}" ng-class="switch {{getSizeClass()}}">' +
        '  <input type="{{switchType}}" ng-model="ngModel"/>' +
        '</div>',
      restrict: 'EA',
      replace: true,
      transclude: true,
      scope: {
        ngModel: '=',
        switchActive: '@',
        switchType: '@',
        switchSize: '@',
        switchOn: '@',
        switchOff: '@',
        switchOnLabel: '@',
        switchOffLabel: '@',
        switchAnimate: '@'
      },

      link: function postLink(scope, element, attrs) {
        // Bootstrap the switch
        $timeout(function() {
          if (scope.ngModel === undefined) {
            scope.ngModel = false;
          }
          element.bootstrapSwitch();
        });

        // When the switch is clicked, copy the inner value in the scope
        element.on('switch-change', function (e, data) {
          var value = data.value;
          scope.ngModel = value;
          scope.$apply();
        });

        // Return the appropriate size class
        scope.getSizeClass = function() {
          return attrs.switchSize !== undefined ? 'switch-' + attrs.switchSize : '';
        };

        // Reflect model changes
        scope.$watch('ngModel', function(newValue) {
          element.bootstrapSwitch('setState', newValue);
        });

        // Toggle activation based on the model variable
        scope.$watch('switchActive', function(newValue) {
          element.bootstrapSwitch('setActive', newValue);
        });

        scope.$watch('switchOnLabel', function(newValue) {
          element.bootstrapSwitch('setOnLabel', newValue);
        });

        scope.$watch('switchOffLabel', function(newValue) {
          element.bootstrapSwitch('setOffLabel', newValue);
        });

        scope.$watch('switchOn', function(newValue) {
          element.bootstrapSwitch('setOnClass', newValue);
        });

        scope.$watch('switchOff', function(newValue) {
          element.bootstrapSwitch('setOffClass', newValue);
        });

        scope.$watch('switchAnimate', function(newValue) {
          element.bootstrapSwitch('setAnimated', scope.$eval(newValue));
        });

        scope.$watch('switchSize', function(newValue) {
          element.bootstrapSwitch('setSizeClass', scope.getSizeClass(newValue));
        });

        // Some GC
        scope.$on('$destroy', function() {
          element.bootstrapSwitch('destroy');
        });
      }
    };
  }
);
