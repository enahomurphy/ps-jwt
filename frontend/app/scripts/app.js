'use strict';
var psJwtApp;
(function () {
 
  psJwtApp = angular
    .module('psJwtApp', ['ui.router', 'satellizer'])
    .run(function($window){
      var params = $window.location.search.substring(1);

     //checks if window is opened and its location is same as the main window
      if(params && $window.opener && $window.opener.location.origin === $window.location.origin){
        var pair = params.split('=')
        var code = decodeURIComponent(pair[1])
        //post code form popup to maim window
        $window.opener.postMessage(code, $window.location.origin)

      }

    })
})()