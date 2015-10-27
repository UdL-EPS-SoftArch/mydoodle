'use strict';

angular.module('webappApp')
  .controller('MeetingCreateController', function ($scope, MeetingProposal) {
        $scope.meeting = {};
        $scope.addMeeting = function () {
            MeetingProposal.save($scope.meeting).$promise.then(function (meeting) {
               alert(meeting.adminKey);
            });
            $scope.meeting = {};
            $scope.createform.$setPristine();
            $scope.createform.$setValidity();
            $scope.createform.$setUntouched();
            //$scope.apply();
        }        
  });
