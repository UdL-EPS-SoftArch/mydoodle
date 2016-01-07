'use strict';

/**
 * @ngdoc directive
 * @name webappApp.directive:meetingStatistics
 * @description
 * # meetingStastics
 */
angular.module('webappApp')
  .directive('meetingStatistics', function () {
    return {
      templateUrl: 'views/directive_views/meeting-statistics.html',
      restrict: 'E'
    };
  });
