'use strict';

/**
 * @ngdoc function
 * @name psJwtApp.controller:RegisterctrlCtrl
 * @description
 * # RegisterctrlCtrl
 * Controller of the psJwtApp
 */
angular.module('psJwtApp')
  .controller('RegisterctrlCtrl', function ($scope, $http, alert, authToken) {

      $scope.submit = function() {

        var url = 'http://localhost:3000/register'

        $http.post(url, $scope.user)
          .success(function(response){
            authToken.setToken(response.token)
            console.log(response)
            alert('succed', 'u have been registered', 'success', true)
          })
          .error(function(err) {
            alert('failed', 'OOps somehing went wroung', 'error', true)
            console.log(err)
          })
      } 
  });
