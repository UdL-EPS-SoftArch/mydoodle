'use strict';


angular.module('webappApp')
  .factory('ParticipantAvailability', ['$resource', function($resource) {
    return $resource('http://localhost:8080/api/participantAvailabilities/:id', null,
      {
        'query': { method:'GET', isArray: false },
        'update': { method:'PUT' }
      });
  }]);
