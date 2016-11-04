'use strict';


angular.module('psJwtApp')
  .service('auth', function ($http, APP_URL, authToken, $state, $window) {

    function login (email, password) {
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

    function googleAuth () {
      var url = 'https://accounts.google.com/o/oauth2/v2/auth?',
          left = ($window.innerWidth - 500 ) / 2,
          right = ($window.outerHeight - 500 ) / 2,
          options= 'width=500,height=500, left='+left+',top='+right,
          parameter = 'scope=email%20profile&'
          parameter += 'response_type=code&',
          parameter +=  'redirect_uri=http://localhost:9000&',
          parameter +=  'client_id=57578836164-6b7l5tsqtea2aluh5bksp4g6rtse9l6t.apps.googleusercontent.com'  


          var popup =  $window.open(url+parameter, '' , options)
          popup.focus()
          $window.addEventListener('message', function(event) {
              if(event.origin === $window.location.origin){
                console.log(event.data)
                    var params = {
                      code : event.data,
                      client_id	: '57578836164-6b7l5tsqtea2aluh5bksp4g6rtse9l6t.apps.googleusercontent.com',
                      redirect_uri: 'http://localhost:9000',
                      grant_type: 'authorization_code',
                    }

                    $http.post(APP_URL+'auth/google', params)
                      .then(function(err) {
                        console.log(err)
                      }, function (err) { 
                          console.log(err)
                      })
              }
          })
    }
    
    return {
      login: login,
      register: register,
      googleAuth: googleAuth
    }

    // googleId = 57578836164-seldhvu7vlur1rhm84h30oj7f76m0vup.apps.googleusercontent.com
    // googleSecrete : m1jXRDEhfrBFpeUpfpER2rfo
});
