const board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const difficulty = ["easy", "hard"];
const scores = [0, 0];

const btnElts = document.querySelectorAll(".game-board-btn");
const playerScoreElt = document.querySelector(".player__score--computer");
const computeScoreElt = document.querySelector(".player__score--computer");
console.log(playerElt);
console.log(computerElt);

function getSymbol(player) {
  return player == "computer" ? "O" : "X";
}

function updateBtns(btns, move, player) {
  let element = btns[move];
  element.textContent = getSymbol(player);
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
  let emptyFields = [];
  for (let i = 0; i < 9; i++) {
    if (board[i] != "X" && board[i] != "O") {
      emptyFields.push(i);
    }
  }

  if (emptyFields.length === 0) {
    console.log("Match is Tie!!");
  }

  return emptyFields[Math.floor(Math.random() * emptyFields.length)];
}

function getHardComputerMove(board) {
  for (let i = 0; i < 9; i++) {
    if (["X", "O"].indexOf(board[i]) < 0) {
      const newBoard = structuredClone(board);
      newBoard[i] = "X";
      if (checkWin(newBoard)) return i;
    }
  }

  for (let i = 0; i < 9; i++) {
    if (["X", "O"].indexOf(board[i]) < 0) {
      const newBoard = structuredClone(board);
      newBoard[i] = "O";
      if (checkWin(newBoard)) return i;
    }
  }

  return getEasyComputerMove(board);
}

function checkTie(board) {
  const x = board.filter((cell) => cell === "X").length;
  const o = board.filter((cell) => cell === "O").length;
  if (x + o === 9) {
    return true;
  }
  return false;
}

function checkWin(board) {
  // check rows
  for (let i = 0; i < 9; i += 3) {
    if (
      (board[i] === "X" && board[i + 1] === "X" && board[i + 2] === "X") ||
      (board[i] === "O" && board[i + 1] === "O" && board[i + 2] === "O")
    ) {
      return true;
    }
  }

  // check columns
  for (let i = 0; i < 3; i++) {
    if (
      (board[i] === "X" && board[i + 3] === "X" && board[i + 6] === "X") ||
      (board[i] === "O" && board[i + 3] === "O" && board[i + 6] === "O")
    ) {
      return true;
    }
  }

  // check diagonals
  if (
    (board[0] === board[4] && board[4] === board[8]) ||
    (board[2] === board[4] && board[4] === board[6])
  ) {
    if (board[4] === "X" || board[4] === "O") {
      return true;
    }
  }

  return false;
}

function updateScore(player, scores) {
  player == "computer" ? scores[1]++ : scores[0]++;
}

function onRestarBtnClick() {}

function onBoardBtnClick(el) {
  let player = "player";
  let move = el.getAttribute("data-board-move");

  if (["X", "O"].indexOf(board[move]) >= 0) {
    return;
  }

  updateBoard(move, board, player);
  updateBtns(btnElts, move, player);
  if (checkWin(board)) {
    updateScore(player);
  }

  player = "computer";
  move = getComputerMove(board, "");
  updateBoard(move, board, player);
  updateBtns(btnElts, move, player);
  if (checkWin(board)) {
    updateScore(player);
  }
}
