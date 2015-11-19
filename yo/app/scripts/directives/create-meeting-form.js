'use strict';

/**
 * @ngdoc directive
 * @name webappApp.directive:createMeetingForm
 * @description
 * # createMeetingForm
 */
angular.module('webappApp')
  .directive('createMeetingForm', function () {
    return {
      templateUrl: 'views/directive_views/create-meeting-form.html',
      restrict: 'E'
    };
  });
