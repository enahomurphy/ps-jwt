'use strict';
(function(){
    psJwtApp
    .config(function ($stateProvider)  {
      $stateProvider
        .state({
            'name' : 'home',
            'url': '/',
            'templateUrl': '../views/main.html'
        })
        .state({
            'name' : 'register',
            'url': '/register',
            'templateUrl': '../views/register.html'
        })
    });
})()
