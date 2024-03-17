document.addEventListener("DOMContentLoaded", function () {
    // Retrieve scores from localStorage or set them to 0 if not present
    let computerScore = parseInt(localStorage.getItem('computerScore')) || 0;
    let yourScore = parseInt(localStorage.getItem('yourScore')) || 0;

    const options = document.querySelectorAll(".btn");
    const computerScoreDisplay = document.getElementById("txt2");
    const yourScoreDisplay = document.getElementById("txt3");
    const playAgainButton = document.getElementById("play");
    const resetButton = document.getElementById("reset");

    // Function to update score display
    function updateScoreDisplay() {
        computerScoreDisplay.textContent = computerScore;
        yourScoreDisplay.textContent = yourScore;
        if (computerScore === 15 || yourScore === 15) {
            playAgainButton.style.display = "block";
        } else {
            playAgainButton.style.display = "none";
        }
    }

    // Update score display on page load
    updateScoreDisplay();

    options.forEach(option => {
        option.addEventListener("click", function () {
            const computerChoice = Math.floor(Math.random() * 3); // 0 for Rock, 1 for Paper, 2 for Scissors

            let yourChoice;
            switch (this.dataset.choice) {
                case "rock":
                    yourChoice = 0; // Rock
                    break;
                case "paper":
                    yourChoice = 1; // Paper
                    break;
                case "scissors":
                    yourChoice = 2; // Scissors
                    break;
            }

            let result;
            if (yourChoice === computerChoice) {
                result = "tie";
            } else if ((yourChoice === 0 && computerChoice === 2) ||
                (yourChoice === 1 && computerChoice === 0) ||
                (yourChoice === 2 && computerChoice === 1)) {
                result = "win";
                yourScore++;
            } else {
                result = "lose";
                computerScore++;
            }

            localStorage.setItem('computerScore', computerScore);
            localStorage.setItem('yourScore', yourScore);

            updateScoreDisplay();
        });
    });

    playAgainButton.addEventListener("click", function () {
        computerScore = 0;
        yourScore = 0;
        localStorage.removeItem('computerScore');
        localStorage.removeItem('yourScore');
        updateScoreDisplay();
    });

    resetButton.addEventListener("click", function () {
        computerScore = 0;
        yourScore = 0;
        localStorage.setItem('computerScore', computerScore);
        localStorage.setItem('yourScore', yourScore);
        updateScoreDisplay();
    });
});
