/**
 * Created by xavics on 26/10/2015.
 */
'use strict';
/**
 * @ngdoc function
 * @name webappApp.controller:MeetingviewcontrollerCtrl
 * @description
 * # MeetingviewcontrollerCtrl
 * Controller of the webappApp
 */
angular.module('webappApp')
  .controller('MeetingViewController', function($scope, $stateParams, MeetingProposal) {
    $scope.key = $stateParams.key;
    $scope.meetingId = $stateParams.id;
    MeetingProposal.query($stateParams.id, $stateParams.key)
      .$promise.then(function (meeting) {
        $scope.meeting = meeting;
      });
  });
