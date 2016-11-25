'use strict';
var psJwtApp;
(function () {

  psJwtApp = angular
    .module('psJwtApp', ['ui.router', 'satellizer'])
    .config(function ($authProvider, APP_URL) {
      
      $authProvider.google({
        clientId: '57578836164-bhv5uruahba3fls072h31s6l0khqof8v.apps.googleusercontent.com',
        url: APP_URL + 'auth/google',
        redirectUri: 'http://localhost:9000'
      });

      $authProvider.facebook({
        clientId: '219559031812343',
        url: APP_URL + 'auth/facebook',
      });

      $authProvider.loginUrl = APP_URL + 'login';
      $authProvider.signupUrl = APP_URL + 'register';
    })
    // .run(function ($window) {
    //   //   var params = $window.location.search.substring(1);
    //   //  //checks if window is opened and its location is same as the main window
    //   //   if(params && $window.opener && $window.opener.location.origin === $window.location.origin){
    //   //     var pair = params.split('=')
    //   //     var code = decodeURIComponent(pair[1])
    //   //     //post code form popup to maim window
    //   //     $window.opener.postMessage(code, $window.location.origin)

  //   //   }

  // })
})()
