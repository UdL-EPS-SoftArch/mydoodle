@https://www.pivotaltracker.com/story/show/104350780 @meeting_organiser @organise_meetings
Feature: In order to organise meetings
  As a meeting organiser
  I want to see the current availabilities status of a meeting proposal

  Background:
    Given the organizer creates the meeting proposal:
      | title  | description | organizer     | slotDuration|
      | Test   | Testdescr   | test@test.com | 2           |
    And adds a participant with "test@test.com" email to the previously created meeting proposal
    Then the response is status code 204
    And the organizer creates a new time slot "2015-07-11T11:00:00.000+0000"
    Then the response is status code 201
    And the organizer associates the previous time slot to the created meeting proposal
    Then the response is status code 204

  Scenario: a new availability created and associated with timeSlot
    And The organizer create a new availability "MAYBE"
    Then the response is status code 201
    And the organizer associates the previous meeting proposal with the email parcitipant, timeslot and availability "MAYBE"
    And slots availabilities in participant availability
    #Then the response is status code 201


  Scenario: prova
    And prova
    And slots availabilities in participant availability


#  Scenario: view a meetingProposal without current availabilities
#    Given the organizer creates the meeting proposal:
#      | title | description | organizer | slotDuration |
#      | mp1   | dmp1        | pepet@mail.com     | 1            |
#    When the participant views a "existent" meeting proposal with "5" time slots
#    And the participant views a "existent" meeting proposal with email participant "test1@gmail.com"
#    Then we will see 1 participants
#    Then the response is a meetingProposal with "5" time slots
#    And slots availabilities in participant availability

