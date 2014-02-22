'use strict';

angular.module('bsSwitchApp')
  .controller('MainCtrl', function ($scope, $log) {
    $scope.isSelected = true;
    $scope.onText = 'Y';
    $scope.offText = 'N';
    $scope.isActive = true;
    $scope.size = 'large';
    $scope.animate = true;

    $scope.$watch('isSelected', function() {
      $log.info('Selection changed.');
    });

    $scope.toggleActivation = function() {
      $scope.isActive = !$scope.isActive;
    }
  });
