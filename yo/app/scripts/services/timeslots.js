/**
 * Created by cobos on 13/11/2015.
 */
'use strict';

/**
 * @ngdoc service
 * @name webappApp.MeetingProposal
 * @description
 * # MeetingProposal
 * Factory in the webappApp.
 */
angular.module('webappApp')
  .factory('TimeSlots', ['$resource', function($resource) {
        return $resource('http://localhost:8080/api/timeSlots/:id', null,
          {
            //'query': { method:'GET', isArray: false },
            'update': { method:'PUT',
              headers: {
                'Content-Type': 'application/json'
              }
            },
            'save': { method:'POST' }
          });
  }]);
