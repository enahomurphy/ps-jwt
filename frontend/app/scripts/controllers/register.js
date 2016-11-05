'use strict';

/**
 * @ngdoc function
 * @name psJwtApp.controller:RegisterctrlCtrl
 * @description
 * # RegisterctrlCtrl
 * Controller of the psJwtApp
 */
angular.module('psJwtApp')
  .controller('RegisterctrlCtrl', function ($scope, alert, $auth, helpers, authToken) {


     helpers.authenticated()


      $scope.submit = function() {
        $auth.signup($scope.user)
          .then(function(response){
            alert('succed', 'thank you for registering ' + response.data.user.name , 'success', true)
            console.log(response)
            authToken.setToken(response.data.token)
            helpers.redirect('jobs')
          })
          .catch(function(err) {
            console.log(err)
            alert('failed', 'OOps somehing went wroung', 'error', true)
          })
      } 
  });
