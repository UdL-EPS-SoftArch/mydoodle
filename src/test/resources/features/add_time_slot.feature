@https://www.pivotaltracker.com/story/show/104350566 @meeting_organiser @organise_meetings
Feature: Add time slot
  In order to organise meetings
  As a meeting organiser
  I want to add candidate time slots (time and date) to a meeting proposal

  Scenario: a new Time Slot created and associated with Meeting Proposal
    Given the meeting repository has the following meeting:
      | tittle  | description | organizer     | slotDuration|
      | Test    | Testdescr   | test@test.com | 2           |

    When  the organizer add a new time slot "2015-07-11 11:00" and associated meeting proposal
    Then  the response is status code 201
    And   header "Location" points to a proposal meeting which has a "Timeslots" list containing "1" elements

  Scenario: create a new time slot with incorrect datetime format
    When  the organizer add a new time slot duration "11:00 11-07-2015"
    Then the response is status code 422
    And  error message contains "Date format is incorrect"

  Scenario: create a new time slot with incorrect time format
    When the organizer add a new time slot duration "28:00 10-07-2015"
    Then the response is status code 422
    And  error message contains "Time format is incorrect"

