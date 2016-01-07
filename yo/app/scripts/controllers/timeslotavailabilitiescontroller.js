/**
 * Created by SantiHijazo on 09/12/2015.
 */
'use strict';

angular.module('webappApp')
  .controller('TimeSlotAvailabilitiesController', function($scope, $uibModalInstance, participantAvailabilityId,
                                                           TimeSlotAvailability, $stateParams,  TimeSlots ) {

    $scope.meetingAvailability = TimeSlots.searchbymeeting

    participantAvailabilityId.query({id:$stateParams.id })
      .promise.then(function (participant){
        $scope.participant = participant;
        $scope.meetingAvailability = TimeSlots.searchbymeeting(participant.meeting.id)
    });
    
    //// aixo encara no
    $scope.ok = function () {
      var timeSlotAvailability = new TimeSlotAvailability();
      timeSlotAvailability.participant = "participantAvailabilities/" + participantAvailabilityId;

      timeSlotAvailability.$save(timeSlotAvailability, function(timeSlotAvailabilityResp){
        $scope.responseTimeSlotAvailability = timeSlotAvailabilityResp;
        $uibModalInstance.close($scope.responseTimeSlotAvailability);
      });
    }
  });
