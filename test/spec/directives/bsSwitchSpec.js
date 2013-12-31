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
    'radio': {
      scope: {model:true},
      element: 'ng-model="model" type="radio"'
    },
    'active': {
      scope: {model:true, isActive:true},
      element: 'ng-model="model" switch-active="{{ isActive }}"'
    },
    'unactivated': {
      scope: {model:true, isActive:false},
      element: 'ng-model="model" switch-active="{{ isActive }}"'
    },
    'size': {
      scope: {model:true, size:'large'},
      element: 'ng-model="model" switch-size="{{ size }}"'
    },
    'color': {
      scope: {model:true, on:'info', off:'warning'},
      element: 'ng-model="model" switch-on="{{ on }}" switch-off="{{ off }}"'
    },
    'label': {
      scope: {model:true},
      element: 'ng-model="model" switch-on-label="{{ on }}" switch-off-label="{{ off }}" switch-label="{{ label }}"'
    },
    'icon': {
      scope: {model:true, icon:'icon-youtube'},
      element: 'ng-model="model" switch-icon="{{ icon }}"'
    },
    'animation': {
      scope: {model:true},
      element: 'ng-model="model" switch-animate="{{ animate }}"'
    }
  };

  /**
   * Build an element string.
   * @param template The template element to be used
   * @param input true if the element must be an `input` tag, anything falsy for `bs-switch`
   * @returns {string} The HTML element as a string
   */
  function buildElement(template, input) {
    var elementContent = template.element;
    var realElement = (input ? '<input ' : '<') + 'bs-switch ' + elementContent + '>';
    if (!input) {
      realElement += '</bs-switch>';
    }
    return realElement;
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
    $element = $sandbox.find('*:first-child');
    scope.$apply();
    return $element;
  }

  // Test the widget creation and defaults
  function makeTestCreateSwitch(input) {
    return function() {
      var element = compileDirective(undefined, input);
      $timeout.flush();
      expect(element.hasClass('has-switch')).toBe(true);
      expect(element.find('span.switch-left').html()).toBe('Yes');
      expect(element.find('span.switch-right').html()).toBe('No');
      expect(element.find('label').html()).toBe('&nbsp;');
      expect(element.find('div').hasClass('switch-on')).toBeTruthy();
      expect(element.hasClass('deactivate')).toBeFalsy();
      expect(element.find('input').attr('disabled')).toBeFalsy();
    };
  }
  it('should create a switch', inject(makeTestCreateSwitch()));
  it('should create a switch (input)', inject(makeTestCreateSwitch(true)));

  // Test the switch type
  function makeTestRadio(input) {
    return function () {
      var element = compileDirective('radio', input);
      expect(element.find('input').attr('type')).toBe('radio');
    };
  }
  it('should create a radio switch', inject(makeTestRadio()));
  it('should create a radio switch (input)', inject(makeTestRadio(true)));

  // Test the model change
  function makeTestChangeModel(input) {
    return function () {
      var element = compileDirective(undefined, input);
      $timeout.flush();
      expect(element.find('div').hasClass('switch-off')).toBeFalsy();
      expect(element.find('div').hasClass('switch-on')).toBeTruthy();
      scope.model = false;
      scope.$apply();
      $timeout.flush();
      expect(element.find('div').hasClass('switch-off')).toBeTruthy();
      expect(element.find('div').hasClass('switch-on')).toBeFalsy();
    };
  }
  it('should move the switch when the model changes', inject(makeTestChangeModel()));
  it('should move the switch when the model changes (input)', inject(makeTestChangeModel(true)));

  // Test the view change
  function makeTestChangeView(input) {
    return function () {
      var element = compileDirective(undefined, input);
      $timeout.flush();
      expect(scope.model).toBeTruthy();
      // The click on the element's label executes asynchronously,
      // so we skip that and rely on the fact that the click calls:
      element.find('input').bootstrapSwitch('setState', false);
      scope.$apply();
      expect(scope.model).toBeFalsy();
    };
  }
  it('should change the model when the switch is clicked', inject(makeTestChangeView()));
  it('should change the model when the switch is clicked (input)', inject(makeTestChangeView(true)));

  // Test the deactivation
  function makeTestDeactivate(input) {
    return function () {
      var element = compileDirective('active', input);
      expect(element.hasClass('disabled')).toBeFalsy();
      expect(element.find('input').attr('disabled')).toBeFalsy();
      scope.isActive = false;
      scope.$apply();
      $timeout.flush();
      expect(element.hasClass('disabled')).toBeTruthy();
      expect(element.find('input').attr('disabled')).toBeTruthy();
    };
  }
  it('should deactivate the switch', inject(makeTestDeactivate()));
  it('should deactivate the switch (input)', inject(makeTestDeactivate(true)));

  // Test the activation
  function makeTestActivate(input) {
    return function () {
      var element = compileDirective('unactivated', input);
      expect(element.hasClass('disabled')).toBeTruthy();
      expect(element.find('input').attr('disabled')).toBeTruthy();
      scope.isActive = true;
      scope.$apply();
      expect(element.hasClass('disabled')).toBeFalsy();
      expect(element.find('input').attr('disabled')).toBeFalsy();
    };
  }
  it('should activate the switch', inject(makeTestActivate()));
  it('should activate the switch (input)', inject(makeTestActivate(true)));

  // Test the size change
  function makeTestChangeSize(input) {
    return function () {
      var element = compileDirective('size', input);
      expect(element.find('span').hasClass('switch-mini')).toBeFalsy();
      scope.size = 'mini';
      scope.$apply();
      expect(element.find('span').hasClass('switch-mini')).toBeTruthy();
    };
  }
  it('should change the switch size', inject(makeTestChangeSize()));
  it('should change the switch size (input)', inject(makeTestChangeSize(true)));

  // Test the "on" and "off" color change
  function makeTestChangeColor(input) {
    return function () {
      var element = compileDirective('color', input);
      expect(element.find('span.switch-left').hasClass('switch-info')).toBeTruthy();
      expect(element.find('span.switch-right').hasClass('switch-warning')).toBeTruthy();
      scope.on = 'success';
      scope.off = 'error';
      scope.$apply();
      expect(element.find('span.switch-left').hasClass('switch-success')).toBeTruthy();
      expect(element.find('span.switch-right').hasClass('switch-error')).toBeTruthy();
    };
  }
  it('should change the switch colors', inject(makeTestChangeColor()));
  it('should change the switch colors (input)', inject(makeTestChangeColor(true)));

  // Test the "on" and "off" label change
  function makeTestChangeLabel(input) {
    return function () {
      var element = compileDirective('label', input);
      expect(element.find('span.switch-left').html()).toBe('Yes');
      expect(element.find('span.switch-right').html()).toBe('No');
      scope.on = 'Yay';
      scope.off = 'Nay';
      scope.$apply();
      expect(element.find('span.switch-left').html()).toBe('Yay');
      expect(element.find('span.switch-right').html()).toBe('Nay');
    };
  }
  it('should change the switch labels', inject(makeTestChangeLabel()));
  it('should change the switch labels (input)', inject(makeTestChangeLabel(true)));

  // Test the middle label change
  function makeTestChangeMiddleLabel(input) {
    return function () {
      var element = compileDirective('label', input);
      expect(element.find('label').html()).toBe('&nbsp;');
      scope.label = 'XYZ';
      scope.$apply();
      expect(element.find('label').html()).toBe('XYZ');
    };
  }
  it('should change the switch middle label', inject(makeTestChangeMiddleLabel()));
  it('should change the switch middle label (input)', inject(makeTestChangeMiddleLabel(true)));

  // Test the middle icon change
  function makeTestChangeMiddleIcon(input) {
    return function () {
      var element = compileDirective('icon', input);
      expect(element.find('label i').hasClass('icon-youtube')).toBeTruthy();
      scope.icon = 'icon-fullscreen';
      scope.$apply();
      expect(element.find('label i').hasClass('icon-youtube')).toBeFalsy();
      expect(element.find('label i').hasClass('icon-fullscreen')).toBe(true);
    };
  }
  it('should change the switch middle icon', inject(makeTestChangeMiddleIcon()));
  it('should change the switch middle icon (input)', inject(makeTestChangeMiddleIcon(true)));

  // Test the animation deactivation and reactivation
  function makeTestAnimation(input) {
    return function () {
      var element = compileDirective('animation', input);
      expect(element.find('div').attr('data-animated')).toBe('true');
      scope.animate = false;
      scope.$apply();
      expect(element.find('div').attr('data-animated')).toBe('false');
      scope.animate = true;
      scope.$apply();
      expect(element.find('div').attr('data-animated')).toBe('true');
    };
  }
  it('should change the switch animation mode', inject(makeTestAnimation()));
  it('should change the switch animation mode (input)', inject(makeTestAnimation(true)));

});
