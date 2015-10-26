@https://www.pivotaltracker.com/story/show/104350780 @meeting_organiser @organise_meetings
Feature: In order to organise meetings
  As a meeting organiser
  I want to see the current availabilities status of a meeting proposal

  Scenario: view a meetingProposal without current availabilities
    Given the organizer creates the meeting proposal:
      | title | description | organizer | slotDuration |
      | mp1   | dmp1        | pepet@mail.com     | 1            |
    When the organizer views a meeting proposal with "0" current availabilities
    And the meeting has one list of size 0

