'use strict';

describe('Directive: createMeetingResponse', function () {

  // load the directive's module
  beforeEach(module('webappApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope, $templateCache, $httpBackend) {
    scope = $rootScope.$new();
    $httpBackend.expectGET('resources/locale-es_ES.json').respond('{}');
    $templateCache.put('views/meetings.html', '');
    $templateCache.put('views/directive_views/create-meeting-response.html', 'this is the createMeetingResponse directive');
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<create-meeting-response></create-meeting-response>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the createMeetingResponse directive');
  }));
});
