'use strict';

angular.module('frapontillo.bootstrap-switch')
  .directive('bsSwitch', function ($parse, $timeout) {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function link(scope, element, attrs, controller) {
        var isInit = false;

        /**
         * Return the true value for this specific checkbox.
         * @returns {Object} representing the true view value; if undefined, returns true.
         */
        var getTrueValue = function() {
          var trueValue = $parse(attrs.ngTrueValue)(scope);
          if (!angular.isString(trueValue)) {
            trueValue = true;
          }
          return trueValue;
        };

        /*
        var getModelValueFor = function(viewValue) {
          var value;
          if (viewValue === true) {
            value = attrs.ngTrueValue;
          } else if (viewValue === false) {
            value = attrs.ngFalseValue;
          }
          return $parse(value)(scope);
        };
        */

        /**
         * If the directive has not been initialized yet, do so.
         */
        var initMaybe = function() {
          // if it's the first initialization
          if (!isInit) {
            var viewValue = (controller.$modelValue === getTrueValue());
            isInit = !isInit;
            // Bootstrap the switch plugin
            element.bootstrapSwitch({
              state: viewValue
            });
            controller.$setViewValue(viewValue);
          }
        };

        var setActive = function(active) {
          element.bootstrapSwitch('disabled', !active);
        };

        /**
         * Listen to model changes.
         */
        var listenToModel = function () {

          attrs.$observe('switchRadioOff', function (newValue) {
            element.bootstrapSwitch('radioAllOff', (newValue === true || newValue === 'true'));
          });

          attrs.$observe('switchActive', function (newValue) {
            var active = newValue === true || newValue === 'true' || !newValue;
            // if we are disabling the switch, delay the deactivation so that the toggle can be switched
            if (!active) {
              $timeout(function() {
                setActive(active);
              });
            } else {
              // if we are enabling the switch, set active right away
              setActive(active);
            }
          });

          // When the model changes
          scope.$watch(attrs.ngModel, function(newValue) {
            initMaybe();
            if (newValue !== undefined) {
              element.bootstrapSwitch('state', newValue === getTrueValue(), true);
            }
          }, true);

          attrs.$observe('switchOnText', function (newValue) {
            element.bootstrapSwitch('onText', getValueOrUndefined(newValue));
          });

          attrs.$observe('switchOffText', function (newValue) {
            element.bootstrapSwitch('offText', getValueOrUndefined(newValue));
          });

          attrs.$observe('switchOnColor', function (newValue) {
            attrs.dataOn = newValue;
            element.bootstrapSwitch('onColor', getValueOrUndefined(newValue));
          });

          attrs.$observe('switchOffColor', function (newValue) {
            attrs.dataOff = newValue;
            element.bootstrapSwitch('offColor', getValueOrUndefined(newValue));
          });

          attrs.$observe('switchAnimate', function (newValue) {
            element.bootstrapSwitch('animate', scope.$eval(newValue || 'true'));
          });

          attrs.$observe('switchSize', function (newValue) {
            element.bootstrapSwitch('size', newValue);
          });

          attrs.$observe('switchLabel', function (newValue) {
            element.bootstrapSwitch('labelText', newValue ? newValue : '&nbsp;');
          });

          attrs.$observe('switchIcon', function (newValue) {
            if (newValue) {
              // build and set the new span
              var spanClass = '<span class=\'' + newValue + '\'></span>';
              element.bootstrapSwitch('labelText', spanClass);
            }
          });

          attrs.$observe('switchWrapper', function (newValue) {
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
          // When the switch is clicked, set its value into the ngModel
          element.on('switchChange.bootstrapSwitch', function (e, data) {
            // $setViewValue --> $viewValue --> $parsers --> $modelValue
            controller.$setViewValue(data);
          });
        };

        /**
         * Returns the value if it is truthy, or undefined.
         *
         * @param value The value to check.
         * @returns the original value if it is truthy, {@link undefined} otherwise.
         */
        var getValueOrUndefined = function (value) {
          return (value ? value : undefined);
        };

        // Listen and respond to view changes
        listenToView();

        // Listen and respond to model changes
        listenToModel();

        // On destroy, collect ya garbage
        scope.$on('$destroy', function () {
          element.bootstrapSwitch('destroy');
        });
      }
    };
  })
  .directive('bsSwitch', function () {
    return {
      restrict: 'E',
      require: 'ngModel',
      template: '<input bs-switch>',
      replace: true
    };
  });
