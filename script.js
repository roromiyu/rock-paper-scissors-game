// ---------- 1. Variables ----------
let userScore = 0;
let computerScore = 0;

const userScoreSpan = document.getElementById("user-score");
const computerScoreSpan = document.getElementById("computer-score");
const resultText = document.getElementById("result");
const choices = document.querySelectorAll(".choice");
const resetBtn = document.getElementById("reset-btn");
const difficultySelect = document.getElementById("difficulty");

// ---------- 2. Counter Function (for Medium/Hard AI) ----------
function counterMove(move) {
  if (move === "rock") return "paper";
  if (move === "paper") return "scissors";
  if (move === "scissors") return "rock";
}

// ---------- 3. Get Computer Choice (AI Difficulty) ----------
function getComputerChoice(userChoice) {
  const options = ["rock", "paper", "scissors"];
  const difficulty = difficultySelect.value;

  if (difficulty === "easy") {
    return options[Math.floor(Math.random() * 3)];
  }

  if (difficulty === "medium") {
    return Math.random() < 0.5
      ? options[Math.floor(Math.random() * 3)]
      : counterMove(userChoice);
  }

  if (difficulty === "hard") {
    return counterMove(userChoice);
  }
}

// ---------- 4. Update Score Colors ----------
function updateScoreColors() {
  if (userScore > computerScore) {
    userScoreSpan.style.color = "#9900ff3b";   // Green if user is winning
    computerScoreSpan.style.color = "white";
  } else if (computerScore > userScore) {
    computerScoreSpan.style.color = "#ff4d4d51"; // Red if computer is winning
    userScoreSpan.style.color = "white";
  } else {
    userScoreSpan.style.color = "white";   // Equal score
    computerScoreSpan.style.color = "white";
  }
}

// ---------- 5. Play Game ----------
function playGame(userChoice) {
  // 5.1 Computer "thinking" animation
  resultText.textContent = "Computer is thinking...";
  resultText.className = "result-text thinking";

  setTimeout(() => {
    const computerChoice = getComputerChoice(userChoice);

    // 5.2 Decide result
    if (userChoice === computerChoice) {
      resultText.textContent = "It's a Draw!";
      resultText.className = "result-text";
    } else if (
      (userChoice === "rock" && computerChoice === "scissors") ||
      (userChoice === "paper" && computerChoice === "rock") ||
      (userChoice === "scissors" && computerChoice === "paper")
    ) {
      userScore++;
      resultText.textContent = "You Win! 🎉";
      resultText.className = "result-text win";
    } else {
      computerScore++;
      resultText.textContent = "Computer Wins! 💻";
      resultText.className = "result-text lose";
    }

    // 5.3 Update scoreboard
    userScoreSpan.textContent = userScore;
    computerScoreSpan.textContent = computerScore;

    // 5.4 Update score colors
    updateScoreColors();

  }, 800); // 0.8s delay for computer thinking
}

// ---------- 6. Button Event Listeners ----------
choices.forEach(button => {
  button.addEventListener("click", () => {
    playGame(button.dataset.choice);
  });
});

// ---------- 7. Reset Button ----------
resetBtn.addEventListener("click", () => {
  userScore = 0;
  computerScore = 0;

  userScoreSpan.textContent = 0;
  computerScoreSpan.textContent = 0;

  resultText.textContent = "Choose your move";
  resultText.className = "result-text";

  updateScoreColors();
});
