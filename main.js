const board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const scores = [0, 0];
let playerName = "Test";

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
  return checkTie(board) || checkTie(board);
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
      ["X", "O"].includes(board[a])
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

function loadScores(scores) {
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
}

function updatePlayerNameUI(name) {
  const elt = document.getElementById("player-name");
  elt.textContent = name;
}

function loadPlayerName() {
  playerName = localStorage.getItem("playerName") || "Test";
}

function updatePlayerName(name) {
  playerName = name;
  localStorage.setItem("playerName", playerName);
}

function onNewGameBtnClick() {
  document.getElementById("player-modal").style.display = "block";
}

function handleFormSubmit(event) {
  event.preventDefault(); // Prevent form submission

  const playerNameInput = document.getElementById("playerName");
  const difficultyRadios = document.querySelectorAll(
    'input[name="difficulty"]:checked'
  );

  // Retrieve the values from the form
  const playerName = playerNameInput.value;
  const difficulty =
    difficultyRadios.length > 0 ? difficultyRadios[0].value : "";

  if (playerName.trim() === "" || difficulty === "") {
    // Display a warning message using a browser popup
    alert("Please fill in all fields.");
    return; // Stop further execution
  }

  // Store the values in local storage
  localStorage.setItem("playerName", playerName);
  localStorage.setItem("difficulty", difficulty);
  localStorage.setItem("playerScore", 0);
  localStorage.setItem("computerScore", 0);

  // Optionally, perform any additional actions here

  // Reset the form
  window.location.href = "./pages/game.page/game.page.html";
  event.target.reset();
}

function onBoardBtnClick(el) {
  const move = el.getAttribute("data-board-move");
  if (["X", "O"].includes(board[move])) {
    return;
  }

  updateBoard(move, board, "player");
  updateBoardUI(board);
  if (checkWin(board)) {
    updateScore("player", scores);
    updateScoresUI(scores);
  }

  updateBoard(getComputerMove(board, ""), board, "computer");
  updateBoardUI(board);
  if (checkWin(board)) {
    updateScore("computer", scores);
    updateScoresUI(scores);
  }
}

function main() {
  loadScores(scores);

  const storedPlayerName = localStorage.getItem("playerName");
  if (storedPlayerName) {
    playerName = storedPlayerName;
    updatePlayerNameUI(playerName);
  } else {
    onNewGameBtnClick();
  }

  updateScoresUI(scores);
}

main();
