'use strict';

/**
 * @ngdoc directive
 * @name psJwtApp.directive:sameAs
 * @description
 * # sameAs
 */
angular.module('psJwtApp')
  .directive('validateMatch', function () {
    return {
      require: 'ngModel',
      restrict: 'A',
      scope: {
        pAgainst: '='
      },
      link: function postLink(scope, element, attrs, ngCtrl) {
        console.log(ngCtrl)
          var against = angular.element(document.getElementsByName(attrs.validateMatch))
          function validateAgainst(value) {
            //console.log(value, against.val())
            var isValid = (value === against.val())
            ngCtrl.$setValidity('equal', isValid)
            return isValid ? value : undefined
          }
          ngCtrl.$formatters.push(validateAgainst);
          ngCtrl.$parsers.push(validateAgainst)



      }
    };
  });
