console.log("Sachiththa");

board = [1, 2, 3, 4, 5, 6, 7, 8, 9];
players = ["player1", "player2"];
difficulty = ["easy", "hard"];

function getMove(currentPlayer, board, difficulty) {
  print("get move");
}

function updateBoard(move, player, board) {
  board[move] = "X";
  print("update boad");
}

function switchPlayer(currentPlayer, player) {
  print("swithc player");
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
    if (board[i] !== "X" && board[i] !== "O") {
      emptyFields.push(i);
    }
  }

  if (emptyFields.length === 0) {
    console.log("Match is Tie!!");
  }

  return emptyFields[Math.floor(Math.random() * emptyFields.length)];
}

move = getMove(currentPlayer, board, difficulty);
