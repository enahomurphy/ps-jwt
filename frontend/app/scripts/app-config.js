'use strict';

(function(){
    psJwtApp
    .constant('APP_URL', 'http://localhost:3000/')
    .config(function ($stateProvider, $httpProvider)  {
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
        });


        $httpProvider.interceptors.push('authInterceptor')

    });
})()
