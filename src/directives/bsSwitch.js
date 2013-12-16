'use strict';

angular.module('frapontillo.bootstrap-switch')
  .directive('bsSwitch', function ($timeout) {
    return {
      template:
        '<div data-on-label="{{switchOnLabel}}" data-off-label="{{switchOffLabel}}" ' +
          'data-text-label="{{switchLabel}}" data-icon-label="{{switchIcon}}" ' +
          'data-animated="{{switchAnimate}}" ng-class="{{getSizeClass()}}">' +
        '  <input ng-model="ngModel"/>' +
        '</div>',
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
      compile: function(element, attrs) {
        if (!attrs.switchType) {
          attrs.switchType = 'checkbox';
        }
        element.find('input').attr('type', attrs.switchType);

        return function link(scope, element, attrs) {

          /**
           * Listen to model changes.
           */
          var listenToModel = function() {
            scope.$watch('ngModel', function(newValue, oldValue) {
              if (newValue !== undefined && newValue !== oldValue) {
                element.bootstrapSwitch('setState', newValue || false);
              }
            });

            scope.$watch('switchActive', function(newValue) {
              var active = newValue === true || newValue === 'true' || !newValue;
              element.bootstrapSwitch('setActive', active);
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
              element.find('label').html(newValue || '&nbsp;');
            });

            scope.$watch('switchIcon', function(newValue) {
              if (newValue) {
                element.find('label').html('<i class="icon '+ newValue +'"></i>');
              } else {
                scope.switchLabel = undefined;
              }
            });
          };

          /**
           * Listen to view changes.
           */
          var listenToView = function() {
            // When the switch is clicked, copy the inner value in the scope
            element.on('switch-change', function (e, data) {
              var value = data.value;
              if (value !== scope.ngModel) {
                scope.$apply(function() {
                  scope.ngModel = value;
                });
              }
            });
          };

          /**
           * Return the appropriate size class.
           */
          scope.getSizeClass = function() {
            return attrs.switchSize ? 'switch-' + attrs.switchSize : '';
          };

          // Listen and respond to model changes
          listenToModel();

          // Listen and respond to view changes
          listenToView();

          element.bootstrapSwitch();
          // Set the initial state
          $timeout(function() {
            element.bootstrapSwitch('setState', scope.ngModel || false);
          });

          // On destroy, collect ya garbage
          scope.$on('$destroy', function() {
            element.bootstrapSwitch('destroy');
          });
        };
      }
    };
  });
