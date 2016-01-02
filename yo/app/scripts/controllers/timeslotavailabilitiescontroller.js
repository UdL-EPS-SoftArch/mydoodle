/**
 * Created by SantiHijazo on 09/12/2015.
 */
'use strict';

angular.module('webappApp')
  .controller('TimeSlotAvailabilitiesController', function($scope, $uibModalInstance, participantAvailability,
                                                           TimeSlotAvailability) {

    $scope.participantAvailabilityId = participantAvailability;


    $scope.ok = function () {
      var timeSlotAvailability = new TimeSlotAvailability();
      timeSlotAvailability.participant = "participantAvailabilities/" + participantAvailabilityId;

      timeSlotAvailability.$save(timeSlotAvailability, function(timeSlotAvailabilityResp){
        $scope.responseTimeSlotAvailability = timeSlotAvailabilityResp;
        $uibModalInstance.close($scope.responseTimeSlotAvailability);
      });
    }
  });
