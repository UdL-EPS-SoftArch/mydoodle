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
    MeetingProposal.query($stateParams.id, $stateParams.key)
      .$promise.then(function (meeting) {
        $scope.meeting = meeting;
        $scope.slotsCalendar = {};
        for(var x=0; x<meeting.slots.length; x++){
          debugger;
          var date = new Date($scope.meeting.slots[x].dateTime);
          var year = date.getFullYear();
          var month = date.getMonth();
          var day = date.getDate();
          var hour = date.getHours();
          if($scope.slotsCalendar.years){
            for(var y=0; y<$scope.slotsCalendar.years.length; y++){
              if($scope.slotsCalendar.years[y].value != year){
                $scope.slotsCalendar.years.push({'value': year, 'months': [{'value': month, 'days': [{'value': day, 'hours': [{'value': hour}]}]}]});
                break;
              }
              else{
                for(var m=0; m<$scope.slotsCalendar.years[y].months.length; m++){
                  if($scope.slotsCalendar.years[y].months[m].value != month){
                    $scope.slotsCalendar.years[y].months.push({'value': month, 'days': [{'value': day, 'hours': [{'value': hour}]}]});
                    break;
                  }
                  else{
                    for(var d=0; d<$scope.slotsCalendar.years[y].months[m].days.length; d++){
                      if($scope.slotsCalendar.years[y].months[m].days[d].value != day){
                        $scope.slotsCalendar.years[y].months[m].days.push({'value': day, 'hours': [{'value': hour}]});
                        break;
                      }else{
                        for(var h=0; h<$scope.slotsCalendar.years[y].months[m].days[d].hours.length; h++){
                          if($scope.slotsCalendar.years[y].months[m].days[d].hours[h].value != hour){
                            $scope.slotsCalendar.years[y].months[m].days[d].hours.push({'value': hour});
                            break;
                          }else{
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }else{
              $scope.slotsCalendar.years = [{'value': year, 'months': [{'value': month, 'days': [{'value': day, 'hours': [{'value': hour}]}]}]}]
            }
        }
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
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
  });
