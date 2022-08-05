// Start rock, paper, or scissors game when player clicks on button with "gameStart" id. 
document.getElementById("gameStart").addEventListener("click", playRound);

// Start game. 
function playRound() {

    // Create variable storing player's score and give it initial value of 0. 
    let playerScore = 0;

    // Create variable storing computer's score and give it initial value of 0. 
    let computerScore = 0;

    // Create variable storing player's choice ("rock", "paper", or "scissors").
    let playerChoice;

    // Create variable storing computer's choice ("rock", "paper", or "scissors").
    let computerChoice;

    // Create variable storing the number of rounds and give it initial value of 0. 
    let i = 0;

    // Create boolean variable informing if another round should happen.
    let keepGoing;

    // Ask player to select "rock", "paper", or "scissors". 
    function playerSelection() {

        // Prompt player to "Choose one of the three - rock, paper, or scissors" and store response in playerChoice variable. Convert the string to lower case. 
        playerChoice = prompt("Choose one of the three - rock, paper, or scissors").toLowerCase();

        // Display an alert "You must have made a typo." and call playerSelection() function if player didn't provide allowed string.
        if (!(playerChoice === "rock" || playerChoice === "paper" || playerChoice === "scissors")) {
            alert("You must have made a typo.")
            playerSelection();
        }

        // If player provided allowed string, return playerChoice variable.
        else {
            return (playerChoice);
        }
    }

    // Randomly select "rock", "paper", or "scissors" for computer (player's opponent).
    function getComputerChoice() {

        // Create array with three choices. 
        let gameArray = [
            "rock",
            "paper",
            "scissors"
        ]

        // Set computerChoice variable to randomly selected element from gameArray. 
        computerChoice = gameArray[Math.floor(Math.random() * 3)];

        // Return computerChoice variable.
        return (computerChoice);
    }

    // Play round. 
    function game() {

        // If player and computer selected the same string, add 1 to playerScore and computerScore variables.
        if (playerSelection() === getComputerChoice()) {
            playerScore++;
            computerScore++;
        }

        // If player selected string that wins with computer's string, add 1 to playerScore. 
        else if (
            (playerChoice === "rock" && computerChoice === "scissors") ||
            (playerChoice === "paper" && computerChoice === "rock") ||
            (playerChoice === "scissors" && computerChoice === "paper")
        ) {
            playerScore++;
        }

        // If computer selected string that wins with player's string, add 1 to computerScore.
        else {
            computerScore++;
        }

        // Alert user about string s/he chose, string computer chose, current score, and round number, in separate lines. 
        alert(`Your choice was ${playerChoice}.
        \nComputer's choice was ${computerChoice}.
        \nCurrent score is: You ${playerScore} : ${computerScore} Computer.
        \nRound ${i + 1}/5.`);
    }

    // Set value of boolean variable keepGoing, which informs whether another round should happen.
    function setKeepGoing() {

        // List conditions when another round should not happen.
        if (
            // 3 rounds happened and one party wins by 3 points. 
            ((i === 3) && (Math.abs(playerScore - computerScore) === 3)) ||
            // 4 rounds happened and one party wins by 2 points. 
            ((i === 4) && (Math.abs(playerScore - computerScore) === 2)) ||
            // 5 rounds happened. 
            (i === 5)
        ) {
            // If any of above condtions was met, set value of keepGoing variable to false. 
            keepGoing = false;

            // Call getResult() function to inform player about result. 
            getResult();
        }

        // If none of above condtions was met, set value of keepGoing variabe to true. 
        else {
            keepGoing = true;
        }

        // Return value of keepGoing variable. 
        return (keepGoing);
    }

    // While keepGoing variable is true, call game() function to play round. 
    while (setKeepGoing() === true) {
        game();

        // After every round add 1 to i variable, which counts the number of rounds that have been played. 
        i++;
    }

    // Inform player about result.
    function getResult() {

        // If player won, inform player that s/he won and display score. 
        if (playerScore > computerScore) {
            alert(`You won ${playerScore}:${computerScore}. 
            \nI'm proud, son!`);
        }

        // If player lost, inform player that s/he lost and display score. 
        else if (playerScore < computerScore) {
            alert(`You lost ${playerScore}:${computerScore}. 
            \nI'm so sorry.`);
        }

        // If there was a draw, inform player about the draw and display score. 
        else {
            alert(`Draw ${playerScore}:${computerScore}.`);
        }
    }

}