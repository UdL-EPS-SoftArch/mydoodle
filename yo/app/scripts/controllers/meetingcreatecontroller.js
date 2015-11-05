'use strict';

angular.module('webappApp')
  .controller('MeetingCreateController', function ($scope, MeetingProposal) {
        $scope.meeting = {};
        $scope.created = false;
        $scope.creating = false;
        $scope.adminlink = "";
        $scope.addMeeting = function () {
            $scope.creating = true;
            MeetingProposal.save($scope.meeting).$promise.then(function (meeting) {
                $scope.creating = false;
                $scope.created = true;
                $scope.adminlink = meeting.adminKey;
            });
            $scope.meeting = {};
            $scope.createform.$setPristine();
            $scope.createform.$setValidity();
            $scope.createform.$setUntouched();
            //$scope.apply();
        }
  });
