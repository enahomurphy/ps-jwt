'use strict';

angular.module('psJwtApp')
  .controller('HeaderCtrl', function ($scope, $location, $auth) {

      $scope.isAuthenticated = function() {
        return $auth.isAuthenticated()
      }

      $scope.$watch($scope.isAuthenticated, $scope.isAuthenticated)
  });
