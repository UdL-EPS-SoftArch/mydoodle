/**
 * Created by Valentina Menabue on 31/12/2015.
 */
angular.module('webappApp')
  .controller('ParticipantDeleteController', function ($scope, $state, $stateParams, ParticipantAvailability, MeetingProposal,  $uibModal) {
    $scope.participants = [];
    $scope.finalAdminKey = $stateParams.key;
    $scope.meetingId = $stateParams.id;

    $scope.participant = new ParticipantAvailability();
    $scope.participant.meeting = "/meetingProposals/" + $scope.meetingId;
    $scope.selected = [];

    $scope.deleteParticipant = function (index) {
      $scope.availabilities.splice(index, 1);
    };

    MeetingProposal.query({id: $stateParams.id, key: $stateParams.key})
      .$promise.then(function (meeting) {
        $scope.availabilities = meeting.availabilities;

      });



  });
