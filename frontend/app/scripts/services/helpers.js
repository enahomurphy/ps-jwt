'use strict';


angular.module('psJwtApp')
  .service('helpers', function ($state, $timeout, authToken) {

    var redirect = function (href, time) {
      $timeout(function () {
        $state.go(href)
      }, time || 3000)
    }

    var authenticated = function() {
      if (authToken.isAuthenticated())
            redirect('jobs', 1)
    }


    return {
      redirect: redirect,
      authenticated: authenticated
    }
  });
