'use strict';

angular.module('webappApp')
    .controller('MeetingCreateController', function ($scope, $location, MeetingProposal) {
        $scope.location = $location;
        $scope.meeting = {};
        $scope.created = true;
        $scope.creating = false;
        $scope.adminlink = "";
        $scope.id = "";

        $scope.addMeeting = function () {
            $scope.creating = true;
            MeetingProposal.save($scope.meeting).$promise.then(function (meeting) {
                $scope.creating = false;
                $scope.created = true;
                $scope.adminlink = meeting.adminKey;
                $scope.id = meeting.id;
            });
            $scope.meeting = {};
            $scope.createform.$setPristine();
            $scope.createform.$setValidity();
            $scope.createform.$setUntouched();
        };
    });

