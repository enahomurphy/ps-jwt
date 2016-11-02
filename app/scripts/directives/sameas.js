'use strict';

/**
 * @ngdoc directive
 * @name psJwtApp.directive:sameAs
 * @description
 * # sameAs
 */
angular.module('psJwtApp')
  .directive('sameAs', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the sameAs directive');
      }
    };
  });
