/**
 * Created by SantiHijazo on 09/12/2015.
 */
'use strict';

angular.module('webappApp')
  .controller('TimeSlotAvailabilitiesController', function($scope, $uibModalInstance, ParticipantAvailability,
                                                           TimeSlotAvailability, $stateParams,  TimeSlots ) {

    function findWithAttr(array, attr, value) {
      for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
          return i;
        }
      }
      return -1;
    }
    ParticipantAvailability.query({id:$stateParams.id })
      .promise.then(function (participant){
        $scope.participant = participant;
        TimeSlots.searchbymeeting({ meetingid: participant.meeting.id}).
          promise.then(function (meetingTimeSlots){
            makeSlotsTree(meetingTimeSlots)
          })

    });


    //// aixo encara no
    function makeSlotsTree(meetingTimeSlots){
      var slots = meetingTimeSlots;
      slots.sort(function(a,b){
        return new Date(a.dateTime) - new Date(b.dateTime);
      });
      for(var x=0; x<slots.length; x++){
        var timeSlotAvailability = new TimeSlotAvailability();
        timeSlotAvailability.availability = "NO";

        timeSlotAvailability.participant = "participantAvailabilities/" + $scope.participant.id;
        timeSlotAvailability.timeSlot = "timeSlots/"+ slots[x].id;
        var date = new Date(slots[x].dateTime);
        var year = date.getFullYear();
        var month = date.getMonth();
        var day = date.getDate();
        var hour = date.getHours() + ":" + ((date.getMinutes()<10) ? '0' + date.getMinutes() : date.getMinutes());
        var final_hour = date.getHours()+ meeting.slotDuration + ":" + ((date.getMinutes()<10) ? '0' + date.getMinutes() : date.getMinutes());
        if($scope.slotsCalendar.years) {
          var index_year = findWithAttr($scope.slotsCalendar.years, 'value', year);
          if(index_year === -1){
            $scope.slotsCalendar.years.push({'cellspace': 1, 'value': year, 'months': [{'cellspace': 1, 'value': month, 'days': [{'cellspace': 1, 'value': day, 'hours': [{'cellspace': 1, 'value': hour, 'final': final_hour}]}]}]});
          }else{
            var index_month = findWithAttr($scope.slotsCalendar.years[index_year].months, 'value', month);
            if(index_month === -1){
              $scope.slotsCalendar.years[index_year].months.push({'cellspace': 1, 'value': month, 'days': [{'cellspace': 1, 'value': day, 'hours': [{'cellspace': 1, 'value': hour, 'final': final_hour}]}]});
              $scope.slotsCalendar.years[index_year].cellspace += 1;
            }else{
              var index_day = findWithAttr($scope.slotsCalendar.years[index_year].months[index_month].days, 'value', day);
              if(index_day === -1){
                $scope.slotsCalendar.years[index_year].months[index_month].days.push({'cellspace': 1, 'value': day, 'hours': [{'cellspace': 1, 'value': hour, 'final': final_hour}]});
                $scope.slotsCalendar.years[index_year].cellspace += 1;
                $scope.slotsCalendar.years[index_year].months[index_month].cellspace += 1;
              }else{
                var index_hour = findWithAttr($scope.slotsCalendar.years[index_year].months[index_month].days[index_day].hours, 'value', hour);
                if(index_hour === -1){
                  $scope.slotsCalendar.years[index_year].months[index_month].days[index_day].hours.push({'cellspace': 1, 'value': hour, 'final': final_hour, 'Availability': timeSlotAvailability});
                  $scope.slotsCalendar.years[index_year].cellspace += 1;
                  $scope.slotsCalendar.years[index_year].months[index_month].cellspace += 1;
                  $scope.slotsCalendar.years[index_year].months[index_month].days[index_day].cellspace += 1;
                }else{
                  //No s'haurie de poder donar la situacio(Dates repetides!!)
                }
              }
            }
          }
        }else{
          $scope.slotsCalendar.years = [{'cellspace': 1, 'value': year, 'months': [{'cellspace': 1, 'value': month, 'days': [{ 'cellspace': 1,'value': day, 'hours': [{'cellspace': 1, 'value': hour, 'final': final_hour}]}]}]}];
        }
      }
    }

    $scope.ok = function () {
      var timeSlotAvailability = new TimeSlotAvailability();

      timeSlotAvailability.participant = "participantAvailabilities/" + participantAvailabilityId;

      timeSlotAvailability.$save(timeSlotAvailability, function(timeSlotAvailabilityResp){
        $scope.responseTimeSlotAvailability = timeSlotAvailabilityResp;
        $uibModalInstance.close($scope.responseTimeSlotAvailability);
      });
    }
  });
