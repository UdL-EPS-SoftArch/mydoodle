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
    function findWithAttr(array, attr, value) {
      for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
          return i;
        }
      }
      return -1;
    }
    MeetingProposal.query($stateParams.id, $stateParams.key)
      .$promise.then(function (meeting) {
        meeting.slots.sort(function(a,b){
          return new Date(a.dateTime) - new Date(b.dateTime);
        });
        $scope.meeting = meeting;
        for(var x=0; x<meeting.slots.length; x++){
          var date = new Date($scope.meeting.slots[x].dateTime);
          var year = date.getFullYear();
          var month = date.getMonth();
          var day = date.getDate();
          var hour = date.getHours();
          debugger;
          if($scope.slotsCalendar.years) {
            var index_year = findWithAttr($scope.slotsCalendar.years, 'value', year);
            if(index_year == -1){
              $scope.slotsCalendar.years.push({'cellspace': 1, 'value': year, 'months': [{'cellspace': 1, 'value': month, 'days': [{'cellspace': 1, 'value': day, 'hours': [{'cellspace': 1, 'value': hour}]}]}]});
            }else{
              var index_month = findWithAttr($scope.slotsCalendar.years[index_year].months, 'value', month);
              if(index_month == -1){
                $scope.slotsCalendar.years[index_year].months.push({'cellspace': 1, 'value': month, 'days': [{'cellspace': 1, 'value': day, 'hours': [{'cellspace': 1, 'value': hour}]}]});
                $scope.slotsCalendar.years[index_year].cellspace += 1;
              }else{
                var index_day = findWithAttr($scope.slotsCalendar.years[index_year].months[index_month].days, 'value', day);
                if(index_day == -1){
                  $scope.slotsCalendar.years[index_year].months[index_month].days.push({'cellspace': 1, 'value': day, 'hours': [{'cellspace': 1, 'value': hour}]});
                  $scope.slotsCalendar.years[index_year].cellspace += 1;
                  $scope.slotsCalendar.years[index_year].months[index_month].cellspace += 1;
                }else{
                  var index_hour = findWithAttr($scope.slotsCalendar.years[index_year].months[index_month].days[index_day].hours, 'value', hour);
                  if(index_hour == -1){
                    $scope.slotsCalendar.years[index_year].months[index_month].days[index_day].hours.push({'cellspace': 1, 'value': hour});
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
            $scope.slotsCalendar.years = [{'cellspace': 1, 'value': year, 'months': [{'cellspace': 1, 'value': month, 'days': [{ 'cellspace': 1,'value': day, 'hours': [{'cellspace': 1, 'value': hour}]}]}]}]
          }
          //if($scope.slotsCalendar.years){
          //  firstLoop:
          //  for(var y=0; y<$scope.slotsCalendar.years.length; y++){
          //    if($scope.slotsCalendar.years[y].value != year){
          //      $scope.slotsCalendar.years.push({'cellspace': 1, 'value': year, 'months': [{'cellspace': 1, 'value': month, 'days': [{'cellspace': 1, 'value': day, 'hours': [{'cellspace': 1, 'value': hour}]}]}]});
          //      break;
          //    }
          //    else{
          //      for(var m=0; m<$scope.slotsCalendar.years[y].months.length; m++){
          //        if($scope.slotsCalendar.years[y].months[m].value != month){
          //          $scope.slotsCalendar.years[y].months.push({'cellspace': 1, 'value': month, 'days': [{'cellspace': 1, 'value': day, 'hours': [{'cellspace': 1, 'value': hour}]}]});
          //          $scope.slotsCalendar.years[y].cellspace += 1;
          //          break firstLoop;
          //        }
          //        else{
          //          for(var d=0; d<$scope.slotsCalendar.years[y].months[m].days.length; d++){
          //            if($scope.slotsCalendar.years[y].months[m].days[d].value != day){
          //              $scope.slotsCalendar.years[y].months[m].days.push({'cellspace': 1, 'value': day, 'hours': [{'cellspace': 1, 'value': hour}]});
          //              $scope.slotsCalendar.years[y].cellspace += 1;
          //              $scope.slotsCalendar.years[y].months[m].cellspace += 1;
          //              break firstLoop;
          //            }else{
          //              for(var h=0; h<$scope.slotsCalendar.years[y].months[m].days[d].hours.length; h++){
          //                if($scope.slotsCalendar.years[y].months[m].days[d].hours[h].value != hour){
          //                  $scope.slotsCalendar.years[y].months[m].days[d].hours.push({'cellspace': 1, 'value': hour});
          //                  $scope.slotsCalendar.years[y].cellspace += 1;
          //                  $scope.slotsCalendar.years[y].months[m].cellspace += 1;
          //                  $scope.slotsCalendar.years[y].months[m].days[d].cellspace += 1;
          //                  break firstLoop;
          //                }else{
          //                }
          //              }
          //            }
          //          }
          //        }
          //      }
          //    }
          //  }
          //}else{
          //    $scope.slotsCalendar.years = [{'cellspace': 1, 'value': year, 'months': [{'cellspace': 1, 'value': month, 'days': [{ 'cellspace': 1,'value': day, 'hours': [{'cellspace': 1, 'value': hour}]}]}]}]
          //}
        }
        $scope.is_loaded = true;
      });
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
      modalInstance.result.then(function () {
        $state.reload();
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
  });
