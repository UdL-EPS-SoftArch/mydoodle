'use strict';

angular.module('webappApp')
  .controller('ParticipantAddController', function ($scope, $stateParams, MeetingProposal, ParticipantAvailability) {

    $scope.meetingId = $stateParams.id;
    $scope.adminKey = "";
    $scope.emails=[];


    $scope.participants = [];

    $scope.addKey = function () {
      MeetingProposal.get({id: $scope.meetingId, key: $scope.adminKey})
        .$promise.then(function (meeting) {
          $scope.meeting = meeting;
          $scope.finalAdminKey = $scope.adminKey;
          $scope.adminKey = '';
          $scope.participantsSaved=$scope.meeting.availabilities;
        });
    }

    $scope.addParticipant = function () {
      if ($scope.participant != "" && $scope.emails.indexOf($scope.participant.participant) == -1 && $scope.finalAdminKey != null) {
        $scope.participants.push($scope.participant);
        $scope.emails.push($scope.participant.participant);
      }
      $scope.participant = '';
    };

    $scope.removeParticipant = function (index) {
      $scope.participants.splice(index, 1);
    };

    $scope.submitParticipants = function () {
      for(var i=0;i<$scope.participants.length;i++) {
        ParticipantAvailability.save($scope.participants[i]).$promise.then(function (participant) {
          //alert(participant.participant);
        });
      }

      /*MeetingProposal.get({id: $scope.meetingId, key: $scope.finalAdminKey})
        .$promise.then(function (meeting) {
          $scope.meeting = meeting;
          $scope.participantsSaved=$scope.meeting.availabilities;
        });*/

      $scope.participants = [];
      $scope.emails = [];
    };
  });
