/**
 * Created by cobos on 05/11/2015.
 */
angular.module('webappApp')
  .controller('AddTimeSlotController', function($scope, $uibModalInstance, meetingProposalId) {
    $scope.meetingProposalId = meetingProposalId;

    $scope.ok = function () {
      $uibModalInstance.close();
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

    $scope.open = function($event) {
      $scope.status.opened = true;
    };

    $scope.status = {
      opened: false
    };
  });
