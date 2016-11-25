'use strict';

describe('Controller: VerifyEmailCtrl', function () {

  // load the controller's module
  beforeEach(module('psJwtApp'));

  var VerifyEmailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    VerifyEmailCtrl = $controller('VerifyEmailCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(VerifyEmailCtrl.awesomeThings.length).toBe(3);
  });
});
