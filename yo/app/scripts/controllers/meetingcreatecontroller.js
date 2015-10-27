'use strict';

angular.module('webappApp')
  .controller('MeetingCreateController', function ($scope, MeetingProposal) {
        $scope.meeting = {};
        $scope.addMeeting = function () {
            $scope.meeting = {};
            $scope.createform.$setPristine();
            $scope.createform.$setValidity();
            $scope.createform.$setUntouched();
            $scope.apply();
        }        
  });
