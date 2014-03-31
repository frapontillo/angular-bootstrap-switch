'use strict';

angular.module('frapontillo.bootstrap-switch')
  .directive('bsSwitch', function ($timeout) {
    return {
      restrict: 'EA',
      require: 'ngModel',
      scope: {
        switchActive: '@',
        switchOnText: '@',    // changed name
        switchOffText: '@',   // changed name
        switchOnColor: '@',   // changed name
        switchOffColor: '@',  // changed name
        switchAnimate: '@',
        switchSize: '@',
        switchLabel: '@',
        switchIcon: '@',      // changed behaviour
        switchWrapper: '@'    // container class modifier
      },
      template: function(tElement) {
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
              // build and set the new span
              var spanClass = '<span class=\'' + newValue + '\'></span>';
              element.bootstrapSwitch('labelText', spanClass);
            }
          });

          scope.$watch('switchWrapper', function(newValue) {
            // Make sure that newValue is not empty, otherwise default to null
            if (!newValue) {
              newValue = null;
            }
            element.bootstrapSwitch('wrapperClass', newValue);
          });
        };

        /**
         * Listen to view changes.
         */
        var listenToView = function () {
          // When the switch is clicked, set its value into the ngModelController's $viewValue
          element.on('switchChange.bootstrapSwitch', function (e, data) {
            scope.$apply(function () {
              controller.$setViewValue(data);
            });
          });
        };

        /**
         * Returns the value if it is truthy, or undefined.
         *
         * @param value The value to check.
         * @returns the original value if it is truthy, {@link undefined} otherwise.
         */
        var getValueOrUndefined = function(value) {
          return (value ? value : undefined);
        };

        // Listen and respond to model changes
        listenToModel();

        // Bootstrap the switch plugin
        element.bootstrapSwitch();

        // Listen and respond to view changes
        listenToView();

        // Delay the setting of the state
        $timeout(function() {
          element.bootstrapSwitch('state', controller.$modelValue || false, true);
        });

        // On destroy, collect ya garbage
        scope.$on('$destroy', function () {
          element.bootstrapSwitch('destroy');
        });

      }
    };
  });
