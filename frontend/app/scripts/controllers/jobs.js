'use strict';

angular.module('psJwtApp')
  .controller('JobsCtrl', function ($scope, $http, APP_URL, alert) {

    $scope.jobs = []

    $http.get(APP_URL+'jobs')
      .success(function(res) {
          $scope.jobs = res
      })
      .error(function(err) {
        console.log(err)
          alert('unauthorized', err.message, 'warning')
      })
  });
