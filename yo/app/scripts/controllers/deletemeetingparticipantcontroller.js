/**
 * Created by Valentina Menabue on 31/12/2015.
 */
angular.module('webappApp')
  .controller('ParticipantDeleteController', function ($scope, $state, $stateParams, ParticipantAvailability, MeetingProposal,  $uibModal) {

    $scope.participantsdeleted = [];
    $scope.participants = [];
    $scope.finalAdminKey = $stateParams.key;
    $scope.meetingId = $stateParams.id;

    $scope.participant = new ParticipantAvailability();
    $scope.participant.meeting = "/meetingProposals/" + $scope.meetingId;
    $scope.selected = [];

    $scope.deleteParticipant = function (index) {
      $scope.participantsdeleted.push($scope.availabilities.splice(index, 1));


    };



    $scope.submitParticipants = function () {
      for (var i = 0; i < $scope.participantsdeleted.length; i++) {
        alert($scope.participantsdeleted[i]);
        $scope.participantsdeleted[i].$remove;

      }};
    MeetingProposal.query({id: $stateParams.id, key: $stateParams.key})
      .$promise.then(function (meeting) {
        $scope.availabilities = meeting.availabilities;

      });;



  });
