'use strict';

angular.module('bsSwitchApp')
  .controller('MainCtrl', function ($scope, $log) {
    $scope.isSelected = 'nope';
    $scope.onText = 'Y';
    $scope.offText = 'N';
    $scope.isActive = true;
    $scope.size = 'normal';
    $scope.animate = true;
    $scope.radioOff = true;
    $scope.handleWidth = "auto";
    $scope.labelWidth = "auto";
    $scope.inverse = true;

    $scope.$watch('isSelected', function() {
      $log.info('Selection changed.');
    });

    $scope.toggle = function() {
      $scope.isSelected = $scope.isSelected === 'yep' ? 'nope' : 'yep';
    };

    $scope.setUndefined = function() {
      $scope.isSelected = undefined;
    };

    $scope.toggleActivation = function() {
      $scope.isActive = !$scope.isActive;
    }
  });
