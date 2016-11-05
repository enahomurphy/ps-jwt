'use strict';


angular.module('psJwtApp')
  .factory('authToken', function ($window, $timeout) {
    var cachedToken = null;
    var setToken = function (token) {
      cachedToken = token;
      $window.localStorage.setItem('satellizer_token', token);
    }

    var getToken = function () {
      if (!cachedToken)
        cachedToken = $window.localStorage.getItem('satellizer_token');
      return cachedToken;
    }

    var isAuthenticated = function () {
      return !!getToken();
    }

    var removeToken = function () {
      cachedToken = null;
      $window.localStorage.removeItem('satellizer_token');
    }

   

    return {
      setToken: setToken,
      getToken: getToken,
      isAuthenticated: isAuthenticated,
      removeToken: removeToken,
    }
  });
