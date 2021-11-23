
const container = document.getElementsByTagName("body");

const loadGame = () => {
  const overlay = document.createElement("div");
  overlay.id = "overlay";
  container[0].appendChild(overlay); 

  const logo = document.createElement("h1");
  logo.id = "logo";
  logo.textContent = "BATTLESHIP";
  overlay.appendChild(logo);

  const start = document.createElement("button");
  start.classList.add("button");
  start.textContent = "Start Game";
  overlay.appendChild(start);

  return { overlay, logo, start};
};

const LoadBoard = (board) => {
  const computerBoard = document.createElement("div");
  const playerBoard = document.createElement("div");

  computerBoard.id = "computer-board";
  playerBoard.id = "player-board";
  computerBoard.classList.add("board");
  playerBoard.classList.add("board");

  if (board.player === "human") {
    _populateBoard(board, playerBoard);
    container[0].appendChild(playerBoard);
  } else {
    _populateBoard(board, computerBoard);
    container[0].appendChild(computerBoard);
  }
};

const _populateBoard = (board, element) => {
  for (let i = 0; i < board.columns.length; i++) {
    const cell = document.createElement("div");
    _setAttributes(cell, board, i, 0);
    element.appendChild(cell);
    for (let j = 1; j < board.rows.length; j++) {
      const cell = document.createElement("div");
      _setAttributes(cell, board, i, j);
      element.appendChild(cell);
    }
  }
};

const _setAttributes = (cell, board, col, row) => {
  cell.classList.add("cell");
  if (board.board[col][row].constructor.name == "Object") {
    cell.dataset.ship = board.board[col][row].ship;
    cell.dataset.index = board.board[col][row].index;
  }
  cell.dataset.coordX = col;
  cell.dataset.coordY = row;
  return cell;
};

module.exports = { loadGame, LoadBoard };
