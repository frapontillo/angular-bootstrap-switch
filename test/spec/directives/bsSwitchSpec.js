'use strict';

describe('Directive: bsSwitch', function () {
  var scope, $sandbox, $compileFn;

  beforeEach(module('frapontillo.bootstrap-switch'));

  beforeEach(inject(function ($injector, $rootScope, $compile) {
    scope = $rootScope;
    $compileFn = $compile;
    $sandbox = angular.element('<div id="sandbox"></div>').appendTo(angular.element.find('body'));
  }));

  afterEach(function() {
    $sandbox.remove();
    scope.$destroy();
  });

  var templates = {
    'default': {
      scope: {model:true},
      element: '<bs-switch ng-model="model"></bs-switch>'
    },
    'radio': {
      scope: {model:true},
      element: '<bs-switch ng-model="model" switch-type="radio"></bs-switch>'
    },
    'active': {
      scope: {model:true, isActive:true},
      element: '<bs-switch ng-model="model" switch-active="{{ isActive }}"></bs-switch>'
    },
    'unactivated': {
      scope: {model:true, isActive:false},
      element: '<bs-switch ng-model="model" switch-active="{{ isActive }}"></bs-switch>'
    },
    'size': {
      scope: {model:true, size:'large'},
      element: '<bs-switch ng-model="model" switch-size="{{ size }}"></bs-switch>'
    },
    'color': {
      scope: {model:true, on:'info', off:'warning'},
      element: '<bs-switch ng-model="model" switch-on="{{ on }}" switch-off="{{ off }}"></bs-switch>'
    },
    'label': {
      scope: {model:true},
      element: '<bs-switch ng-model="model" switch-on-label="{{ on }}" switch-off-label="{{ off }}" switch-label="{{ label }}"></bs-switch>'
    },
    'icon': {
      scope: {model:true, icon:'icon-youtube'},
      element: '<bs-switch ng-model="model" switch-icon="{{ icon }}"></bs-switch>'
    },
    'animation': {
      scope: {model:true},
      element: '<bs-switch ng-model="model" switch-animate="{{ animate }}"></bs-switch>'
    }
  };

  function compileDirective(template) {
    template = template ? templates[template] : templates['default'];
    angular.extend(scope, template.scope || templates['default'].scope);
    var $element = angular.element(template.element).appendTo($sandbox);
    $element = $compileFn($element)(scope);
    scope.$apply();
    return $element;
  }

  it('should create a switch', inject(function () {
    var element = compileDirective();
    expect(element.hasClass('has-switch')).toBe(true);
  }));

  // Test the switch type
  it('should create a radio switch', inject(function () {
    var element = compileDirective('radio');
    expect(element.find('input').attr('type')).toBe('radio');
  }));

  // Test the model change
  it('should move the switch when the model changes', inject(function () {
    var element = compileDirective();
    expect(element.find('div').hasClass('switch-off')).toBeFalsy();
    expect(element.find('div').hasClass('switch-on')).toBeTruthy();
    scope.model = false;
    scope.$apply();
    expect(element.find('div').hasClass('switch-off')).toBeTruthy();
    expect(element.find('div').hasClass('switch-on')).toBeFalsy();
  }));

  // Test the view change
  it('should change the model when the switch is clicked', inject(function () {
    var element = compileDirective();
    expect(scope.model).toBeTruthy();
    // The click on the element's label executes asynchronously,
    // so we skip that and rely on the fact that the click calls:
    element.bootstrapSwitch('setState', false);
    scope.$apply();
    expect(scope.model).toBeFalsy();
  }));

  // Test the deactivation
  it('should deactivate the switch', inject(function () {
    var element = compileDirective('active');
    expect(element.hasClass('deactivate')).toBeFalsy();
    scope.isActive = false;
    scope.$apply();
    expect(element.hasClass('deactivate')).toBeTruthy();
  }));

  // Test the activation
  it('should activate the switch', inject(function () {
    var element = compileDirective('unactivated');
    expect(element.hasClass('deactivate')).toBeTruthy();
    scope.isActive = true;
    scope.$apply();
    expect(element.hasClass('deactivate')).toBeFalsy();
  }));

  // Test the size change
  it('should change the switch size', inject(function () {
    var element = compileDirective('size');
    expect(element.find('span').hasClass('switch-mini')).toBeFalsy();
    scope.size = 'mini';
    scope.$apply();
    expect(element.find('span').hasClass('switch-mini')).toBeTruthy();
  }));

  // Test the "on" and "off" color change
  it('should change the switch colors', inject(function () {
    var element = compileDirective('color');
    expect(element.find('span.switch-left').hasClass('switch-info')).toBeTruthy();
    expect(element.find('span.switch-right').hasClass('switch-warning')).toBeTruthy();
    scope.on = 'success';
    scope.off = 'error';
    scope.$apply();
    expect(element.find('span.switch-left').hasClass('switch-success')).toBeTruthy();
    expect(element.find('span.switch-right').hasClass('switch-error')).toBeTruthy();
  }));

  // Test the "on" and "off" label change
  it('should change the switch labels', inject(function () {
    var element = compileDirective('label');
    expect(element.find('span.switch-left').html()).toBe('Yes');
    expect(element.find('span.switch-right').html()).toBe('No');
    scope.on = 'Yay';
    scope.off = 'Nay';
    scope.$apply();
    expect(element.find('span.switch-left').html()).toBe('Yay');
    expect(element.find('span.switch-right').html()).toBe('Nay');
  }));

  // Test the middle label change
  it('should change the switch middle label', inject(function () {
    var element = compileDirective('label');
    expect(element.find('label').html()).toBe('&nbsp;');
    scope.label = 'XYZ';
    scope.$apply();
    expect(element.find('label').html()).toBe('XYZ');
  }));

  // Test the middle icon change
  it('should change the switch middle icon', inject(function () {
    var element = compileDirective('icon');
    expect(element.find('label i').hasClass('icon-youtube')).toBeTruthy();
    scope.icon = 'icon-fullscreen';
    scope.$apply();
    expect(element.find('label i').hasClass('icon-youtube')).toBeFalsy();
    expect(element.find('label i').hasClass('icon-fullscreen')).toBe(true);
  }));

  // Test the animation deactivation and reactivation
  it('should change the switch animation mode', inject(function () {
    var element = compileDirective('animation');
    expect(element.find('div').attr('data-animated')).toBe('true');
    scope.animate = false;
    scope.$apply();
    expect(element.find('div').attr('data-animated')).toBe('false');
    scope.animate = true;
    scope.$apply();
    expect(element.find('div').attr('data-animated')).toBe('true');
  }));

});
