/**
 * Created by Valentina Menabue on 10/12/2015.
 */
'use strict';

angular.module('webappApp')
  .controller('MeetingEditController', function ($scope,$stateParams,$state, $location, MeetingProposal) {
    $scope.location = $location;
    $scope.meeting = {};
    $scope.editState = 0; // 0->Not edited 1->editing 2->edited -1 -> ERROR
    $scope.adminlink = "";
    $scope.id = "";

    $scope.editMeeting = function () {
      $scope.editState = 1;
      $scope.meeting.$update({id: $stateParams.id, key: $stateParams.key}, function(){
        $scope.editState = 2;
        $state.go('viewMeeting', {'id': $stateParams.id, 'key': $stateParams.key});
      });
    };


    MeetingProposal.query({id: $stateParams.id, key: $stateParams.key})
      .$promise.then(function (meeting) {
        $scope.meeting = meeting;
        $scope.is_loaded = true;
      });

  });

