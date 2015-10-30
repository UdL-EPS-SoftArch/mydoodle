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
    return{
      query: function(id, key){
        return $resource('http://localhost:8080/api/meetingProposals/:id', {id: id, key: key},
          {
            'query': { method:'GET', isArray: false },
            'update': { method:'PUT' }
          }).query();
      }
  }
}]);
