'use strict';

angular.module('psJwtApp')
  .controller('LogoutCtrl', function (helpers,$scope, $auth, authToken) {
    
    helpers.authenticated('login')

    $scope.logout  = function() {
      authToken.removeToken()
    }

    $scope.$watch($scope.logout, $scope.logout)

    helpers.redirect('home', 100)
  });
