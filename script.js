function hideElements() {
    document.getElementById("weapons").style.visibility = "hidden";
    document.getElementById("scoreDetails").style.visibility = "hidden";
    document.getElementById("playAgain").style.visibility = "hidden";
    document.getElementById("cta").style.visibility = "hidden";
    document.querySelector("#startGame > span").textContent = "CLICK TO PLAY!";
}

hideElements();

// Start rock, paper, or scissors game when player clicks on div with "startGame" id. 

document.getElementById("startGame").addEventListener("click", playRound);

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

    document.getElementById("weapons").style.visibility = "initial";
    document.getElementById("cta").style.visibility = "initial";
    document.querySelector("#startGame > span").textContent = "Round 1/5";

    // Ask player to select "rock", "paper", or "scissors". 


    let weapons = document.querySelectorAll("#weapons > .weapon > img");
    weapons.forEach(weapon => {
        weapon.addEventListener("click", (event) => {
            playerChoice = `${event.target.id}`;
            document.querySelector("#startGame > span").textContent = `Round ${i + 1}/5`;
            game();
        });
    })

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
        if (playerChoice === getComputerChoice()) {
            playerScore++;
            computerScore++;
            i++;
        }

        // If player selected string that wins with computer's string, add 1 to playerScore. 
        else if (
            (playerChoice === "rock" && computerChoice === "scissors") ||
            (playerChoice === "paper" && computerChoice === "rock") ||
            (playerChoice === "scissors" && computerChoice === "paper")
        ) {
            playerScore++;
            i++;
        }

        // If computer selected string that wins with player's string, add 1 to computerScore.
        else {
            computerScore++;
            i++;
        }

        updateScore();
        checkIfFinished();

    }

    function updateScore() {
        document.querySelector("#weaponPlayer > img").src = "./images/" + playerChoice + ".png";

        document.querySelector("#weaponComputer > img").src = "./images/" + computerChoice + ".png";

        document.getElementById("scorePlayerComputer").textContent = `${playerScore} : ${computerScore}`;

        document.getElementById("scoreDetails").style.visibility = "visible";

    }


    // Set value of boolean variable keepGoing, which informs whether another round should happen.
    function checkIfFinished() {

        // List conditions when another round should not happen.
        if (
            // 3 rounds happened and one party wins by 3 points. 
            ((i === 3) && (Math.abs(playerScore - computerScore) === 3)) ||
            // 4 rounds happened and one party wins by 2 points. 
            ((i === 4) && (Math.abs(playerScore - computerScore) === 2)) ||
            // 5 rounds happened. 
            (i === 5)
        ) {

            // Call getResult() function to inform player about result. 
            getResult();
        }

        // If none of above condtions was met, set value of keepGoing variabe to true. 
        else {
            return;
        }
    }

    // Inform player about result.
    function getResult() {

        document.getElementById("weapons").style.visibility = "hidden";
        document.getElementById("scoreDetails").style.visibility = "hidden";
        document.getElementById("playAgain").style.visibility = "visible";
        document.getElementById("cta").style.visibility = "visible";

        document.getElementById("playAgain").addEventListener("click", () => document.location.reload(true));

        // If player won, inform player that s/he won and display score. 
        if (playerScore > computerScore) {

            document.querySelector("#startGame > span").textContent = `You won ${playerScore}:${computerScore}`;

            document.querySelector("#cta > span").textContent = "I'm proud, son!";
        }

        // If player lost, inform player that s/he lost and display score. 
        else if (playerScore < computerScore) {

            document.querySelector("#startGame > span").textContent = `You lost ${playerScore}:${computerScore}.`;

            document.querySelector("#cta > span").textContent = "I'm so sorry.";

        }

        // If there was a draw, inform player about the draw and display score. 
        else {
            document.querySelector("#startGame > span").textContent = `Draw ${playerScore}:${computerScore}.`;

            document.querySelector("#cta > span").textContent = "What a boring game.";
        }
    }



}