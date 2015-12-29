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
  .controller('MeetingViewController', function($scope, $stateParams, MeetingProposal, $uibModal) {
    $scope.key = $stateParams.key;
    $scope.meetingId = $stateParams.id;
    $scope.slotsCalendar = [];

    $scope.barLabels = [];
    $scope.barSeries = [];
    $scope.barData = [];

    function findWithAttr(array, attr, value) {
      for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
          return i;
        }
      }
      return -1;
    }

    MeetingProposal.query({id: $stateParams.id, key: $stateParams.key})
      .$promise.then(function (meeting) {
        $scope.meeting = meeting;
        makeSlotsTree($scope.meeting);
        $scope.is_loaded = true;
      });

    function makeSlotsTree(meeting){
      var slots = meeting.slots;
      slots.sort(function(a,b){
        return new Date(a.dateTime) - new Date(b.dateTime);
      });
      for(var x=0; x<slots.length; x++){
        var date = new Date(slots[x].dateTime);
        var year = date.getFullYear();
        var month = date.getMonth();
        var day = date.getDate();
        var hour = date.getHours() + ":" + ((date.getMinutes()<10) ? '0' + date.getMinutes() : date.getMinutes());
        var final_hour = date.getHours()+ meeting.slotDuration + ":" + ((date.getMinutes()<10) ? '0' + date.getMinutes() : date.getMinutes());
        if($scope.slotsCalendar.years) {
          var index_year = findWithAttr($scope.slotsCalendar.years, 'value', year);
          if(index_year == -1){
            $scope.slotsCalendar.years.push({'cellspace': 1, 'value': year, 'months': [{'cellspace': 1, 'value': month, 'days': [{'cellspace': 1, 'value': day, 'hours': [{'cellspace': 1, 'value': hour, 'final': final_hour, 'id': slots[x].id}]}]}]});
          }else{
            var index_month = findWithAttr($scope.slotsCalendar.years[index_year].months, 'value', month);
            if(index_month == -1){
               $scope.slotsCalendar.years[index_year].months.push({'cellspace': 1, 'value': month, 'days': [{'cellspace': 1, 'value': day, 'hours': [{'cellspace': 1, 'value': hour, 'final': final_hour, 'id': slots[x].id}]}]});
              $scope.slotsCalendar.years[index_year].cellspace += 1;
            }else{
              var index_day = findWithAttr($scope.slotsCalendar.years[index_year].months[index_month].days, 'value', day);
              if(index_day == -1){
                $scope.slotsCalendar.years[index_year].months[index_month].days.push({'cellspace': 1, 'value': day, 'hours': [{'cellspace': 1, 'value': hour, 'final': final_hour, 'id': slots[x].id}]});
                $scope.slotsCalendar.years[index_year].cellspace += 1;
                $scope.slotsCalendar.years[index_year].months[index_month].cellspace += 1;
              }else{
                var index_hour = findWithAttr($scope.slotsCalendar.years[index_year].months[index_month].days[index_day].hours, 'value', hour);
                if(index_hour == -1){
                  $scope.slotsCalendar.years[index_year].months[index_month].days[index_day].hours.push({'cellspace': 1, 'value': hour, 'final': final_hour, 'id': slots[x].id});
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
          $scope.slotsCalendar.years = [{'cellspace': 1, 'value': year, 'months': [{'cellspace': 1, 'value': month, 'days': [{ 'cellspace': 1,'value': day, 'hours': [{'cellspace': 1, 'value': hour, 'final': final_hour, 'id': slots[x].id}]}]}]}]
        }
      }
    }

    $scope.newTimeSlot = function (){
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
        makeSlotsTree($scope.meeting);
      });
    };

    $scope.deleteTimeSlot = function (){
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'views/deletetimeslotmodal.html',
        controller: 'DeleteTimeSlotController',
        size: 'lg',
        resolve: {
          meetingProposal: function () {
            return $scope.meeting;
          }
        }
      });
      modalInstance.result.then(function (index) {
        for(var i=0;i<index.length; i++){
          $scope.meeting.slots.splice(index[i], 1)
        }
        $scope.slotsCalendar.years = [];
        makeSlotsTree($scope.meeting);
      });
    };

    $scope.updateCharts = function () {
      var labels = getLabelsFromTimeSlots();
      updateBarChart(labels);
    };

    var updateBarChart = function(labels) {
      $scope.barLabels = labels;
      $scope.barSeries = ['Confirmed', 'Potential'];
      var confirmed = getConfirmedVotes();
      var maybe = getMaybeVotes();
      var potential = [];
      for(var index=0; index < confirmed.length; index++){
        potential[index] = confirmed[index] + maybe[index];
      }
      $scope.barData = [confirmed, potential];
    }

    var getLabelsFromTimeSlots = function () {
      var dates = [];
      var slots = $scope.meeting.slots;
      for (var index=0; index < slots.length; index++){
        dates[index] = formatDate(slots[index].dateTime);
      }
      return dates;
    };

    var getConfirmedVotes = function () {
      var votes = [];
      var slots = $scope.meeting.slots;
      for (var index=0; index < slots.length; index++){
        votes[index] = slots[index].yesVotes;
      }
      return votes;
    };

    var getMaybeVotes = function () {
      var votes = [];
      var slots = $scope.meeting.slots;
      for (var index=0; index < slots.length; index++){
        votes[index] = slots[index].maybeVotes;
      }
      return votes;
    };

    var formatDate = function(dateString){
      var date = new Date(dateString);
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var strTime = ("0" + hours).slice(-2) + ':' + ("0" + minutes).slice(-2);
      return ("0" + date.getDate()).slice(-2) + "/" + ("0" + (date.getMonth()+1)).slice(-2) + "/" + date.getFullYear().toString().slice(-2) + "  " + strTime;
    };
});
