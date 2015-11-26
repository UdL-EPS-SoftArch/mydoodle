'use strict';


angular.module('webappApp')
  .factory('ParticipantAvailability', ['$resource', function($resource) {
    return $resource('http://localhost:8080/api/participantAvailability/:id', null,
    //return $resource('http://localhost:8080/api/meetingProposals/:id/availabilities', null,
      {
        'query': { method:'GET', isArray: false },
        'update': { method:'PUT' }
      });
  }]);
