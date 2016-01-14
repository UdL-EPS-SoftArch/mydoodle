/**
 * Created by SantiHijazo on 09/12/2015.
 */
'use strict';

angular.module('webappApp')
  .controller('TimeSlotAvailabilitiesController', function($scope, $stateParams, $filter,
                                                     ParticipantAvailability, TimeSlotAvailability) {

    function findWithAttr(array, attr, value) {
      for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
          return i;
        }
      }
      return -1;
    }

    $scope.slotsCalendar = [];
    $scope.slotAvailabilities = [];

    ParticipantAvailability.query({ 'id': $stateParams.id })
      .$promise.then(function (participantAvailability) {
          $scope.participantAvailability = participantAvailability;
          $scope.timeSlots = participantAvailability.timeSlots.sort(function (a, b) {
            return new Date(a.dateTime) - new Date(b.dateTime);
          });
          $scope.slotAvailabilities = createTimeSlotsAvailabilities($scope.timeSlots, $scope.participantAvailability);
          makeSlotsTree($scope.timeSlots);
          $scope.is_loaded = true;
    });

    function createTimeSlotsAvailabilities(timeSlots, participantAvailability) {
      return timeSlots.map(function(timeSlot) {
          var slotAvailability = new TimeSlotAvailability();
            slotAvailability.availability = "NO";
            slotAvailability.participant = "participantAvailabilities/" + participantAvailability.id;
            slotAvailability.timeSlot = "timeSlots/" + timeSlot.id;
          return slotAvailability;
        });
    }

    $scope.submitAvailabilities = function() {
      $scope.slotAvailabilities.map(function(slotAvailability) {
        slotAvailability.$save();
      })
    };

    function makeSlotsTree(slots) {
      for (var x = 0; x < slots.length; x++) {
        var date = new Date(slots[x].dateTime);
        var year = date.getFullYear();
        var month = date.getMonth();
        var day = date.getDate();
        var hour = date.getHours() + ":" + ((date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes());
        var final_hour = date.getHours() + slots[x].duration + ":" + ((date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes());
        if ($scope.slotsCalendar.years) {
          var index_year = findWithAttr($scope.slotsCalendar.years, 'value', year);
          if (index_year === -1) {
            $scope.slotsCalendar.years.push({
              'cellspace': 1,
              'value': year,
              'months': [{
                'cellspace': 1,
                'value': month,
                'days': [{
                  'cellspace': 1,
                  'value': day,
                  'hours': [{'cellspace': 1, 'value': hour, 'final': final_hour}]
                }]
              }]
            });
          } else {
            var index_month = findWithAttr($scope.slotsCalendar.years[index_year].months, 'value', month);
            if (index_month === -1) {
              $scope.slotsCalendar.years[index_year].months.push({
                'cellspace': 1,
                'value': month,
                'days': [{
                  'cellspace': 1,
                  'value': day,
                  'hours': [{'cellspace': 1, 'value': hour, 'final': final_hour}]
                }]
              });
              $scope.slotsCalendar.years[index_year].cellspace += 1;
            } else {
              var index_day = findWithAttr($scope.slotsCalendar.years[index_year].months[index_month].days, 'value', day);
              if (index_day === -1) {
                $scope.slotsCalendar.years[index_year].months[index_month].days.push({
                  'cellspace': 1,
                  'value': day,
                  'hours': [{'cellspace': 1, 'value': hour, 'final': final_hour}]
                });
                $scope.slotsCalendar.years[index_year].cellspace += 1;
                $scope.slotsCalendar.years[index_year].months[index_month].cellspace += 1;
              } else {
                var index_hour = findWithAttr($scope.slotsCalendar.years[index_year].months[index_month].days[index_day].hours, 'value', hour);
                if (index_hour === -1) {
                  $scope.slotsCalendar.years[index_year].months[index_month].days[index_day].hours.push({
                    'cellspace': 1,
                    'value': hour,
                    'final': final_hour
                  });
                  $scope.slotsCalendar.years[index_year].cellspace += 1;
                  $scope.slotsCalendar.years[index_year].months[index_month].cellspace += 1;
                  $scope.slotsCalendar.years[index_year].months[index_month].days[index_day].cellspace += 1;
                } else {
                  //No s'haurie de poder donar la situacio(Dates repetides!!)
                }
              }
            }
          }
        } else {
          $scope.slotsCalendar.years = [{
            'cellspace': 1,
            'value': year,
            'months': [{
              'cellspace': 1,
              'value': month,
              'days': [{'cellspace': 1, 'value': day, 'hours': [{'cellspace': 1, 'value': hour, 'final': final_hour}]}]
            }]
          }];
        }
      }

      $scope.years = [];
      $scope.months = [];
      $scope.days = [];
      $scope.hours = [];
      angular.forEach($scope.slotsCalendar.years, function (year, index) {
        $scope.years.push({'value': year.value, 'cellspace': year.cellspace});
        if ('months' in year) {
          angular.forEach(year.months, function (month, index) {
            $scope.months.push({'value': $filter('setMonthName')(month.value), 'cellspace': month.cellspace});
            if ('days' in month) {
              angular.forEach(month.days, function (day, index) {
                $scope.days.push({'value': day.value, 'cellspace': day.cellspace});
                if ('hours' in day) {
                  angular.forEach(day.hours, function (hour, index) {
                    $scope.hours.push({'value': hour.value, 'cellspace': hour.cellspace, 'final': hour.final});
                  })
                }
              })
            }
          })
        }
      });
    }
  });
