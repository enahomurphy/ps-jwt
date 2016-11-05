'use strict';


angular.module('psJwtApp')
  .controller('LoginCtrl', function ($scope, alert, $auth, helpers) {

    //checks if user is already logged in 
    helpers.authenticated()

  

    $scope.submit = function () {
      $auth.login({
        email:  $scope.email,
        password:  $scope.password
      }).then(function (res) {
          alert('success', 'Welcome back ' + res.data.user.name, 'success', true)
            helpers.redirect('jobs')
        })
        .catch(function (err) {
          alert('failed', 'invalid username/password', 'error', true)
        })
    }

    $scope.authenticate = function (provider) {
      $auth.authenticate(provider).then(function (res) {
        console.log(res)
        alert('success', 'Welcome back ' + res.data.user.name, 'success', true)
        helpers.redirect('jobs')
      }).catch(function (err) {
        alert('failed', 'invalid username/password', 'error', true)
      })
    }
  });
