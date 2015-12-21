/**
 * Created by fng69 on 16/12/2015.
 */
angular.module('webappApp')
    .controller('DeleteTimeSlotController', function($scope, $uibModalInstance, TimeSlots, meetingProposal) {
        $scope.meetingProposal = meetingProposal;
        $scope.selected = [];

    $scope.deleteSelected = function(){
      var index = [];
      for(var i=0;i<$scope.meetingProposal.slots.length;i++){
          if($scope.meetingProposal.slots[i].selected){
              TimeSlots.remove({id:$scope.meetingProposal.slots[i].id});
              index.push(i);
          }
      }
      $uibModalInstance.close(index);
    };

    $scope.onSelect = function(slot){
        var index = $scope.meetingProposal.slots.indexOf(slot);
        $scope.meetingProposal.slots[index].selected = !$scope.meetingProposal.slots[index].selected;
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
