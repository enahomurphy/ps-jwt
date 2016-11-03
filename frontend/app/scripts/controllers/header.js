'use strict';

/**
 * @ngdoc function
 * @name psJwtApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the psJwtApp
 */
angular.module('psJwtApp')
  .controller('HeaderCtrl', function ($scope, $location, authToken) {

      $scope.isAuthenticated = function() {
        return authToken.isAuthenticated()
      }

      $scope.$watch($scope.isAuthenticated, $scope.isAuthenticated)
  });
