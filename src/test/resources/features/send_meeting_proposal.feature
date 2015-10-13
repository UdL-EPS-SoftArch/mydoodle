@https://www.pivotaltracker.com/story/show/104350032 @meeting_organiser @organise_meetings
Feature: Send meeting proposal
  In order to organise meetings
  As a meeting organiser
  I want to send meeting proposals to potential participants to get their availability


 Scenario: add one Participant
   When the organizer creates a meeting proposal with title "TestMeeting", description "This is a test meeting", organizer "mydoodle1516@gmail.com" and slot duration "2"
   And adds a participant with "test1@gmail.com" email to the previously created meeting proposal
   Then the participant has the email "test1@gmail.com" and meeting associated

  Scenario: add one Participant without email
    When the organizer creates a meeting proposal with title "TestMeeting", description "This is a test meeting", organizer "mydoodle1516@gmail.com" and slot duration "2"
    And adds a participant without email
    Then the participant has not the email and meeting associated


