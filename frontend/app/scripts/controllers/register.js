'use strict';

/**
 * @ngdoc function
 * @name psJwtApp.controller:RegisterctrlCtrl
 * @description
 * # RegisterctrlCtrl
 * Controller of the psJwtApp
 */
angular.module('psJwtApp')
  .controller('RegisterctrlCtrl', function ($scope, alert, auth) {

      $scope.submit = function() {
        auth.register($scope.user)
          .success(function(response){
            alert('succed', 'thank you for registering' + response.user.name , 'success', true)
          })
          .error(function(err) {
            alert('failed', 'OOps somehing went wroung', 'error', true)
          })
      } 
  });
