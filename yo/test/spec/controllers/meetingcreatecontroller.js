'use strict';

describe('Controller: MeetingCreateController', function () {

  // load the controller's module
  beforeEach(module('webappApp'));

  var MeetingCreateController,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MeetingCreateController = $controller('MeetingCreateController', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should initialize empty meeting', function () {
    expect(scope.meeting).toEqual({});
  });
});
