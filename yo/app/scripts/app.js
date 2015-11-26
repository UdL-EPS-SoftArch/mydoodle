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
    'ui.bootstrap',
    'pascalprecht.translate',// angular-translate
    'tmh.dynamicLocale',// angular-dynamic-locale
    'spring-data-rest'
  ])
  .config(function ($stateProvider) {
    $stateProvider
      .state('home', { //home
        url: '/',
        templateUrl: 'views/home.html',
        controller: 'HomeController' })
      .state('meetings', { // state for showing all meeting proposals
        url: '/listMeetings',
        templateUrl: 'views/meetings.html',
        controller: 'MeetingsListController' })
      .state('newMeeting', { //state for adding a new meeting
        url: '/meetings/new',
        templateUrl: 'views/meeting-add.html',
        controller: 'MeetingCreateController' })
      .state('viewMeeting', { //state for showing single meetings
        url: '/meetings/:id?key',
        //params: {
        //  key: null
        //},
        templateUrl: 'views/meeting-view.html',
        controller: 'MeetingViewController' })
      .state('editMeeting', { //state for updating a meeting
        url: '/meetings/:id/edit',
        templateUrl: 'views/meeting-edit.html',
        controller: 'MeetingEditController' });
        controller: 'MeetingEditController' })
      .state('sendMeeting',{
        //url:'/sendMeeting',
        url: '/meetings/:id/sendMeeting',
        templateUrl:'views/participants.html',
        controller: 'ParticipantAddController'
      })
  })
  .run(function($state) {
    $state.go('home'); //make a transition to meetings state when app starts
  })
  .config(function (SpringDataRestInterceptorProvider) {
    SpringDataRestInterceptorProvider.apply();
  })
  .config(function ($translateProvider) {
    $translateProvider.useMissingTranslationHandlerLog();
  })
  .config(function ($translateProvider) {
    var langMap = {
      'en_UK': 'en',
      'en_US': 'en',
      'es_ES': 'es'
    };
    $translateProvider.useStaticFilesLoader({
      prefix: 'resources/locale-',// path to translations files
      suffix: '.json'// suffix, currently- extension of the translations
    }).determinePreferredLanguage();
    $translateProvider.registerAvailableLanguageKeys(['en', 'es'], langMap);
    $translateProvider.preferredLanguage('en');// is applied on first load
    $translateProvider.useLocalStorage();// saves selected language to localStorage
  })
  .config(function (tmhDynamicLocaleProvider) {
    tmhDynamicLocaleProvider.localeLocationPattern('bower_components/angular-i18n/angular-locale_{{locale}}.js');
  })
  .constant('LOCALES', {
    'locales': {
      'es': 'Spanish',
      'en': 'English'
    }
  });
