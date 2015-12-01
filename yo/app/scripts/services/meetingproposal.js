'use strict';

/**
 * @ngdoc service
 * @name webappApp.MeetingProposal
 * @description
 * # MeetingProposal
 * Factory in the webappApp.
 */
angular.module('webappApp')
  .factory('MeetingProposal', ['$resource', function($resource) {
    return $resource('/api/meetingProposals/:id', null,
      {
        'query': { method:'GET', isArray: false },
        'update': { method:'PUT' }
      });
  }]);
