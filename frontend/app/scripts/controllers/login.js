'use strict';


angular.module('psJwtApp')
  .controller('LoginCtrl', function ($scope, alert,auth) {

    $scope.authenticate = function () {
      auth.login($scope.email, $scope.password)
        .success(function (res) {
          alert('success', 'Welcome back '+res.user.name, 'success', true)
        })
        .error(function (err) {
           alert('failed', 'invalid username/password', 'error', true)
        })
    }

    $scope.gooleAuthenticate = function () {
        auth.googleAuth().then(function(res) {
          alert('success', 'Welcome back '+res.user.name, 'success', true)
        }).catch(function(err) {
          alert('failed', 'invalid username/password', 'error', true)
        })
    }
});
