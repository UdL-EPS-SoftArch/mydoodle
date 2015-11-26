'use strict';

angular.module('webappApp')
  .controller('ParticipantAddController', function ($scope,$stateParams){//,MeetingProposal,ParticipantAvailability) {

    $scope.meetingId = $stateParams.id;

   /* MeetingProposal.query({id:$scope.meetingId,key:$scope.adminKey})
      .$promise.then(function (meeting) {
        $scope.meeting = meeting._embeddedItems;
        $scope.title = $scope.meeting.title;
      });*/



    $scope.participants = [];

    $scope.addParticipant = function () {
      if ($scope.participants.indexOf($scope.participant) == -1) {
        $scope.participants.push($scope.participant);
      }
      $scope.participant = '';
    };
    $scope.removeParticipant = function (index) {
      $scope.participants.splice(index, 1);
    };

    $scope.submitParticipants = function () {
     /* for(i=0;i<$scope.participants.length;i++){
        ParticipantAvailability.save($scope.participants[i]).$promise.then(function (partcipants) {
          $scope.participants.splice(i,1);
        });
      }*/
      $scope.participants = [];
    };
  });
