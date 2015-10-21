'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:MeetingslistcontrollerCtrl
 * @description
 * # MeetingslistcontrollerCtrl
 * Controller of the webappApp
 */
angular.module('webappApp')
  .controller('MeetingsListController', function($scope, MeetingProposal) {
    MeetingProposal.query()
      .$promise.then(function (meetings) {
        $scope.meetings = meetings._embeddedItems;
      });
  });
