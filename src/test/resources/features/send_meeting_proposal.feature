@https://www.pivotaltracker.com/story/show/104350032 @meeting_organiser @organise_meetings
Feature: Send meeting proposal
  In order to organise meetings
  As a meeting organiser
  I want to send meeting proposals to potential participants to get their availability


 Scenario: send meeting proposal to 1 participant
   When the organizer has created a meeting proposal with title "Title", description "Description", organizer "test@gmail" and slot duration "2"
   And has added participant with "test1@gmail.com" email
   Then the response is a list with: "test1@gmail.com" and "www.google.com"


 Scenario: send meeting proposal to 2 participant
   When the organizer has created a meeting proposal with title "Title", description "Description", organizer "test@gmail" and slot duration "2"
   And has added participant with "test1@gmail.com" email
   And has added participant with "test2@gmail.com" email
   Then the response is a list with item 0: "test1@gmail.com" and "www.google.com"
   And the response is a list with item 1: "test2@gmail.com" and "www.google.com"


 Scenario: send meeting proposal without participants:
   When the organizer has created a meeting proposal with title "Title", description "Description", organizer "test@gmail" and slot duration "2"
   Then the response is a null list
