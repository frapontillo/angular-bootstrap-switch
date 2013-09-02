'use strict';

describe('Directive: bsSwitch', function () {
  beforeEach(module('frapontillo.bootstrap-switch'));

  var element;

  it('should create a switch', inject(function ($rootScope, $compile) {
    element = angular.element('<bs-switch></bs-switch>');
    element = $compile(element)($rootScope);
    expect(element.hasClass('make-switch')).not.toBe(false);
  }));
});
