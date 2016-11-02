'use strict';

/**
 * @ngdoc function
 * @name psJwtApp.controller:RegisterctrlCtrl
 * @description
 * # RegisterctrlCtrl
 * Controller of the psJwtApp
 */
angular.module('psJwtApp')
  .controller('RegisterctrlCtrl', function ($scope, $http, alert) {
      $scope.submit = function() {
        $http.post('/api/users')
          .success(function(response){
            alert('succed', 'u have been registered', 'success', true)
          })
          .error(function(err) {
            alert('failed', 'OOps somehing went wroung', 'danger', true)
            console.log(err)
          })
      } 
  });
