'use strict';

describe('Controller: MeetingsListController', function () {

  var MeetingsListController,
    mockMeetingProposal, queryDeferred,
    $q, $rootScope, $scope, $httpBackend,
    $translate, $translateStaticFilesLoader, $translationCache;

  // load the controller's module
  beforeEach(module('webappApp'));

  beforeEach(inject(function(_$q_, _$rootScope_, _$translate_, _$httpBackend_, _$translateStaticFilesLoader_, _$translationCache_) {
    $q = _$q_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
    $translate = _$translate_;
    $translateStaticFilesLoader = _$translateStaticFilesLoader_;
    $translationCache = _$translationCache_;
    $httpBackend.when('GET', 'resources/locale-es_ES.json').respond({HEADER: 'Ueberschrift'});
    $httpBackend.expectGET("views/meetings.html").respond("<div>mock meetings.html</div>");
  }));

  beforeEach(inject(function ($controller) {
    $scope = $rootScope.$new();

    mockMeetingProposal = {
      query: function() {
        queryDeferred = $q.defer();
        return {$promise: queryDeferred.promise};
      }
    };

    spyOn(mockMeetingProposal, 'query').and.callThrough();

    MeetingsListController = $controller('MeetingsListController', {
      '$scope': $scope,
      'MeetingProposal': mockMeetingProposal
    });
  }));

  describe('MeetingProposal.query', function () {

    var mockMeetingProposalResponse = {
      "_embeddedItems": [
        {
          "title": "Test",
          "description": "None",
          "organizer": "test@test.org",
          "slotDuration": 1,
          "id": "df710e46-1830-4896-8ee2-2d2eadf6212e",
          "_links": {
            "self": {
              "href": "http://localhost:8080/api/meetingProposals/df710e46-1830-4896-8ee2-2d2eadf6212e"
            },
            "meetingProposal": {
              "href": "http://localhost:8080/api/meetingProposals/df710e46-1830-4896-8ee2-2d2eadf6212e{?projection}",
              "templated": true
            },
            "availabilities": {
              "href": "http://localhost:8080/api/meetingProposals/df710e46-1830-4896-8ee2-2d2eadf6212e/availabilities"
            },
            "slots": {
              "href": "http://localhost:8080/api/meetingProposals/df710e46-1830-4896-8ee2-2d2eadf6212e/slots"
            }
          }
        }
      ]
    };

    beforeEach(function() {
      queryDeferred.resolve(mockMeetingProposalResponse);
      $rootScope.$apply();
    });

    it('should query MeetingProposal service', function () {
      expect(mockMeetingProposal.query).toHaveBeenCalled();
    });

    it('should set the response from the MeetinProposal.query to $scope.meetings', function () {
      expect($scope.meetings).toEqual(mockMeetingProposalResponse._embeddedItems);
    });

  });
});
