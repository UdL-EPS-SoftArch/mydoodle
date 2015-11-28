@https://www.pivotaltracker.com/story/show/104350780 @meeting_organiser @organise_meetings
Feature: View current availabilities
  In order to organise meetings
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


  Scenario: Empty Availabilities on a participant
    And there is 0 slots availabilities in participant availability
    And there is 0 slots availabilities and 1 participant in meeting proposal, none or single participant

  Scenario: View two new availability created on one participant
    And The organizer create a new availability "MAYBE"
    Then the response is status code 201
    And the organizer associates the previous meeting proposal with the email participant, timeslot and availability "MAYBE"
    And the organizer creates a new time slot "2016-07-11T11:00:00.000+0000"
    And the organizer associates the previous time slot to the created meeting proposal
    And The organizer create a new availability "YES"
    And the organizer associates the previous meeting proposal with the email participant, timeslot and availability "YES"
    And there is 2 slots availabilities in participant availability
    And there is 2 slots availabilities and 1 participant in meeting proposal, none or single participant

  Scenario: View a new availability created on two participants
    And The organizer create a new availability "MAYBE"
    Then the response is status code 201
    And the organizer associates the previous meeting proposal with the email participant, timeslot and availability "MAYBE"
    And adds a participant with "test2@test.com" email to the previously created meeting proposal
    And The organizer create a new availability "YES"
    And the organizer associates the previous meeting proposal with the email participant, timeslot and availability "YES"
    And there is 1 slots availabilities in participant availability
    And there is 1 slots availabilities and 2 participant in meeting proposal, two participants










#  Scenario: Try to introduce manually a slotAvailability to a Participant
#    And Insert manually a slot into a participant
#    Then the response is status code 201
#    And slots availabilities in participant availability
#    Then the response is status code 201


#  Scenario: view a meetingProposal without current availabilities
#    Given the organizer creates the meeting proposal:
#      | title | description | organizer | slotDuration |
#      | mp1   | dmp1        | pepet@mail.com     | 1            |
#    When the participant views a "existent" meeting proposal with "5" time slots
#    And the participant views a "existent" meeting proposal with email participant "test1@gmail.com"
#    Then we will see 1 participants
#    Then the response is a meetingProposal with "5" time slots
#    And slots availabilities in participant availability


