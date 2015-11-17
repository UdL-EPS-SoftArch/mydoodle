@https://www.pivotaltracker.com/story/show/104350566 @meeting_organiser @organise_meetings
Feature: send meeting invite
  In order to organise meetings
  As a meeting organiser
  I want to be able to send meeting invitations for the scheduled time and date to the intended participants

  Scenario: create new meeting proposal
    Given the organizer creates the meeting proposal:
      | title  | description | organizer     | slotDuration| isOpen |
      | TestMeeting   | This is a test meeting   | mydoodle1516@gmail.com | 2           | false|
    Then the response is status code 201
