'use strict';


angular.module('webappApp')
  .factory('ParticipantAvailability', ['$resource', function($resource) {
    return $resource('/api/participantAvailability/:id', null,
      {
        'query': { method:'GET', isArray: false },
        'update': { method:'PUT' }
      });
  }]);
/**
 * Created by eloi on 29/10/2015.
 */
