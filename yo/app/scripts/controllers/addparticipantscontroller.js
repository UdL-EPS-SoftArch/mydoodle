'use strict';

angular.module('webappApp')
    .controller('ParticipantAddController', function ($scope, $state, $stateParams, ParticipantAvailability, MeetingProposal,  $uibModal) {
        $scope.participants = [];
        $scope.finalAdminKey = $stateParams.key;
        $scope.meetingId = $stateParams.id;

        $scope.participant = new ParticipantAvailability();
        $scope.participant.meeting = "/meetingProposals/" + $scope.meetingId;

        $scope.addParticipant = function () {
            var found = false;
            if ($scope.participant.participant != "") {
                for (var i = 0; i < $scope.participants.length; i++) {
                    if ($scope.participants[i].participant == $scope.participant.participant) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    for (var i = 0; i < $scope.availabilities.length; i++) {
                        if ($scope.availabilities[i].participant == $scope.participant.participant) {
                            found = true;
                            break;
                        }
                    }
                }
            } else {
                found = true;
            }
            if (!found) {
                $scope.participants.push($scope.participant);
            }
            $scope.participant = new ParticipantAvailability();
            $scope.participant.meeting = "/meetingProposals/" + $scope.meetingId;
        };

        $scope.removeParticipant = function (index) {
            $scope.participants.splice(index, 1);
        };

        $scope.submitParticipants = function () {
           for (var i = 0; i < $scope.participants.length; i++) {
                ParticipantAvailability.save($scope.participants[i]).
                    $promise.then(function (participant) {
                        $scope.participants = $scope.participants.filter(function (item) {
                            return item.participant !== participant.participant;
                        })
                    });
            }
                    $state.go('viewMeeting',{id: $scope.meetingId, key: $scope.finalAdminKey});


        };

        MeetingProposal.query({id: $stateParams.id, key: $stateParams.key})
            .$promise.then(function (meeting) {
                $scope.availabilities = meeting.availabilities;
                $scope.is_loaded = true;
            });




    });
