'use strict';

/**
 * @ngdoc service
 * @name webappApp.TimeSlotAvailability
 * @description
 * # TimeSlotAvailability
 * Factory in the webappApp.
 */
angular.module('webappApp')
  .factory('TimeSlotAvailability', ['$resource', function($resource) {
    return $resource('/api/timeSlotsAvailabilities/:id', null,
      {
        'query': { method:'GET', isArray: false },
        'update': { method:'PUT' }
      });
  }]);
