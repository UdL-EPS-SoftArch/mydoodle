/**
 * Created by fng69 on 16/12/2015.
 */
angular.module('webappApp')
    .controller('DeleteTimeSlotController', function($scope, $uibModalInstance, TimeSlots, meetingProposal) {
        $scope.meetingProposal = meetingProposal;
        $scope.selected = [];

    $scope.deleteSelected = function(){
      for(var i=0;i<$scope.selected.length;i++){
        timeSlotToDelete.$remove({id:$scope.selected[i]});
      }
      $uibModalInstance.close();
    };

    $scope.onSelect = function(id){
      $scope.selected.push(id);
    };

    $scope.onUndo = function(id){
      var index = $scope.selected.indexOf(id);
      $scope.selected.splice(index, 1);
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
