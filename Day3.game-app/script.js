let playerScore = 0;
let computerScore = 0;
let moves = 0;
const totalCount = 3;

const playGame = () => {
  const rockBtn = document.querySelector(".rock");
  const paperBtn = document.querySelector(".paper");
  const scissorBtn = document.querySelector(".scissor");

  const playerOptions = [rockBtn, paperBtn, scissorBtn];
  const computerOptions = ["가위", "바위", "보"];

  playerOptions.forEach((option) => {
    option.addEventListener("click", () => {
      const movesLeft = document.querySelector(".movesleft");
      moves++;
      movesLeft.innerText = `${moves} / ${totalCount}`;

      const choiceNumber = Math.floor(Math.random() * 3);
      const computerChoice = computerOptions[choiceNumber];

      winner(option.innerText, computerChoice);

      if (moves === totalCount) {
        gameOver(playerOptions, movesLeft);
      }
    });
  });
};

const gameOver = (playerOptions, movesLeft) => {
  const result = document.querySelector(".result");
  const reloadBtn = document.querySelector(".reload");
  const options = document.querySelector(".options");

  options.style.display = "none";

  if (playerScore > computerScore) {
    result.innerText = "WINNER";
  } else if (playerScore < computerScore) {
    result.innerText = "LOSER";
    result.style.backgroundColor = "#e74c3c";
  } else {
    result.innerText = "DRAW";
    result.style.backgroundColor = "#bdc3c7";
  }
  result.classList.add("resultWinner");
  movesLeft.style.color = "white";

  reloadBtn.innerText = "다시 시작";
  reloadBtn.style.display = "flex";
  reloadBtn.addEventListener("click", () => {
    window.location.reload();
  });
};

const winner = (player, computer) => {
  const result = document.querySelector(".result");
  const playerScoreBoard = document.querySelector(".p-count");
  const computerScoreBoard = document.querySelector(".c-count");
  const playerChoice = document.querySelector(".p-choice");
  const computerChoice = document.querySelector(".c-choice");

  playerChoice.innerText = player;
  computerChoice.innerText = computer;
  playerChoice.classList.remove("winnerChoice", "loserChoice");
  computerChoice.classList.remove("winnerChoice", "loserChoice");

  if (player === computer) {
    result.textContent = "DRAW";
  } else {
    const isPlayerWin =
      (player === "바위" && computer === "보") ||
      (player === "가위" && computer === "바위") ||
      (player === "보" && computer === "가위")
        ? false
        : true;

    result.textContent = isPlayerWin ? "WIN" : "LOSE";
    isPlayerWin ? playerScore++ : computerScore++;

    isPlayerWin
      ? (playerChoice.classList.add("winnerChoice"),
        computerChoice.classList.add("loserChoice"))
      : (computerChoice.classList.add("winnerChoice"),
        playerChoice.classList.add("loserChoice"));

    computerScoreBoard.textContent = computerScore;
    playerScoreBoard.textContent = playerScore;
  }
};

playGame();
