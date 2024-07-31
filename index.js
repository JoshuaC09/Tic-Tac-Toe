let playerText = document.getElementById("playerText");
let restartBtn = document.getElementById("restartBtn");
let boxes = Array.from(document.getElementsByClassName("box"));
let chooseXBtn = document.getElementById("chooseX");
let chooseOBtn = document.getElementById("chooseO");
let xScoreDisplay = document.getElementById("xScore");
let oScoreDisplay = document.getElementById("oScore");

let winnerIndicator = getComputedStyle(document.body).getPropertyValue(
  "--winning-blocks"
);

const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = X_TEXT;
let spaces = Array(9).fill(null);

let gameActive = false;
let xScore = 0;
let oScore = 0;

const startGame = () => {
  boxes.forEach((box) => box.addEventListener("click", boxClicked));
};

chooseXBtn.addEventListener("click", () => chooseSymbol(X_TEXT));
chooseOBtn.addEventListener("click", () => chooseSymbol(O_TEXT));

function chooseSymbol(symbol) {
  currentPlayer = symbol;
  playerText.innerText = `Current Player: ${currentPlayer}`;
  gameActive = true;
  chooseXBtn.disabled = true;
  chooseOBtn.disabled = true;
}

function boxClicked(e) {
  if (!gameActive) return;

  const id = e.target.id;
  if (!spaces[id]) {
    spaces[id] = currentPlayer;
    e.target.innerText = currentPlayer;

    if (playerHasWon() !== false) {
      playerText.innerText = `${currentPlayer} has won!`;
      let winning_blocks = playerHasWon();
      winning_blocks.map(
        (box) => (boxes[box].style.backgroundColor = winnerIndicator)
      );
      gameActive = false;
      updateScore();
      return;
    }

    if (isBoardFull()) {
      playerText.innerText = "It's a draw!";
      gameActive = false;
      return;
    }

    currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;
    playerText.innerText = `Current Player: ${currentPlayer}`;
  }
}

function updateScore() {
  if (currentPlayer === X_TEXT) {
    xScore++;
    xScoreDisplay.innerText = `X: ${xScore}`;
  } else {
    oScore++;
    oScoreDisplay.innerText = `O: ${oScore}`;
  }
}

function isBoardFull() {
  return spaces.every((space) => space !== null);
}
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function playerHasWon() {
  for (const condition of winningCombos) {
    let [a, b, c] = condition;
    if (spaces[a] && spaces[a] == spaces[b] && spaces[a] == spaces[c]) {
      return [a, b, c];
    }
  }
  return false;
}
restartBtn.addEventListener("click", restart);

function restart() {
  spaces.fill(null);
  boxes.forEach((box) => {
    box.innerText = "";
    box.style.backgroundColor = "";
  });
  playerText.innerText = "Tic Tac Toe";
  currentPlayer = X_TEXT;
  gameActive = false;
  chooseXBtn.disabled = false;
  chooseOBtn.disabled = false;
}

startGame();
