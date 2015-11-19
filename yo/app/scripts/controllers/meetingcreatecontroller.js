'use strict';

angular.module('webappApp')
    .controller('MeetingCreateController', function ($scope, $location, MeetingProposal) {
        $scope.location = $location;
        $scope.meeting = {};
        $scope.createState = 0; // 0->Not created 1->Creating 2->Created
        $scope.adminlink = "";
        $scope.id = "";

        $scope.addMeeting = function () {
            $scope.createState = 1;
            MeetingProposal.save($scope.meeting).$promise.then(function (meeting) {
                $scope.createState = 2;
                $scope.adminlink = meeting.adminKey;
                $scope.id = meeting.id;
            });
            $scope.meeting = {};
            $scope.createform.$setPristine();
        };
    });

