@https://www.pivotaltracker.com/story/show/104350566 @meeting_organiser @organise_meetings
Feature: Add time slot
  In order to organise meetings
  As a meeting organiser
  I want to add candidate time slots (time and date) to a meeting proposal

  Scenario: a new Time Slot created and associated with Meeting Proposal
    Given the meeting repository has the following meeting:
      | title  | description | organizer     | slotDuration|
      | Test   | Testdescr   | test@test.com | 2           |

    When  the organizer add a new time slot "2015-07-11T11:00:00.000+05:00"
    Then  the response is status code 201

  Scenario: create a new time slot with incorrect datetime format
    Given the meeting repository has the following meeting:
      | title  | description | organizer     | slotDuration|
      | Test   | Testdescr   | test@test.com | 2           |

    When the organizer add a new time slot "patata"
    Then the response is status code 500
    And  error message contains "Failed to parse Date value 'patata'"


