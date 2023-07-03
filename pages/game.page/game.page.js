const board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const scores = [0, 0];

function getSymbol(player) {
  return player === "computer" ? "O" : "X";
}

function updateBoardUI(board) {
  const elts = document.querySelectorAll(".game-board-btn");
  for (let i = 0; i < board.length; i++) {
    elts[i].textContent = typeof board[i] === "number" ? " " : board[i];
  }
}

function getComputerMove(board, difficulty) {
  if (difficulty === "easy") {
    return getEasyComputerMove(board);
  }

  return getHardComputerMove(board);
}

function updateBoard(move, board, player) {
  board[move] = getSymbol(player);
}

function gameOver(board) {
  return checkTie(board) || checkWin(board);
}

function getEasyComputerMove(board) {
  const emptyFields = board.filter((cell) => ![board, "X", "O"].includes(cell));
  if (emptyFields.length === 0) {
    console.log("Match is Tie!!");
  }
  return emptyFields[Math.floor(Math.random() * emptyFields.length)];
}

function getHardComputerMove(board) {
  for (let i = 0; i < 9; i++) {
    if (!["X", "O"].includes(board[i])) {
      const newBoard = [...board];
      newBoard[i] = "X";
      if (checkWin(newBoard)) return i;
    }
  }

  for (let i = 0; i < 9; i++) {
    if (!["X", "O"].includes(board[i])) {
      const newBoard = [...board];
      newBoard[i] = "O";
      if (checkWin(newBoard)) return i;
    }
  }

  return getEasyComputerMove(board);
}

function checkTie(board) {
  const x = board.filter((cell) => cell === "X").length;
  const o = board.filter((cell) => cell === "O").length;
  return x + o === 9;
}

function checkWin(board) {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (
      board[a] === board[b] &&
      board[b] === board[c] &&
      ["X", "O"].includes(board[a]) &&
      typeof board[a] === "string" // Ensure it's a valid value (X or O)
    ) {
      return true;
    }
  }

  return false;
}

function updateScoresUI(scores) {
  const computerScoreElt = document.querySelector(".player__score--computer");
  const playerScoreElt = document.querySelector(".player__score--human");

  playerScoreElt.textContent = scores[0];
  computerScoreElt.textContent = scores[1];
}

function updateScore(player, scores) {
  player === "computer" ? scores[1]++ : scores[0]++;
  localStorage.setItem("playerScore", scores[0]);
  localStorage.setItem("computerScore", scores[1]);
}

function updatePlayerNameUI(name) {
  const elt = document.getElementById("player-name");
  elt.textContent = name;
}

function onNewGameBtnClick() {
  reset(board, scores);
}

function resetBoard(board) {
  for (let i = 0; i < board.length; i++) {
    board[i] = i;
  }
  updateBoardUI(board);
}

function resetScores(scores) {
  scores[0] = scores[1] = 0;
  localStorage.setItem("playerScore", scores[0]);
  localStorage.setItem("computerScore", scores[1]);
  updateScoresUI(scores);
}

function reset(board, scores) {
  resetBoard(board);
  resetScores(scores);
}

function onBoardBtnClick(el) {
  if (gameOver(board)) {
    resetBoard(board);
    return;
  }

  const move = el.getAttribute("data-board-move");
  if (board[move] === "X" || board[move] === "O") {
    return;
  }

  updateBoard(move, board, "player");
  updateBoardUI(board);
  if (checkWin(board)) {
    updateScore("player", scores);
    updateScoresUI(scores);
    return;
  }

  const computerMove = getComputerMove(board, "");
  updateBoard(computerMove, board, "computer");
  updateBoardUI(board);
  if (checkWin(board)) {
    updateScore("computer", scores);
    updateScoresUI(scores);
  }
}

function startGame() {
  let playerScore = localStorage.getItem("playerScore");
  if (!playerScore) {
    playerScore = 0;
    localStorage.setItem("playerScore", playerScore);
  }

  let computerScore = localStorage.getItem("computerScore");
  if (!computerScore) {
    computerScore = 0;
    localStorage.setItem("computerScore", computerScore);
  }

  scores[0] = parseInt(playerScore);
  scores[1] = parseInt(computerScore);

  const playerName = localStorage.getItem("playerName");
  if (!playerName) {
    // redirect to main page
    window.location.href = "../index.html";
  }

  updatePlayerNameUI(playerName);
  updateScoresUI(scores);
}

startGame();
