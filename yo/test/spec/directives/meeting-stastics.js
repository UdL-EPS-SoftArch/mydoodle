'use strict';

describe('Directive: meetingStastics', function () {

  // load the directive's module
  beforeEach(module('webappApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope, $templateCache, $httpBackend) {
    scope = $rootScope.$new();
    $httpBackend.expectGET('resources/locale-en.json').respond('{}');
    $templateCache.put('views/home.html', '');
    $templateCache.put('views/directive_views/meeting-statistics.html', 'this is the meetingStatistics directive');
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<meeting-statistics></meeting-statistics>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the meetingStatistics directive');
  }));
});
