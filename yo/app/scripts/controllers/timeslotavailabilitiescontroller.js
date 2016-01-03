/**
 * Created by SantiHijazo on 09/12/2015.
 */
'use strict';

angular.module('webappApp')
  .controller('TimeSlotAvailabilitiesController', function($scope, $uibModalInstance, participantAvailability,
                                                           TimeSlotAvailability, TimeSlots ) {

    $scope.participantAvailabilityId = participantAvailability;
    $scope.TimeSlotAvailabilityId = TimeSlotAvailability;
    $scope.TimeSlotsId = TimeSlots;

    $scope.participantAvailabilityId.slotAvailabilities = "timeSlots/" + $scope.TimeSlotsId;
    $scope.participantAvailabilityId.slotAvailabilities.timeSlotAvailabilities = "timeSlotsAvailabilities/"
                                                                                        +$scope.TimeSlotAvailabilityId;

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
