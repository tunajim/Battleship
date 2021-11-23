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
  var computerBoard = document.createElement("div");
  var playerBoard = document.createElement("div");
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

module.exports = {
  loadGame: loadGame,
  LoadBoard: LoadBoard
};