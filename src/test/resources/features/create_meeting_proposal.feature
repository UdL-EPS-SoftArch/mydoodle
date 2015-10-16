@https://www.pivotaltracker.com/story/show/104349798 @meeting_organiser @organise_meetings
Feature: Create meeting proposal
  In order to organise meetings
  As a meeting organiser
  I want to create meeting proposals with a set of candidate time slots (time and date)


  Scenario: create new meeting proposal without time slots
    Given the organizer creates the meeting proposal:
      | title  | description | organizer     | slotDuration|
      | TestMeeting   | This is a test meeting   | mydoodle1516@gmail.com | 2           |
    Then the response is status code 201
    And header "Location" points to a proposal meeting with title "TestMeeting", description "This is a test meeting", organizer "mydoodle1516@gmail.com"
    And header "Location" points to a proposal meeting which has a "slots" list of "timeSlots" containing "0" elements
    And header "Location" points to a proposal meeting which has a "availabilities" list of "participantAvailabilities" containing "0" elements

  Scenario: create new meeting proposal with incorrect email, case no @
    Given the organizer creates the meeting proposal:
      | title  | description | organizer     | slotDuration|
      | TestMeeting   | This is a test meeting   | testgmail.com | 2           |
    Then the response is status code 422
    And error message contains "E-Mail testgmail.com is not valid"

  Scenario: create new meeting proposal with incorrect email, case no dot
    Given the organizer creates the meeting proposal:
      | title  | description | organizer     | slotDuration|
      | TestMeeting   | This is a test meeting   | test@gmailcom | 2           |
    Then the response is status code 422
    And error message contains "E-Mail test@gmailcom is not valid"

  Scenario: create new meeting proposal with negative duration
    Given the organizer creates the meeting proposal:
      | title  | description | organizer     | slotDuration|
      | TestMeeting   | This is a test meeting   | mydoodle1516@gmail.com | -1           |
    Then the response is status code 422
    And error message contains "Slot duration cannot be negative"

  Scenario: create new meeting proposal without title
    Given the organizer creates the meeting proposal:
      | title  | description | organizer     | slotDuration|
      |    | This is a test meeting   | mydoodle1516@gmail.com | 1           |
    Then the response is status code 422
    And error message contains "Meeting title cannot be blank"
    
  Scenario: update a meeting proposal with correct key
     Given the organizer creates the meeting proposal:
       | title  | description | organizer     | slotDuration|
       | Test   | Testdescr   | test@test.com | 2           |
     When the organizer updates the meeting title to "NewTitle"
     Then the response is status code 200
     And header "Location" points to a proposal meeting with title "NewTitle", description "Testdescr", organizer "test@test.com"

  Scenario: update a meeting proposal with invalid key
    Given the organizer creates the meeting proposal:
      | title  | description | organizer     | slotDuration|
      | Test   | Testdescr   | test@test.com | 2           |
    When participant use "KKKKKKKK" as admin key
    And the organizer updates the meeting title to "NewTitle"
    Then the response is status code 401

  Scenario: delete a meeting proposal with correct key
    Given the organizer creates the meeting proposal:
      | title  | description | organizer     | slotDuration|
      | Test   | Testdescr   | test@test.com | 2           |
    When the organizer deletes the meeting proposal
    Then the response is status code 200
    And meeting proposal repository is empty

  Scenario: delete a meeting proposal with incorrect key
    Given the organizer creates the meeting proposal:
      | title  | description | organizer     | slotDuration|
      | Test   | Testdescr   | test@test.com | 2           |
    When participant use "KKKKKKKKKK" as admin key
    And the organizer deletes the meeting proposal
    Then the response is status code 401
