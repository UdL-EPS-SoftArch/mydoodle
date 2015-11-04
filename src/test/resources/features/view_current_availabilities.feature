@https://www.pivotaltracker.com/story/show/104350780 @meeting_organiser @organise_meetings
Feature: In order to organise meetings
  As a meeting organiser
  I want to see the current availabilities status of a meeting proposal

  Scenario: view a meetingProposal without current availabilities
    Given the organizer creates the meeting proposal:
      | title | description | organizer | slotDuration |
      | mp1   | dmp1        | pepet@mail.com     | 1            |
    When the participant views a "existent" meeting proposal with "5" time slots
    And the participant views a "existent" meeting proposal with email participant "test1@gmail.com"
    Then we will see 1 participants
    Then the response is a meetingProposal with "5" time slots
    And slots availabilities in participant availability

