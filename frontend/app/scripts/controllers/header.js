'use strict';

/**
 * @ngdoc function
 * @name psJwtApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the psJwtApp
 */
angular.module('psJwtApp')
  .controller('HeaderCtrl', function ($scope, $location, $auth) {

      $scope.isAuthenticated = function() {
        console.log($auth.isAuthenticated())
        return $auth.isAuthenticated()
      }

      $scope.$watch($scope.isAuthenticated, $scope.isAuthenticated)
  });
