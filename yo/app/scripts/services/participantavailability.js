'use strict';


angular.module('webappApp')
  .factory('ParticipantAvailability', ['$resource', function($resource) {
    return $resource('/api/participantAvailabilities/:id', null,
      {
        'query': { method:'GET', isArray: false },
        'update': { method:'PUT' }
      });
  }]);
