'use strict';

/**
 * @ngdoc service
 * @name psJwtApp.authToken
 * @description
 * # authToken
 * Factory in the psJwtApp.
 */
angular.module('psJwtApp')
  .factory('authToken', function ($window) {
      var cachedToken = null;
      var setToken = function (token) {
        cachedToken  = token;
        $window.localStorage.setItem('token', cached);
      }

      var getToken = function() {
        if(!cachedToken)
            cachedToken = $window.localStorage.getItem('token');
        return cachedToken
      }

      var isAuthenticated = function() {
        return !!getToken()
      }

      return {
        setToken: setToken,
        getToken: getToken,
        isAuthenticated: isAuthenticated
      }
  });
