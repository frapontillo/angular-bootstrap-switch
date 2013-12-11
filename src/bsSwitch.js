'use strict';

angular.module('frapontillo.bootstrap-switch', [])
  .directive('bsSwitch', function ($timeout) {
    return {
      template:
        '<div class="make-switch" data-on-label="{{switchOnLabel}}" data-off-label="{{switchOffLabel}}" ' +
          'data-text-label="{{switchLabel}}" data-icon-label="{{switchIcon}}" ' +
          'data-animated="{{switchAnimate}}" ng-class="switch {{getSizeClass()}}">' +
        '  <input type="{{switchType}}" ng-model="ngModel"/>' +
        '</div>',
      restrict: 'EA',
      replace: true,
      transclude: true,
      scope: {
        ngModel: '=',
        changeEvent: '&',
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

        var setDefaults = function() {
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

        var listenToModel = function() {
          scope.$watch('ngModel', function(newValue) {
            if (newValue !== undefined) {
              element.bootstrapSwitch('setState', newValue || false);
            }
          });

          scope.$watch('switchActive', function(newValue) {
            element.bootstrapSwitch('setActive', newValue || true);
          });

          scope.$watch('switchType', function(newValue) {
            if (!newValue) {
              scope.switchType = 'checkbox';
            }
          });

          scope.$watch('switchOnLabel', function(newValue) {
            element.bootstrapSwitch('setOnLabel', newValue || 'Yes');
          });

          scope.$watch('switchOffLabel', function(newValue) {
            element.bootstrapSwitch('setOffLabel', newValue || 'No');
          });

          scope.$watch('switchOn', function(newValue) {
            attrs.dataOn = newValue;
            element.bootstrapSwitch('setOnClass', newValue || '');
          });

          scope.$watch('switchOff', function(newValue) {
            attrs.dataOff = newValue;
            element.bootstrapSwitch('setOffClass', newValue || '');
          });

          scope.$watch('switchAnimate', function(newValue) {
            element.bootstrapSwitch('setAnimated', scope.$eval(newValue || 'true'));
          });

          scope.$watch('switchSize', function(newValue) {
            element.bootstrapSwitch('setSizeClass', scope.getSizeClass(newValue));
          });

          scope.$watch('switchLabel', function(newValue) {
            element.bootstrapSwitch('setTextLabel', newValue || '');
          });

          scope.$watch('switchIcon', function(newValue) {
            element.bootstrapSwitch('setTextIcon', newValue);
          });
        };

        var listenToView = function() {
          // When the switch is clicked, copy the inner value in the scope
          element.on('switch-change', function (e, data) {
            var value = data.value;
            if (value !== scope.ngModel) {
              scope.$apply(function() {
                scope.ngModel = value;
                //Call the change event function
                scope.changeEvent(value);
              });
            }
          });
        };

        // Return the appropriate size class
        scope.getSizeClass = function() {
          return attrs.switchSize ? 'switch-' + attrs.switchSize : '';
        };

        // Collect ya garbage
        scope.$on('$destroy', function() {
          element.bootstrapSwitch('destroy');
        });
        
        // Do stuff as soon as possible
        $timeout(function() {
            // Sets the defaults
          setDefaults();

          // Init the switch
          element.bootstrapSwitch();

          // Listen and respond to view changes
          listenToView();

          // Listen and respond to model changes
          listenToModel();
        });
      }
    };
  });
