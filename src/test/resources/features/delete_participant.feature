Feature: Delete Participant
  In order to organise meetings
  As a meeting organiser
  I want to be able to remove a previously added participant from a meeting proposal

  Scenario: the organizer deletes the participant.
    Given the organizer creates the meeting proposal:
    | title  | description | organizer     | slotDuration|
    | Test   | Testdescr   | test@test.com | 2           |
    And adds a participant with "test@test.com" email to the previously created meeting proposal
    Then the response is status code 204
    And The organizer deletes the participant with "test@test.com" email.
    And an email has been sent to "test@test.com" containing "You have been removed of the meeting: Test"
    Then the response is status code 204