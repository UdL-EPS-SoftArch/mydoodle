@https://www.pivotaltracker.com/story/show/104351462 @meeting_organiser @organise_meetings
Feature: Schedule meeting
  In order to organise meetings
  As a meeting organiser
  I want to be able to schedule a meeting considering the availabilities of potential participants collected so far

  Scenario: create new meeting proposal with isOpen false
    Given the organizer creates the meeting proposal:
      | title  | description | organizer     | slotDuration| isOpen |
      | TestMeeting   | This is a test meeting   | mydoodle1516@gmail.com | 2           | false|
    Then the response is status code 201
    And header "Location" points to a proposal meeting with title "TestMeeting", description "This is a test meeting", organizer "mydoodle1516@gmail.com"
    And header "Location" points to a proposal meeting which has a "slots" list of "timeSlots" containing "0" elements
    And header "Location" points to a proposal meeting which has a "availabilities" list of "participantAvailabilities" containing "0" elements
    And header "Location" points to a proposal meeting which has isOpen "true"
