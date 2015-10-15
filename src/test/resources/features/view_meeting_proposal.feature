@https://www.pivotaltracker.com/story/show/104355360 @communicate_availability @meeting_participant
Feature: View meeting proposal
  In order to communicate availability
  As a meeting participant
  I want to be able to view an incoming meeting proposal with its candidate time slots

  Scenario: view an existing meetingProposal
    Given the organizer creates the meeting proposal:
      | title | description | organizer | slotDuration |
      | mp1   | dmp1        | pepet@mail.com     | 1            |
    When the participant views a "existent" meeting proposal
    Then the response is a meetingProposal with title "mp1"

  Scenario: view a non-existing meeting proposal
    Given meetingProposal with random id doesn't exist
    When the participant views a "inexistent" meeting proposal
    Then the response is status code 404

  Scenario: view an existing meetingProposal with time slots
    Given the organizer creates the meeting proposal:
      | title | description | organizer | slotDuration |
      | mp1   | dmp1        | pepet@mail.com     | 1            |
    When the participant views a "existent" meeting proposal with "5" time slots
    Then the response is a meetingProposal with "5" time slots

  Scenario: view an non-existing meetingProposal with time slots
    Given meetingProposal with random id doesn't exist
    When the participant views a "inexistent" meeting proposal with "5" time slots
    Then the response is status code 404

  Scenario: view a participant of meetingProposal
    Given the organizer creates the meeting proposal:
      | title | description | organizer | slotDuration |
      | mp1   | dmp1        | pepet@mail.com     | 1            |
    When the participant views a "existent" meeting proposal with email participant "test1@gmail.com"
    Then we will see 1 participants

    Scenario:  view an existing meetingProposal with an invalid admin key
      Given the organizer creates the meeting proposal:
      | title | description | organizer       | slotDuration  |
      | mp1   | dmp1        | pepet@mail.com  | 1             |
      When participant use "KKKKKKKKK" as admin key
      And the participant views a "existent" meeting proposal
      Then the response is status code 401