const board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const players = ["player1", "player2"];
const difficulty = ["easy", "hard"];
const playerSymbol = {
  player1: "X",
  player2: "O",
};
let btns = document.querySelectorAll(".game-board-btn");
let player = "player1";

function test(btns, move, player) {
  let element = btns[move];
  element.textContent = playerSymbol[player];
}

function getMove(player, board, difficulty) {
  if (player === "player2") {
    return Promise.resolve(getBestMove(board, player));
  }

  return waitForBoardBtnClick();
}

function updateBoard(move, player, board) {
  board[move] = playerSymbol[player];
}

function switchPlayer(players, player) {
  currentPlayerIndex = players.indexOf(player);
  nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
  return players[nextPlayerIndex];
}

function gameOver(board) {
  return checkTie(board) || checkTie(board);
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

function getBestMove(board, player) {
  for (let i = 0; i < 9; i++) {
    if (["X", "O"].indexOf(board[i]) < 0) {
      const newBoard = structuredClone(board);
      newBoard[i] = playerSymbol[(player.indexOf(player) + 1) % players.length];
      if (checkWin(newBoard)) return i;
    }
  }

  for (let i = 0; i < 9; i++) {
    if (["X", "O"].indexOf(board[i]) < 0) {
      const newBoard = structuredClone(board);
      newBoard[i] = playerSymbol[player];
      if (checkWin(newBoard)) return i;
    }
  }

  return getComputerMove(board);
}

function checkTie(board) {
  const x = board.filter((cell) => cell === "X").length;
  const o = board.filter((cell) => cell === "O").length;
  if (x + o === 9) {
    return true;
  }
  return false;
}

function getComputerMove(board) {
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

function waitForBoardBtnClick() {
  return new Promise((resolve, reject) => {
    window.onBoardBtnClick = (element) => {
      resolve(element.getAttribute("data-board-move"));
    };
  });
}

async function main() {
  for (let i = 1; i < 10; i++) {
    console.log(board);
    let move = await getMove(player, board, "");
    updateBoard(move, player, board);
    test(btns, move, player);
    player = switchPlayer(players, player);
    console.log(board);
  }
}

main();
