'use strict';

/**
 * @ngdoc function
 * @name psJwtApp.controller:JobsCtrl
 * @description
 * # JobsCtrl
 * Controller of the psJwtApp
 */
angular.module('psJwtApp')
  .controller('JobsCtrl', function ($scope, $http, APP_URL, alert) {
    // $scope.jobs = [
    //   'HTML5 Boilerplate',
    //   'AngularJS',
    //   'Karma'
    // ];
    $scope.jobs = []

    $http.get(APP_URL+'/jobs')
      .success(function(res) {
          $scope.jobs = res
          console.log(res, APP_URL+'/jobs')
      })
      .error(function(err) {
        console.log(err)
          alert('aunautorized', err.message, 'warning')
      })
  });
