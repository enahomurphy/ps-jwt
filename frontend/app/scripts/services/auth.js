'use strict';


angular.module('psJwtApp')
  .service('auth', function ($http, APP_URL, authToken) {

    function login(email, password) {
      var url = APP_URL + 'login'
      console.log(email, password)
      return $http.post(url, {email:email, password: password})
        .success(function (response) {
          authToken.setToken(response.token)
          //return response
        })
    }

    return {
      login: login
    }

  
});
