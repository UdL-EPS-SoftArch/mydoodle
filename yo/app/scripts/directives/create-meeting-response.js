'use strict';

/**
 * @ngdoc directive
 * @name webappApp.directive:createMeetingResponse
 * @description
 * # createMeetingResponse
 */
angular.module('webappApp')
  .directive('createMeetingResponse', function () {
    return {
      templateUrl: 'views/directive_views/create-meeting-response.html',
      restrict: 'E'
    };
  });
