'use strict';

(function(){
    psJwtApp
    .constant('APP_URL', 'http://localhost:3000/')
    .config(function ($stateProvider, $locationProvider, $httpProvider)  {
    
      $stateProvider
        .state({
            'name' : 'home',
            'url': '/',
            'templateUrl': '../views/main.html'
        })
        .state({
            'name' : 'register',
            'url': '/register',
            'templateUrl': '../views/register.html',
            'controller': 'RegisterctrlCtrl'
        })
         .state({
            'name' : 'login',
            'url': '/login',
            'templateUrl': '../views/login.html',
            'controller': 'LoginCtrl'
        })
         .state({
            'name' : 'jobs',
            'url': '/jobs',
            'templateUrl': '../views/jobs.html',
            'controller': 'JobsCtrl'
        })
        .state({
            'name': 'logout',
            'url': '/logout',
            'controller': 'LogoutCtrl'
        })
        .state({
            'name': 'verify',
            'url': '/verify',
            'templateUrl': '../views/verify-email.html',
            'controller': 'VerifyEmailCtrl'
        })
        .state({
            'name': '404',
            'url': '/not-found',
            'templateUrl': '../404.html',
            'controller': 'VerifyEmailCtrl'
        })
        // $stateProvider.otherwise('404')
        $locationProvider.html5Mode(true);
        $httpProvider.interceptors.push('authInterceptor')

    })
    .run(function($browser) {
         $browser.baseHref = function () { return "/" };
    })
})()
