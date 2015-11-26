'use strict';

describe('Directive: createMeetingResponse', function () {

  // load the directive's module
  beforeEach(module('webappApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<create-meeting-response></create-meeting-response>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the createMeetingResponse directive');
  }));
});
