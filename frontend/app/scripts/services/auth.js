'use strict';


angular.module('psJwtApp')
  .service('auth', function ($http, APP_URL, authToken, $state) {

    function login (email, password) {
      console.log(email, password)
      return $http.post(APP_URL + 'login', {email:email, password: password})
        .success(successFunc)
    }

    function register (data) {
        return $http.post(APP_URL+'register', data).success(successFunc)
    }

    function successFunc (response) {
      authToken.setToken(response.token)
      $state.go('home')
    }

    
    return {
      login: login,
      register: register
    }

  
});
