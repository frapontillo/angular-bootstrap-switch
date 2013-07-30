'use strict';

describe('Directive: bsSwitch', function () {
  beforeEach(module('angularBootstrapSwitchApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<bs-switch></bs-switch>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the bsSwitch directive');
  }));
});
