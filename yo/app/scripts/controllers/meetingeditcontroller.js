/**
 * Created by Valentina Menabue on 10/12/2015.
 */
'use strict';

angular.module('webappApp')
  .controller('MeetingEditController', function ($scope, $location, MeetingProposal) {
    $scope.location = $location;
    $scope.meeting = {};
    $scope.editState = 0; // 0->Not edited 1->editing 2->edited -1 -> ERROR
    $scope.adminlink = "";
    $scope.id = "";

    $scope.editMeeting = function () {
      $scope.editState = 1;
      MeetingProposal.save($scope.meeting).$promise.then(function (meeting) {
        $scope.editState = 2;
        $scope.adminlink = meeting.adminKey;
        $scope.id = meeting.id;
      }).catch(function (error) {
        $scope.editState = -1;
      });
      $scope.meeting = {};
      $scope.editform.$setPristine();
    };


    MeetingProposal.query({id: $stateParams.id, key: $stateParams.key})
      .$promise.then(function (meeting) {
        $scope.meeting = meeting;
        makeSlotsTree(meeting.slots);
        $scope.is_loaded = true;
      });

    $scope.reset = function () {
      $scope.editState = 0;
      $state.go("editMeeting");
    }
  });

