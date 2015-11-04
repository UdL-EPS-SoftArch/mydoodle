'use strict';

angular.module('webappApp')
  .controller('MeetingSendController', function ($scope) {
    $scope.participants=[];
    $scope.participant1="";
    $scope.addParticipant = function () {
      if($scope.participant.indexOf($scope.participant)==-1){
        $scope.participants.push($scope.participant)
      }
      $scope.participant='';
    };
    $scope.removeParticipant = function(index){
      $scope.participants.splice(index,1);
    };
    $scope.submitParticipants = function(){
      //$scope.participants.sendInvite()
      $scope.participants=[];
    };
  });
