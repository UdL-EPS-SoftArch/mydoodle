/**
 * Created by eric on 4/01/16.
 */
'use strict';

angular.module('webappApp')
  .controller('SelectTimeSlotController', function($scope, $stateParams, $uibModalInstance, TimeSlots, meetingProposal) {
    $scope.meetingProposal = meetingProposal;
    $scope.selected = [];
    $scope.finalAdminKey = $stateParams.key;
    $scope.meetingId = $stateParams.id;


    $scope.setSelected = function(){
      for(var i=0;i<$scope.meetingProposal.slots.length;i++){
        if($scope.meetingProposal.slots[i].selected){
          $scope.meetingProposal.slots[i].schedule = true;
          $scope.meetingProposal.isOpen = false;
          TimeSlots.update({id: $scope.meetingProposal.slots[i].id }, $scope.meetingProposal.slots[i]);
          $scope.meetingProposal.$update({id: $stateParams.id, key: $stateParams.key}, $scope.meetingProposal);
          }else{
          if($scope.meetingProposal.slots[i].schedule == true){
            $scope.meetingProposal.slots[i].schedule = false;
            TimeSlots.update({id: $scope.meetingProposal.slots[i].id }, $scope.meetingProposal.slots[i]);
          }
        }

      }
      $uibModalInstance.dismiss();
    };

    $scope.onSelect = function(slot){
      var index = $scope.meetingProposal.slots.indexOf(slot);
      for(var i=0;i<$scope.meetingProposal.slots.length;i++){
        if($scope.meetingProposal.slots[i].selected){
          $scope.meetingProposal.slots[i].selected = false;
        }
      }
      $scope.meetingProposal.slots[index].selected = !$scope.meetingProposal.slots[index].selected;
    };

    $scope.noSelect = function(slot){
      var index = $scope.meetingProposal.slots.indexOf(slot);
      for(var i=0;i<$scope.meetingProposal.slots.length;i++){
        if($scope.meetingProposal.slots[i].selected){
          $scope.meetingProposal.slots[i].selected = false;
        }
      }
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

    $scope.open = function() {
      $scope.status.opened = true;
    };

    $scope.status = {
      opened: false
    };
  });
