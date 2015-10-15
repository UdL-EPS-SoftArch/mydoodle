@https://www.pivotaltracker.com/story/show/104349798 @meeting_organiser @organise_meetings
Feature: Create meeting proposal
  In order to organise meetings
  As a meeting organiser
  I want to create meeting proposals with a set of candidate time slots (time and date)


  Scenario: create new meeting proposal without time slots
    When the organizer creates a meeting proposal with title "TestMeeting", description "This is a test meeting", organizer "mydoodle1516@gmail.com" and slot duration "2"
    And header "Location" points to a proposal meeting with title "TestMeeting", description "This is a test meeting", organizer "mydoodle1516@gmail.com"
    And header "Location" points to a proposal meeting which has a "slots" list of "timeSlots" containing "0" elements
    And header "Location" points to a proposal meeting which has a "availabilities" list of "participantAvailabilities" containing "0" elements

  Scenario: create new meeting proposal with incorrect email, case no @
    When the organizer creates a meeting proposal with title "TestMeeting", description "This is a test meeting", organizer "testgmail.com" and slot duration "2"
    Then the response is status code 422
    And error message contains "E-Mail testgmail.com is not valid"

  Scenario: create new meeting proposal with incorrect email, case no dot
    When the organizer creates a meeting proposal with title "TestMeeting", description "This is a test meeting", organizer "test@gmailcom" and slot duration "2"
    Then the response is status code 422
    And error message contains "E-Mail test@gmailcom is not valid"

  Scenario: create new meeting proposal with negative duration
    When the organizer creates a meeting proposal with title "TestMeeting", description "This is a test meeting", organizer "mydoodle1516@gmail.com" and slot duration "-1"
    Then the response is status code 422
    And error message contains "Slot duration cannot be negative"

  Scenario: create new meeting proposal without title
    When the organizer creates a meeting proposal with title "", description "This is a test meeting", organizer "mydoodle1516@gmail.com" and slot duration "1"
    Then the response is status code 422
    And error message contains "Meeting title cannot be blank"
