'use strict';


angular.module('psJwtApp')
  .service('helpers', function ($state, $timeout, authToken) {

    var redirect = function (href, time) {
      $timeout(function () {
        $state.go(href)
      }, time || 3000)
    }

    var authenticated = function(location) {
      if (authToken.isAuthenticated())
            redirect(location || 'jobs' , 1)
    }


    return {
      redirect: redirect,
      authenticated: authenticated
    }
  });
