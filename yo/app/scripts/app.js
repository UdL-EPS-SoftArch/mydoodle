'use strict';

/**
 * @ngdoc overview
 * @name webappApp
 * @description
 * # webappApp
 *
 * Main module of the application.
 */
angular
  .module('webappApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.sortable',
    'ui.router',
    'spring-data-rest'
  ])
  .config(function ($stateProvider) {
    $stateProvider
      .state('meetings', { // state for showing all meeting proposals
        url: '/listMeetings',
        templateUrl: 'views/meetings.html',
        controller: 'MeetingsListController' })
      .state('viewMeeting', { //state for showing single meetings
        url: '/meetings/:id/view',
        templateUrl: 'views/meeting-view.html',
        controller: 'MeetingViewController' })
      .state('newMeeting', { //state for adding a new meeting
        url: '/meetings/new',
        templateUrl: 'views/meeting-add.html',
        controller: 'MeetingCreateController' })
      .state('editMeeting', { //state for updating a meeting
        url: '/meetings/:id/edit',
        templateUrl: 'views/meeting-edit.html',
        controller: 'MeetingEditController' })
  })
  .run(function($state) {
    $state.go('meetings'); //make a transition to meetings state when app starts
  })
  .config(function (SpringDataRestInterceptorProvider) {
    SpringDataRestInterceptorProvider.apply();
  });
