/**
 * Created by xavics on 26/10/2015.
 */
'use strict';
/**
 * @ngdoc function
 * @name webappApp.controller:MeetingviewcontrollerCtrl
 * @description
 * # MeetingviewcontrollerCtrl
 * Controller of the webappApp
 */
angular.module('webappApp')
  .controller('MeetingViewController', function($scope, $stateParams, MeetingProposal, $uibModal, $state) {
    $scope.key = $stateParams.key;
    $scope.meetingId = $stateParams.id;
    $scope.slotsCalendar = [];

    MeetingProposal.query($stateParams.id, $stateParams.key)
      .$promise.then(function (meeting) {
        $scope.meeting = meeting;
        makeSlotsTree(meeting.slots);
        $scope.is_loaded = true;
      });

    function findWithAttr(array, attr, value) {
      for (var i = 0; i < array.length; i += 1) {
        if (array[i][attr] === value) {
          return i;
        }
      }
      return -1;
    }

    function makeSlotsTree(slots) {
      slots.sort(function (a, b) {
        return new Date(a.dateTime) - new Date(b.dateTime);
      });
      for (var x = 0; x < slots.length; x++) {
        var date = new Date(slots[x].dateTime);
        var year = date.getFullYear();
        var month = date.getMonth();
        var day = date.getDate();
        var hour = date.getHours() + ":" + ((date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes());
        var final_hour = (date.getHours() + $scope.meeting.slotDuration) + ":" + ((date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes());
        //debugger;
        if ($scope.slotsCalendar.years) {
          var index_year = findWithAttr($scope.slotsCalendar.years, 'value', year);
          if (index_year == -1) {
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
            if (index_month == -1) {
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
              if (index_day == -1) {
                $scope.slotsCalendar.years[index_year].months[index_month].days.push({
                  'cellspace': 1,
                  'value': day,
                  'hours': [{'cellspace': 1, 'value': hour, 'final': final_hour}]
                });
                $scope.slotsCalendar.years[index_year].cellspace += 1;
                $scope.slotsCalendar.years[index_year].months[index_month].cellspace += 1;
              } else {
                var index_hour = findWithAttr($scope.slotsCalendar.years[index_year].months[index_month].days[index_day].hours, 'value', hour);
                if (index_hour == -1) {
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
          }]
        }
      }
    }

    $scope.newTimeSlot = function () {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'views/addtimeslotmodal.html',
        controller: 'AddTimeSlotController',
        size: 'lg',
        resolve: {
          meetingProposalId: function () {
            return $scope.meetingId;
          }
        }
      });

      modalInstance.result.then(function (responseTimeSlot) {
        $scope.slotsCalendar.years = [];
        $scope.meeting.slots.push(responseTimeSlot);
        makeSlotsTree($scope.meeting.slots);
      });
    }
  });
