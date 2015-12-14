'use strict';

angular.module('webappApp')
    .controller('MeetingCreateController', function ($scope, $state, $location, MeetingProposal) {
        $scope.location = $location;
        $scope.meeting = {};
        $scope.createState = 0; // 0->Not created 1->Creating 2->Created -1 -> ERROR
        $scope.adminlink = "";
        $scope.id = "";

        $scope.addMeeting = function () {
            $scope.createState = 1;
            MeetingProposal.save($scope.meeting).$promise.then(function (meeting) {
                $scope.createState = 2;
                $scope.adminlink = meeting.adminKey;
                $scope.id = meeting.id;
            }).catch(function () {
                $scope.createState = -1;
            });
            $scope.meeting = {};
            $scope.createform.$setPristine();
        };

        $scope.reset = function () {
          $scope.createState = 0;
          $state.go("newMeeting");
        };

        $scope.goToAddTimeSlots = function () {
          $location.url("/meetings/" + $scope.id + "?key=" +  $scope.adminlink);
        };
    });

