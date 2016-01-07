/**
 * Created by Valentina Menabue on 31/12/2015.
 */
angular.module('webappApp')
  .controller('ParticipantDeleteController', function ($scope, $state, $stateParams, ParticipantAvailability, MeetingProposal,  $uibModal) {

    $scope.participantsdeleted = [];
    $scope.participants = [];
    $scope.finalAdminKey = $stateParams.key;
    $scope.meetingId = $stateParams.id;

    $scope.selected = [];

    $scope.deleteParticipant = function (index) {
      $scope.participantsdeleted.push($scope.availabilities.splice(index, 1)[0]);
    };

    $scope.submitParticipants = function () {
      for (var i = 0; i < $scope.participantsdeleted.length; i++)
        ParticipantAvailability.delete({'id': $scope.participantsdeleted[i].id});
    };

    MeetingProposal.query({id: $stateParams.id, key: $stateParams.key})
      .$promise.then(function (meeting) {
        $scope.availabilities = meeting.availabilities;
      });

  });
