'use strict';

describe('Controller: MeetingcreatecontrollerCtrl', function () {

  // load the controller's module
  beforeEach(module('webappApp'));

  var MeetingcreatecontrollerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MeetingcreatecontrollerCtrl = $controller('MeetingcreatecontrollerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MeetingcreatecontrollerCtrl.awesomeThings.length).toBe(3);
  });
});
