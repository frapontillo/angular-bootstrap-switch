'use strict';

describe('Directive: bsSwitch', function () {
  var scope, $sandbox, $compile, $timeout;

  beforeEach(module('frapontillo.bootstrap-switch'));

  /* jshint camelcase: false */
  beforeEach(inject(function ($injector, $rootScope, _$compile_, _$timeout_) {
    scope = $rootScope;
    $compile = _$compile_;
    $timeout = _$timeout_;
    $sandbox = angular.element('<div id="sandbox"></div>').appendTo(angular.element.find('body'));
  }));
  /* jshint camelcase: true */

  afterEach(function() {
    $sandbox.remove();
    scope.$destroy();
  });

  var templates = {
    'default': {
      scope: {model:true},
      element: 'ng-model="model" type="checkbox"'
    },
    'multipleRadios': {
      scope: {model:''},
      element: [
        'ng-model="model" name="radio" type="radio" value="uno"',
        'ng-model="model" name="radio" type="radio" value="dos"',
        'ng-model="model" name="radio" type="radio" value="tres"'
      ]
    },
    'radio': {
      scope: {model:true},
      element: 'ng-model="model" name="radio" type="radio"'
    },
    'radioOff': {
      scope: {model:true, radioOff:false},
      element: 'ng-model="model" name="radio" type="radio" switch-radio-off="{{ radioOff }}"'
    },
    'active': {
      scope: {model:true, isActive:true},
      element: 'ng-model="model" type="checkbox" switch-active="{{ isActive }}"'
    },
    'unactivated': {
      scope: {model:true, isActive:false},
      element: 'ng-model="model" type="checkbox" switch-active="{{ isActive }}"'
    },
    'readonly': {
      scope: {model:true},
      element: 'ng-model="model" type="checkbox" switch-readonly="{{ isReadonly }}"'
    },
    'size': {
      scope: {model:true, size:'large'},
      element: 'ng-model="model" type="checkbox" switch-size="{{ size }}" switch-label-width="{{ labelWidth }}" switch-handle-width="{{ handleWidth }}"'
    },
    'color': {
      scope: {model:true, on:'info', off:'warning'},
      element: 'ng-model="model" type="checkbox" switch-on-color="{{ on }}" switch-off-color="{{ off }}"'
    },
    'label': {
      scope: {model:true},
      element: 'ng-model="model" type="checkbox" switch-on-text="{{ on }}" switch-off-text="{{ off }}" switch-label="{{ label }}"'
    },
    'icon': {
      scope: {model:true, icon:'icon-youtube'},
      element: 'ng-model="model" type="checkbox" switch-icon="{{ icon }}"'
    },
    'animation': {
      scope: {model:true},
      element: 'ng-model="model" type="checkbox" switch-animate="{{ animate }}"'
    },
    'modifier': {
      scope: {model:true},
      element: 'ng-model="model" type="checkbox" switch-wrapper="{{ modifier }}"'
    },
    'customValues': {
      scope: {model:'something'},
      element: 'ng-model="model" type="checkbox" ng-true-value="\'yep\'" ng-false-value="\'nope\'"'
    },
    'customObjectsValues': {
      scope: {model:1},
      element: 'ng-model="model" type="checkbox" ng-true-value="{{ 0 | json }}" ng-false-value="{{ 1 | json }}"'
    },
    'inverse': {
      scope: {model:true},
      element: 'ng-model="model" type="checkbox" switch-inverse="{{ inverse }}"'
    },
    'getterSetter': {
      scope: {},
      element: 'ng-model="modelGetterSetter" ng-model-options="{getterSetter: true}" type="checkbox"'
    }
  };

  var CONST = {
    SWITCH_CLASS: 'bootstrap-switch',
    SWITCH_WRAPPER_CLASS: 'bootstrap-switch-wrapper',
    SWITCH_CONTAINER_CLASS: 'bootstrap-switch-container',
    SWITCH_INVERSE_CLASS: 'bootstrap-switch-inverse',
    SWITCH_INDETERMINATE_CLASS: 'bootstrap-switch-indeterminate',
    SWITCH_ON_CLASS: 'bootstrap-switch-on',
    SWITCH_OFF_CLASS: 'bootstrap-switch-off',
    SWITCH_DISABLED_CLASS: 'bootstrap-switch-disabled',
    SWITCH_READONLY_CLASS: 'bootstrap-switch-readonly',
    SWITCH_MINI_CLASS: 'bootstrap-switch-mini',
    SWITCH_INFO_CLASS: 'bootstrap-switch-info',
    SWITCH_WARNING_CLASS: 'bootstrap-switch-warning',
    SWITCH_SUCCESS_CLASS: 'bootstrap-switch-success',
    SWITCH_ERROR_CLASS: 'bootstrap-switch-error',
    SWITCH_ANIMATED_CLASS: 'bootstrap-switch-animate',
    SWITCH_LEFT_SELECTOR: '.bootstrap-switch-handle-on',
    SWITCH_RIGHT_SELECTOR: '.bootstrap-switch-handle-off',
    LABEL_SELECTOR: '.bootstrap-switch-label',
    INPUT_SELECTOR: 'input',
    ICON_SELECTOR: '.bootstrap-switch-label span',
    DEFAULT_TRUE_TEXT: 'ON',
    DEFAULT_FALSE_TEXT: 'OFF'
  };

  /**
   * Build an element string.
   * @param template The template element to be used
   * @param input true if the element must be an `input` tag, anything falsy for `bs-switch`
   * @returns {string} The HTML element as a string
   */
  function buildElement(template, input) {
    var elementContent = template.element;
    var realElement;
    if (angular.isArray(elementContent)) {
      realElement = '<div>';
      for (var c in elementContent) {
        realElement += buildSingleElement(elementContent[c], input);
      }
      realElement += '</div>';
      return realElement;
    }
    return buildSingleElement(elementContent, input);
  }

  function buildSingleElement(content, isInput) {
    var singleElement = (isInput ? '<input ' : '<') + 'bs-switch ' + content + '>';
    if (!isInput) {
      singleElement += '</bs-switch>';
    }
    return singleElement;
  }

  /**
   * Compile a given template object as an `input` or a `bs-switch`.
   * @param template The template object
   * @param input true if the element must be an `input` tag, anything falsy for `bs-switch`
   * @returns {*} compiled angular element
   */
  function compileDirective(template, input) {
    template = template ? templates[template] : templates['default'];
    angular.extend(scope, template.scope || templates['default'].scope);
    var content = buildElement(template, input);
    var $element = angular.element(content).appendTo($sandbox);
    $compile($element)(scope);
    scope.$apply();
    $element = $sandbox.find('> *:first-child');
    return $element;
  }

  // Test the widget creation and defaults
  function makeTestCreateSwitch(input) {
    return function() {
      var element = compileDirective(undefined, input);
      expect(element).not.toBe(undefined);
      expect(element.hasClass(CONST.SWITCH_CLASS)).toBe(true);
      expect(element.find(CONST.SWITCH_LEFT_SELECTOR).html()).toBe(CONST.DEFAULT_TRUE_TEXT);
      expect(element.find(CONST.SWITCH_RIGHT_SELECTOR).html()).toBe(CONST.DEFAULT_FALSE_TEXT);
      expect(element.find(CONST.LABEL_SELECTOR).html()).toBe('&nbsp;');
      expect(element.hasClass(CONST.SWITCH_ON_CLASS)).toBeTruthy();
      expect(element.hasClass(CONST.SWITCH_DISABLED_CLASS)).toBeFalsy();
      expect(element.find(CONST.INPUT_SELECTOR).attr('disabled')).toBeFalsy();
    };
  }
  it('should create a switch', inject(makeTestCreateSwitch()));
  it('should create a switch (input)', inject(makeTestCreateSwitch(true)));

  // Test the switch type
  function makeTestRadio(input) {
    return function () {
      var element = compileDirective('radio', input);
      expect(element.find(CONST.INPUT_SELECTOR).attr('type')).toBe('radio');
    };
  }
  it('should create a radio switch', inject(makeTestRadio()));
  it('should create a radio switch (input)', inject(makeTestRadio(true)));

  // Test the change of a radio switch from true to false
  function makeTestRadioOffFalse(input) {
    return function () {
      var element = compileDirective('radioOff', input);
      expect(element.hasClass(CONST.SWITCH_OFF_CLASS)).toBeFalsy();
      expect(element.hasClass(CONST.SWITCH_ON_CLASS)).toBeTruthy();
      scope.model = false;
      scope.$apply();
      expect(element.hasClass(CONST.SWITCH_OFF_CLASS)).toBeFalsy();
      expect(element.hasClass(CONST.SWITCH_ON_CLASS)).toBeTruthy();
    };
  }
  it('should not change a radio from true to false', inject(makeTestRadioOffFalse()));
  it('should not change a radio from true to false (input)', inject(makeTestRadioOffFalse(true)));

  // Test the change of a radio switch from true to false
  function makeTestRadioOffTrue(input) {
    return function () {
      var element = compileDirective('radioOff', input);
      expect(element.hasClass(CONST.SWITCH_OFF_CLASS)).toBeFalsy();
      expect(element.hasClass(CONST.SWITCH_ON_CLASS)).toBeTruthy();
      scope.radioOff = true;
      scope.model = false;
      scope.$apply();
      expect(element.hasClass(CONST.SWITCH_OFF_CLASS)).toBeTruthy();
      expect(element.hasClass(CONST.SWITCH_ON_CLASS)).toBeFalsy();
    };
  }
  it('should change a radio from true to false', inject(makeTestRadioOffTrue()));
  it('should change a radio from true to false (input)', inject(makeTestRadioOffTrue(true)));


  function expectNothing(el1, el2, el3) {
    expect(el1.hasClass(CONST.SWITCH_OFF_CLASS)).toBeTruthy();
    expect(el1.hasClass(CONST.SWITCH_ON_CLASS)).toBeFalsy();
    expect(el2.hasClass(CONST.SWITCH_OFF_CLASS)).toBeTruthy();
    expect(el2.hasClass(CONST.SWITCH_ON_CLASS)).toBeFalsy();
    expect(el3.hasClass(CONST.SWITCH_OFF_CLASS)).toBeTruthy();
    expect(el3.hasClass(CONST.SWITCH_ON_CLASS)).toBeFalsy();
  }

  function makeTestMultipleRadios(input) {
    return function () {
      var element = compileDirective('multipleRadios', input);
      var elements = element.find('.bootstrap-switch');
      var el1 = angular.element(elements[0]);
      var el2 = angular.element(elements[1]);
      var el3 = angular.element(elements[2]);
      expectNothing(el1, el2, el3);
      scope.model = 'wat';
      scope.$apply();
      expectNothing(el1, el2, el3);
      scope.model = 'dos';
      scope.$apply();
      expect(el2.hasClass(CONST.SWITCH_OFF_CLASS)).toBeFalsy();
      expect(el2.hasClass(CONST.SWITCH_ON_CLASS)).toBeTruthy();
      expect(scope.model).toEqual('dos');
      expect(el1.hasClass(CONST.SWITCH_OFF_CLASS)).toBeTruthy();
      expect(el1.hasClass(CONST.SWITCH_ON_CLASS)).toBeFalsy();
      expect(el3.hasClass(CONST.SWITCH_OFF_CLASS)).toBeTruthy();
      expect(el3.hasClass(CONST.SWITCH_ON_CLASS)).toBeFalsy();
    };
  }
  it('should set the proper model with multiple radios', inject(makeTestMultipleRadios()));
  it('should set the proper model with multiple radios (input)', inject(makeTestMultipleRadios(true)));

  function makeTestMultipleRadiosOff(input) {
    return function () {
      var element = compileDirective('multipleRadios', input);
      var elements = element.find('.bootstrap-switch');
      expect(scope.model).toEqual('');
      var el1 = angular.element(elements[0]);
      var el2 = angular.element(elements[1]);
      var el3 = angular.element(elements[2]);
      expectNothing(el1, el2, el3);
      jQuery(el3).find('input').bootstrapSwitch('toggleState');
      scope.$apply();
      expect(scope.model).toEqual('tres');
      jQuery(el3).find('input').bootstrapSwitch('toggleState');
      scope.$apply();
      expect(scope.model).toEqual(undefined);
      expectNothing(el1, el2, el3);
    };
  }
  it('should set the proper model to undefined when a radio is turned off', inject(makeTestMultipleRadiosOff()));
  it('should set the proper model to undefined when a radio is turned off (input)', inject(makeTestMultipleRadiosOff(true)));

  // Test the model change
  function makeTestChangeModel(input) {
    return function () {
      var element = compileDirective(undefined, input);
      expect(element.hasClass(CONST.SWITCH_OFF_CLASS)).toBeFalsy();
      expect(element.hasClass(CONST.SWITCH_ON_CLASS)).toBeTruthy();
      scope.model = false;
      scope.$apply();
      expect(element.hasClass(CONST.SWITCH_OFF_CLASS)).toBeTruthy();
      expect(element.hasClass(CONST.SWITCH_ON_CLASS)).toBeFalsy();
    };
  }
  it('should move the switch when the model changes', inject(makeTestChangeModel()));
  it('should move the switch when the model changes (input)', inject(makeTestChangeModel(true)));

  // Test the undefined model (the on/off class is untouched when the indeterminate class is added)
  function makeTestIndeterminateModel(input) {
    return function () {
      var element = compileDirective(undefined, input);
      expect(element.hasClass(CONST.SWITCH_OFF_CLASS)).toBeFalsy();
      expect(element.hasClass(CONST.SWITCH_ON_CLASS)).toBeTruthy();
      scope.model = undefined;
      scope.$apply();
      expect(element.hasClass(CONST.SWITCH_INDETERMINATE_CLASS)).toBeTruthy();
      expect(element.hasClass(CONST.SWITCH_OFF_CLASS)).toBeFalsy();
      expect(element.hasClass(CONST.SWITCH_ON_CLASS)).toBeTruthy();
    };
  }
  it('should set the indeterminate state when the model is undefined', inject(makeTestIndeterminateModel()));
  it('should set the indeterminate state when the model is undefined (input)', inject(makeTestIndeterminateModel(true)));

  // Test the view change
  function makeTestChangeView(input) {
    return function () {
      var element = compileDirective(undefined, input);
      expect(scope.model).toBeTruthy();
      element.find('input').bootstrapSwitch('toggleState');
      scope.$apply();
      expect(scope.model).toBeFalsy();
      element.find('input').bootstrapSwitch('toggleState');
      scope.$apply();
      expect(scope.model).toBeTruthy();
    };
  }
  it('should change the model when the switch is clicked', inject(makeTestChangeView()));
  it('should change the model when the switch is clicked (input)', inject(makeTestChangeView(true)));

  // Test the deactivation
  function makeTestDeactivate(input) {
    return function () {
      var element = compileDirective('active', input);
      expect(element.hasClass(CONST.SWITCH_DISABLED_CLASS)).toBeFalsy();
      expect(element.find(CONST.INPUT_SELECTOR).attr('disabled')).toBeFalsy();
      scope.isActive = false;
      scope.$apply();
      $timeout.flush();
      expect(element.hasClass(CONST.SWITCH_DISABLED_CLASS)).toBeTruthy();
      expect(element.find(CONST.INPUT_SELECTOR).attr('disabled')).toBeTruthy();
    };
  }
  it('should deactivate the switch', inject(makeTestDeactivate()));
  it('should deactivate the switch (input)', inject(makeTestDeactivate(true)));

  // Test a model change followed by a deactivation
  function makeTestChangeModelThenDeactivate(input) {
    return function () {
      var element = compileDirective('active', input);
      // test the active state, should be true
      expect(element.hasClass(CONST.SWITCH_DISABLED_CLASS)).toBeFalsy();
      expect(element.find(CONST.INPUT_SELECTOR).attr('disabled')).toBeFalsy();
      // test the model, should be false
      expect(element.hasClass(CONST.SWITCH_OFF_CLASS)).toBeFalsy();
      expect(element.hasClass(CONST.SWITCH_ON_CLASS)).toBeTruthy();
      scope.model = false;
      scope.isActive = false;
      scope.$apply();
      $timeout.flush();
      // test the active state, should be false
      expect(element.hasClass(CONST.SWITCH_DISABLED_CLASS)).toBeTruthy();
      expect(element.find(CONST.INPUT_SELECTOR).attr('disabled')).toBeTruthy();
      // test the model, should be false
      expect(element.hasClass(CONST.SWITCH_OFF_CLASS)).toBeTruthy();
      expect(element.hasClass(CONST.SWITCH_ON_CLASS)).toBeFalsy();
    };
  }
  it('should change the model, then deactivate the switch', inject(makeTestChangeModelThenDeactivate()));
  it('should change the model, deactivate the switch (input)', inject(makeTestChangeModelThenDeactivate(true)));

  // Test the activation
  function makeTestActivate(input) {
    return function () {
      var element = compileDirective('unactivated', input);
      // need to flush since the element starts as deactivated
      $timeout.flush();
      expect(element.hasClass(CONST.SWITCH_DISABLED_CLASS)).toBeTruthy();
      scope.isActive = true;
      scope.$apply();
      // no need to flush here since we are activating the switch
      expect(element.hasClass(CONST.SWITCH_DISABLED_CLASS)).toBeFalsy();
    };
  }
  it('should activate the switch', inject(makeTestActivate()));
  it('should activate the switch (input)', inject(makeTestActivate(true)));

  // Test the readonly
  function makeTestReadonly(input) {
    return function () {
      var element = compileDirective('readonly', input);
      expect(element.hasClass(CONST.SWITCH_READONLY_CLASS)).toBeFalsy();
      expect(element.find(CONST.INPUT_SELECTOR).attr('readonly')).toBeFalsy();
      scope.isReadonly = true;
      scope.$apply();
      expect(element.hasClass(CONST.SWITCH_READONLY_CLASS)).toBeTruthy();
      expect(element.find(CONST.INPUT_SELECTOR).attr('readonly')).toBeTruthy();
    };
  }
  it('should set the switch as read only', inject(makeTestReadonly()));
  it('should set the switch as read only (input)', inject(makeTestReadonly(true)));

  // Test the size change
  function makeTestChangeSize(input) {
    return function () {
      var element = compileDirective('size', input);
      expect(element.hasClass(CONST.SWITCH_MINI_CLASS)).toBeFalsy();
      scope.size = 'mini';
      scope.$apply();
      expect(element.hasClass(CONST.SWITCH_MINI_CLASS)).toBeTruthy();
    };
  }
  it('should change the switch size', inject(makeTestChangeSize()));
  it('should change the switch size (input)', inject(makeTestChangeSize(true)));

  // Test the label width change
  function makeTestChangeLabelWidth(input) {
    return function () {
      var element = compileDirective('size', input);
      scope.labelWidth = '600';
      scope.$apply();
      expect(element.find(CONST.INPUT_SELECTOR).bootstrapSwitch('labelWidth')).toEqual('600');
    };
  }
  it('should change the label width', inject(makeTestChangeLabelWidth()));
  it('should change the label width (input)', inject(makeTestChangeLabelWidth(true)));

  // Test the handle width change
  function makeTestChangeHandleWidth(input) {
    return function () {
      var element = compileDirective('size', input);
      scope.handleWidth = '600';
      scope.$apply();
      expect(element.find(CONST.INPUT_SELECTOR).bootstrapSwitch('handleWidth')).toEqual('600');
    };
  }
  it('should change the handle width', inject(makeTestChangeHandleWidth()));
  it('should change the handle width (input)', inject(makeTestChangeHandleWidth(true)));

  // Test the "on" and "off" color change
  function makeTestChangeColor(input) {
    return function () {
      var element = compileDirective('color', input);
      expect(element.find(CONST.SWITCH_LEFT_SELECTOR).hasClass(CONST.SWITCH_INFO_CLASS)).toBeTruthy();
      expect(element.find(CONST.SWITCH_RIGHT_SELECTOR).hasClass(CONST.SWITCH_WARNING_CLASS)).toBeTruthy();
      scope.on = 'success';
      scope.off = 'error';
      scope.$apply();
      expect(element.find(CONST.SWITCH_LEFT_SELECTOR).hasClass(CONST.SWITCH_SUCCESS_CLASS)).toBeTruthy();
      expect(element.find(CONST.SWITCH_RIGHT_SELECTOR).hasClass(CONST.SWITCH_ERROR_CLASS)).toBeTruthy();
    };
  }
  it('should change the switch colors', inject(makeTestChangeColor()));
  it('should change the switch colors (input)', inject(makeTestChangeColor(true)));

  // Test the "on" and "off" label change
  function makeTestChangeLabel(input) {
    return function () {
      var element = compileDirective('label', input);
      expect(element.find(CONST.SWITCH_LEFT_SELECTOR).html()).toBe(CONST.DEFAULT_TRUE_TEXT);
      expect(element.find(CONST.SWITCH_RIGHT_SELECTOR).html()).toBe(CONST.DEFAULT_FALSE_TEXT);
      scope.on = 'Yay';
      scope.off = 'Nay';
      scope.$apply();
      expect(element.find(CONST.SWITCH_LEFT_SELECTOR).html()).toBe('Yay');
      expect(element.find(CONST.SWITCH_RIGHT_SELECTOR).html()).toBe('Nay');
    };
  }
  it('should change the switch labels', inject(makeTestChangeLabel()));
  it('should change the switch labels (input)', inject(makeTestChangeLabel(true)));

  // Test the middle label change
  function makeTestChangeMiddleLabel(input) {
    return function () {
      var element = compileDirective('label', input);
      expect(element.find(CONST.LABEL_SELECTOR).html()).toBe('&nbsp;');
      scope.label = 'XYZ';
      scope.$apply();
      expect(element.find(CONST.LABEL_SELECTOR).html()).toBe('XYZ');
    };
  }
  it('should change the switch middle label', inject(makeTestChangeMiddleLabel()));
  it('should change the switch middle label (input)', inject(makeTestChangeMiddleLabel(true)));

  // Test the middle icon change
  function makeTestChangeMiddleIcon(input) {
    return function () {
      var element = compileDirective('icon', input);
      expect(element.find(CONST.ICON_SELECTOR).hasClass('icon-youtube')).toBeTruthy();
      scope.icon = 'icon-fullscreen';
      scope.$apply();
      expect(element.find(CONST.ICON_SELECTOR).hasClass('icon-youtube')).toBeFalsy();
      expect(element.find(CONST.ICON_SELECTOR).hasClass('icon-fullscreen')).toBe(true);
    };
  }
  it('should change the switch middle icon', inject(makeTestChangeMiddleIcon()));
  it('should change the switch middle icon (input)', inject(makeTestChangeMiddleIcon(true)));

  // Test the animation deactivation and reactivation
  function makeTestAnimation(input) {
    return function () {
      jasmine.clock().install();
      var element = compileDirective('animation', input);
      jasmine.clock().tick(50);
      expect(element.hasClass(CONST.SWITCH_ANIMATED_CLASS)).toBeTruthy();
      scope.animate = false;
      scope.$apply();
      jasmine.clock().tick(50);
      expect(element.hasClass(CONST.SWITCH_ANIMATED_CLASS)).toBeFalsy();
      scope.animate = true;
      scope.$apply();
      jasmine.clock().tick(50);
      expect(element.hasClass(CONST.SWITCH_ANIMATED_CLASS)).toBeTruthy();
      jasmine.clock().uninstall();
    };
  }
  it('should change the switch animation mode', inject(makeTestAnimation()));
  it('should change the switch animation mode (input)', inject(makeTestAnimation(true)));

  // Test the custom class modifiers
  function makeTestClassModifiers(input) {
    return function () {
      var element = compileDirective('modifier', input);
      expect(element.hasClass(CONST.SWITCH_WRAPPER_CLASS)).toBeTruthy();
      scope.modifier = 'flat-switch';
      scope.$apply();
      expect(element.hasClass(CONST.SWITCH_WRAPPER_CLASS)).toBeFalsy();
      expect(element.hasClass('bootstrap-switch-flat-switch')).toBeTruthy();
      scope.modifier = '';
      scope.$apply();
      expect(element.hasClass(CONST.SWITCH_WRAPPER_CLASS)).toBeTruthy();
      scope.modifier = undefined;
      scope.$apply();
      expect(element.hasClass(CONST.SWITCH_WRAPPER_CLASS)).toBeTruthy();
    };
  }
  it('should change the custom wrapper class', inject(makeTestClassModifiers()));
  it('should change the custom wrapper class (input)', inject(makeTestClassModifiers(true)));

  // Test the non-replacement if already an input element given
  // to ensure IE8 compatibility
  function makeTestReplacement(useInputElement) {
    return function () {
      var beforeCompile,
          afterCompile,
          content,
          template = templates['default'];

      angular.extend(scope, template.scope);
      content = buildElement(template, useInputElement);
      beforeCompile = angular.element(content).appendTo($sandbox);

      $compile(beforeCompile)(scope);
      afterCompile = $sandbox.find('input');
      scope.$apply();

      expect(beforeCompile.length).toBe(1);
      expect(afterCompile.length).toBe(1);
      expect(beforeCompile[0] === afterCompile[0]).toBe(true);
    };
  }
  it('should replace non-input elements', inject(makeTestReplacement()));
  it('should not replace input elements', inject(makeTestReplacement(true)));

  // Test the custom true/false values
  function makeTestCustomValues(input) {
    return function () {
      var element = compileDirective('customValues', input);
      expect(element.hasClass(CONST.SWITCH_OFF_CLASS)).toBeTruthy();
      expect(element.hasClass(CONST.SWITCH_ON_CLASS)).toBeFalsy();
      scope.model = 'yep';
      scope.$apply();
      expect(element.hasClass(CONST.SWITCH_OFF_CLASS)).toBeFalsy();
      expect(element.hasClass(CONST.SWITCH_ON_CLASS)).toBeTruthy();
    };
  }
  it('should use "yep" and "nope" instead of true and false', inject(makeTestCustomValues()));
  it('should use "yep" and "nope" instead of true and false (input)', inject(makeTestCustomValues(true)));

  // Test the custom true/false values as generic objects
  function makeTestCustomObjectsValues(input) {
    return function () {
      var element = compileDirective('customObjectsValues', input);
      expect(element.hasClass(CONST.SWITCH_OFF_CLASS)).toBeTruthy();
      expect(element.hasClass(CONST.SWITCH_ON_CLASS)).toBeFalsy();
      scope.model = 0;
      scope.$apply();
      expect(element.hasClass(CONST.SWITCH_OFF_CLASS)).toBeFalsy();
      expect(element.hasClass(CONST.SWITCH_ON_CLASS)).toBeTruthy();
    };
  }
  it('should use 0 and 1 instead of true and false', inject(makeTestCustomObjectsValues()));
  it('should use 0 and 1 instead of true and false (input)', inject(makeTestCustomObjectsValues(true)));

  // Test the inverse default option
  function makeTestInverseUndefined(input) {
    return function () {
      var element = compileDirective('inverse', input);
      expect(element.hasClass(CONST.SWITCH_INVERSE_CLASS)).toBeFalsy();
      var children = element.find('.' + CONST.SWITCH_CONTAINER_CLASS).find('*[class^=\'bootstrap-switch-handle-\']');
      expect(children.length).toBe(2);
      expect(angular.element(children[0]).hasClass(CONST.SWITCH_LEFT_SELECTOR.substr(1))).toBeTruthy();
      expect(angular.element(children[1]).hasClass(CONST.SWITCH_RIGHT_SELECTOR.substr(1))).toBeTruthy();
    };
  }
  it('should default to inverse false when not defined', inject(makeTestInverseUndefined()));
  it('should default to inverse false when not defined (input)', inject(makeTestInverseUndefined(true)));

  // Test the inverse option
  function makeTestInverse(input) {
    return function () {
      var element = compileDirective('inverse', input);
      expect(element.hasClass(CONST.SWITCH_INVERSE_CLASS)).toBeFalsy();
      // invert
      scope.inverse = true;
      scope.$apply();
      expect(element.hasClass(CONST.SWITCH_INVERSE_CLASS)).toBeTruthy();
      var children = element.find('.' + CONST.SWITCH_CONTAINER_CLASS).find('*[class^=\'bootstrap-switch-handle-\']');
      expect(children.length).toBe(2);
      expect(angular.element(children[1]).hasClass(CONST.SWITCH_LEFT_SELECTOR.substr(1))).toBeTruthy();
      expect(angular.element(children[0]).hasClass(CONST.SWITCH_RIGHT_SELECTOR.substr(1))).toBeTruthy();
      // reset
      scope.inverse = false;
      scope.$apply();
      expect(element.hasClass(CONST.SWITCH_INVERSE_CLASS)).toBeFalsy();
      children = element.find('.' + CONST.SWITCH_CONTAINER_CLASS).find('*[class^=\'bootstrap-switch-handle-\']');
      expect(children.length).toBe(2);
      expect(angular.element(children[0]).hasClass(CONST.SWITCH_LEFT_SELECTOR.substr(1))).toBeTruthy();
      expect(angular.element(children[1]).hasClass(CONST.SWITCH_RIGHT_SELECTOR.substr(1))).toBeTruthy();
    };
  }
  it('should invert the on and off switches and then reset them', inject(makeTestInverse()));
  it('should invert the on and off switches and then reset them (input)', inject(makeTestInverse(true)));

  // Test the getterSetter ng-model option
  function makeTestGetterSetter(input) {
    return function () {
      var element = compileDirective('getterSetter', input);
      var localValue = false;

      scope.modelGetterSetter = function() {
        return localValue;
      };
      scope.$apply();

      expect(element.hasClass(CONST.SWITCH_OFF_CLASS)).toBeTruthy();
      expect(element.hasClass(CONST.SWITCH_ON_CLASS)).toBeFalsy();

      localValue = true;
      scope.$apply();
      expect(element.hasClass(CONST.SWITCH_OFF_CLASS)).toBeFalsy();
      expect(element.hasClass(CONST.SWITCH_ON_CLASS)).toBeTruthy();
    };
  }
  it('should watch updates in getterSetter', inject(makeTestGetterSetter()));
  it('should watch updates in getterSetter', inject(makeTestGetterSetter(true)));

});
