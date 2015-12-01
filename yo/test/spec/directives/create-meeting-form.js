'use strict';

describe('Directive: createMeetingForm', function () {

  // load the directive's module
  beforeEach(module('webappApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope, $templateCache, $httpBackend) {
    scope = $rootScope.$new();
    $httpBackend.expectGET('resources/locale-es.json').respond('{}');
    $templateCache.put('views/home.html', '');
    $templateCache.put('views/directive_views/create-meeting-form.html', 'this is the createMeetingForm directive');
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<create-meeting-form></create-meeting-form>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the createMeetingForm directive');
  }));
});
