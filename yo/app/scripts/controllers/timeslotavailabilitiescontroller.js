/**
 * Created by SantiHijazo on 09/12/2015.
 */
'use strict';

angular.module('webappApp')
  .controller('TimeSlotAvailabilitiesController', function($scope, $uibModalInstance, participantAvailabilityId,
                                                           TimeSlotAvailability) {

    $scope.participantAvailabilityId = participantAvailabilityId;


    $scope.ok = function () {
      var timeSlotAvailability = new TimeSlotAvailability();
      //timeSlotAvailability.availability = $scope             //timeSlot.dateTime = $scope.time.toJSON();
      timeSlotAvailability.participant = "participantAvailabilities/" + participantAvailabilityId;

      timeSlotAvailability.$save(timeSlotAvailability, function(timeSlotAvailabilityResp){
        $scope.responseTimeSlotAvailability = timeSlotAvailabilityResp;
        $uibModalInstance.close($scope.responseTimeSlotAvailability);
      });
    }
  });
