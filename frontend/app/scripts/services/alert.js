'use strict';

/**
 * @ngdoc service
 * @name psJwtApp.alert
 * @description
 * # alert
 * Service in the psJwtApp.
 */
angular.module('psJwtApp')
  .service('alert', function ($rootScope, $timeout) {
    return function(title, message, type, show, timeout) {
      var alertTimeout;
        $rootScope.alert = {
          hasBeenHidden: true,
          title: title,
          message: message,
          type: type,
          show: true
        }
        var alertTimeout =  $timeout(function(){
          $rootScope.alert.show = false
        }, timeout || 2000)
    } 
  });
