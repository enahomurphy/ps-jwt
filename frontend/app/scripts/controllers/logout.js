'use strict';

/**
 * @ngdoc function
 * @name psJwtApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the psJwtApp
 */
angular.module('psJwtApp')
  .controller('LogoutCtrl', function ($state, authToken) {
    authToken.removeToken()
    $state.go('home')
  });