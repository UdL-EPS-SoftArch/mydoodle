@https://www.pivotaltracker.com/story/show/104350566 @meeting_organiser @organise_meetings
Feature: send meeting invite
  In order to organise meetings
  As a meeting organiser
  I want to be able to send meeting invitations for the scheduled time and date to the intended participants

  Scenario: create new meeting proposal
    Given the organizer creates the meeting proposal:
      | title  | description | organizer     | slotDuration| isOpen |
      | TestMeeting   | This is a test meeting   | mydoodle1516@gmail.com | 2           | false|
      | TestMeeting   | This is a test meeting   | mydoodle1516@gmail.com | 2           | true|
    And the organizer adds time slot "2015-07-11T11:00:00.000+0000" to the meeting proposal "TestMeeting"
    And the organizer invites participant "mydoodle1517@gmail.com" to the meeting proposal "TestMeeting"
    And the organizer schedules time slot "2015-07-11T11:00:00.000+0000" and closes the meeting proposal "TestMeeting"
    And an email has been sent to "mydoodle1517@gmail.com" containing "You have been invited to a new meeting proposal."
    Then the response is status code 204

  Scenario: create new meeting proposal
    Given the organizer creates the meeting proposal:
      | title  | description | organizer     | slotDuration| isOpen |
      | TestMeeting   | This is a test meeting   | mydoodle1516@gmail.com | 2           | false|
      | TestMeeting   | This is a test meeting   | mydoodle1516@gmail.com | 2           | true|
    And the organizer adds time slot "2015-07-11T11:00:00.000+0000" to the meeting proposal "TestMeeting"
    And the organizer invites participant "mydoodle1517@gmail.com" to the meeting proposal "TestMeeting"
    And the organizer invites participant "mydoodle1518@gmail.com" to the meeting proposal "TestMeeting"
    And the organizer schedules time slot "2015-07-11T11:00:00.000+0000" and closes the meeting proposal "TestMeeting"
    And an email has been sent to "mydoodle1517@gmail.com" and "mydoodle1518@gmail.com" containing "You have been invited to a new meeting proposal."
    Then the response is status code 204
