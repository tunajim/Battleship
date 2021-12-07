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

  return { overlay, logo, start };
};

const LoadBoard = (board) => {
  const comp = document.createElement("div");
  const pl = document.createElement("div");

  comp.id = "computer-board";
  pl.id = "player-board";
  comp.classList.add("board");
  pl.classList.add("board");

  if (board.player === "human") {
    _populateBoard(board, pl);
    container[0].appendChild(pl);
  } else {
    _populateBoard(board, comp);
    container[0].appendChild(comp);
  }

  return { comp, pl };
};

const ClearBoard = () => {
  const boards = document.querySelectorAll(".board");
  boards.forEach((elem) => {
    elem.remove();
  });
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

const vertButton = () => {
  const button = document.createElement("button");
  button.id = "vertical";
  button.textContent = "Switch Direction";
  container[0].appendChild(button);
};

const loadAlertBox = () => {
  const alertBox = document.createElement("div");
  alertBox.id = "alert-box";
  alertBox.textContent =
    "Welcome to Battleship! The top board is enemy waters! Place 5 ships on bottom board to start game";

  container[0].appendChild(alertBox);

  return alertBox;
};

function _hideAlertBox(e) {
  e.target.parentNode.classList.add("hidden");
}

const createRestartButton = (alertBox) => {
  const restartButton = document.createElement("button");
  restartButton.id = "restart-button";
  restartButton.textContent = "Restart";
  alertBox.after(restartButton);
};

module.exports = {
  loadGame,
  LoadBoard,
  ClearBoard,
  vertButton,
  loadAlertBox,
  createRestartButton,
};
