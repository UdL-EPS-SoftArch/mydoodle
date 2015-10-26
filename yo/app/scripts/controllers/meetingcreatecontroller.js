'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:MeetingcreatecontrollerCtrl
 * @description
 * # MeetingcreatecontrollerCtrl
 * Controller of the webappApp
 */
angular.module('webappApp')
  .controller('MeetingCreateCtrl', function ($scope, MeetingProposal) {
        $scope.meeting = {};
        $scope.addMeeting = function () {
            $scope.meeting = {};
        }        
  });
