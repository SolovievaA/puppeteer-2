Feature: Testing movie ticket booking through the app
    Scenario: The user must book one available movie ticket
        Given user is on "/index.php" page
        When user choose date
        When user choose time
        When user choose a sit
        When user click on the booking button
        When user click on the button to get booking code
        Then user get the code and text "Электронный билет"

    Scenario: The user must book three available movie tickets
        Given user is on "/index.php" page
        When user choose date
        When user choose time
        When user choose a first sit
        When user choose a second sit
        When user choose a third sit
        When user click on the booking button 
        When user click on the button to get booking code
        Then user get the code and text "Электронный билет"  

    Scenario: The user must try to book a ticket for an occupied seat 
        Given user is on "/index.php" page
        When user choose date
        When user choose time
        When user book a seat that is occupied
        When user click on the booking button
        Then book button is inactive   


       