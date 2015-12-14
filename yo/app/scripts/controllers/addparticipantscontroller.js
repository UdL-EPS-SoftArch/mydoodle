'use strict';

angular.module('webappApp')
  .controller('ParticipantAddController', function ($scope, $state, $stateParams, ParticipantAvailability) {
    $scope.participants=[];
    $scope.finalAdminKey = $stateParams.key;
    $scope.meetingId = $stateParams.id;

    $scope.participant = new ParticipantAvailability();
    $scope.participant.meeting = "/meetingProposals/"+$scope.meetingId;

    $scope.addParticipant = function () {
      if($scope.participants.indexOf($scope.participant) === -1){
        $scope.participants.push($scope.participant);
      }
      $scope.participant = new ParticipantAvailability();
      $scope.participant.meeting = "/meetingProposals/"+$scope.meetingId;
    };

    $scope.removeParticipant = function(index){
      $scope.participants.splice(index,1);
    };

    $scope.submitParticipants = function(){
      for(var i=0;i<$scope.participants.length;i++) {
        ParticipantAvailability.save($scope.participants[i]).
        $promise.then(function (participant) {
          $scope.participants = $scope.participants.filter(function (item) {
            return item.participant !== participant.participant;
          });
        });
      }
    };
  });
