"use strict";

var container = document.getElementsByTagName("body");

var loadGame = function loadGame() {
  var overlay = document.createElement("div");
  overlay.id = "overlay";
  container[0].appendChild(overlay);
  var logo = document.createElement("h1");
  logo.id = "logo";
  logo.textContent = "BATTLESHIP";
  overlay.appendChild(logo);
  var start = document.createElement("button");
  start.classList.add("button");
  start.textContent = "Start Game";
  overlay.appendChild(start);
  return {
    overlay: overlay,
    logo: logo,
    start: start
  };
};

var LoadBoard = function LoadBoard(board) {
  var comp = document.createElement("div");
  var pl = document.createElement("div");
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

  return {
    comp: comp,
    pl: pl
  };
};

var ClearBoard = function ClearBoard() {
  var boards = document.querySelectorAll(".board");
  boards.forEach(function (elem) {
    elem.remove();
  });
};

var _populateBoard = function _populateBoard(board, element) {
  for (var i = 0; i < board.columns.length; i++) {
    var cell = document.createElement("div");

    _setAttributes(cell, board, i, 0);

    element.appendChild(cell);

    for (var j = 1; j < board.rows.length; j++) {
      var _cell = document.createElement("div");

      _setAttributes(_cell, board, i, j);

      element.appendChild(_cell);
    }
  }
};

var _setAttributes = function _setAttributes(cell, board, col, row) {
  cell.classList.add("cell");

  if (board.board[col][row].constructor.name == "Object") {
    cell.dataset.ship = board.board[col][row].ship;
    cell.dataset.index = board.board[col][row].index;
  }

  cell.dataset.coordX = col;
  cell.dataset.coordY = row;
  return cell;
};

var vertButton = function vertButton() {
  var button = document.createElement("button");
  button.id = "vertical";
  button.textContent = "Switch Direction";
  container[0].appendChild(button);
};

var loadAlertBox = function loadAlertBox() {
  var alertBox = document.createElement("div");
  alertBox.id = "alert-box";
  alertBox.textContent = "Welcome to Battleship! The top board is enemy waters, please place your ships on the board below";
  container[0].appendChild(alertBox);
  return alertBox;
};

function _hideAlertBox(e) {
  e.target.parentNode.classList.add("hidden");
}

var createRestartButton = function createRestartButton(alertBox) {
  var restartButton = document.createElement("button");
  restartButton.id = "restart-button";
  restartButton.textContent = "Restart";
  alertBox.after(restartButton);
};

module.exports = {
  loadGame: loadGame,
  LoadBoard: LoadBoard,
  ClearBoard: ClearBoard,
  vertButton: vertButton,
  loadAlertBox: loadAlertBox,
  createRestartButton: createRestartButton
};