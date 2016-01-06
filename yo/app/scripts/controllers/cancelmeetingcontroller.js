/**
 * Created by eric on 6/01/16.
 */
'use strict';

angular.module('webappApp')
  .controller('CancelMeetingController', function($scope, $state, $stateParams, $uibModalInstance, TimeSlots, meetingProposal) {
    $scope.meetingProposal = meetingProposal;
    $scope.selected = [];
    $scope.finalAdminKey = $stateParams.key;
    $scope.meetingId = $stateParams.id;


    $scope.deleteMeeting = function(){
      for(var i=0;i<$scope.meetingProposal.slots.length;i++){
        TimeSlots.remove({id: $scope.meetingProposal.slots[i].id }, $scope.meetingProposal.slots[i]);
      }
      $scope.meetingProposal.$remove({id: $stateParams.id, key: $stateParams.key}, $scope.meetingProposal);
      $uibModalInstance.dismiss();
      $state.go('home');
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
