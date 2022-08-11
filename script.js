const weapons = document.getElementById("weapons");
const scoreDetails = document.getElementById("scoreDetails");
const playAgain = document.getElementById("playAgain");
const cta = document.getElementById("cta")
const startGame = document.getElementById("startGame");
const startGameSpan = document.querySelector("#startGame > span");
const weaponImages = document.querySelectorAll("#weapons > .weapon > img");
const playerImage = document.querySelector("#weaponPlayer > img");
const computerImage = document.querySelector("#weaponComputer > img");
const scorePlayerComputer = document.getElementById("scorePlayerComputer");
const ctaSpan = document.querySelector("#cta > span");
const footer = document.querySelector("footer");

// Step 1 in the flow - hide all DOM elements other than startGameSpan and footer.
function hideElements() {
    weapons.style.visibility = "hidden";
    scoreDetails.style.visibility = "hidden";
    playAgain.style.visibility = "hidden";
    ctaSpan.textContent = "ROCK PAPER SCISSORS";
    startGameSpan.textContent = "CLICK TO PLAY!";
}

hideElements();

// Start rock paper scissors when player clicks startGame. 
startGame.addEventListener("click", playRound);

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

    // Step 2 in the flow - unhide weapons and cta, hide footer, change text of startGameSpan.
    weapons.style.visibility = "initial";
    footer.style.visibility = "hidden";
    ctaSpan.textContent = "CHOOSE ONE OF THE THREE";
    startGameSpan.textContent = "Round 1/5";
    startGame.removeEventListener("click", playRound);
    startGame.classList.toggle("pointer");

    // Add click listener to all weaponImages; store player's choices, update round count, call game() function.   
    weaponImages.forEach(weaponImage => {
        weaponImage.addEventListener("click", (event) => {
            playerChoice = `${event.target.id}`;
            startGameSpan.textContent = `Round ${i + 1}/5`;
            game();
        });
    });

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

        // Show player-selected weapon. 
        playerImage.src = "./images/" + playerChoice + ".png";

        // Show computer-selected weapon.
        computerImage.src = "./images/" + computerChoice + ".png";

        // Show current score. 
        scorePlayerComputer.textContent = `${playerScore}:${computerScore}`;

        // Step 3 in the flow - unhide scoreDetails.
        scoreDetails.style.visibility = "visible";

    }

    // Check if the game should finish. 
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
        // If none of above condtions was met, continue playing. 
        else {
            return;
        }
    }

    // Inform player about result.
    function getResult() {

        // Step 4 in the flow - unhide cta, hide weapons, scoreDetails, and playAgain.
        weapons.style.visibility = "hidden";
        scoreDetails.style.visibility = "hidden";
        playAgain.style.visibility = "visible";
        cta.style.visibility = "visible";

        playAgain.addEventListener("click", () => document.location.reload(true));

        // If player won, inform player that s/he won, display score, and play victory sound.
        if (playerScore > computerScore) {

            startGameSpan.textContent = `You won ${playerScore}:${computerScore}`;

            ctaSpan.textContent = "I'm proud, son!";

            var audio = new Audio('./sounds/success-fanfare-trumpets-6185.mp3');
            audio.play();
        }

        // If player lost, inform player that s/he lost, display score, and play failure sound.
        else if (playerScore < computerScore) {

            startGameSpan.textContent = `You lost ${playerScore}:${computerScore}`;

            ctaSpan.textContent = "I'm so sorry.";

            var audio = new Audio('./sounds/videogame-death-sound-43894.mp3');
            audio.play();

        }

        // If there was a draw, inform player about the draw, display score, and play yawn soud. 
        else {
            startGameSpan.textContent = `Draw ${playerScore}:${computerScore}`;

            ctaSpan.textContent = "What a boring game.";

            var audio = new Audio('./sounds/yawn-42499.mp3');
            audio.play();
        }
    }
}