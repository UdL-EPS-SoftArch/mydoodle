'use strict';

angular.module('webappApp')
  .controller('ParticipantAddController', function ($scope) {
    $scope.participants=[];
    $scope.addParticipant = function () {
      if($scope.participants.indexOf($scope.participant)==-1){
        $scope.participants.push($scope.participant);
      }
      $scope.participant='';
    };
    $scope.removeParticipant = function(index){
      $scope.participants.splice(index,1);
    };
    $scope.submitParticipants = function(){

      $scope.participants=[];
    };
  });
