"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Gameboard = void 0;

var _fire = _interopRequireDefault(require("../images/fire.png"));

var _crossed = _interopRequireDefault(require("../images/crossed.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var Ship = require("./ship");

var _require = require("./DOM"),
    LoadBoard = _require.LoadBoard,
    createRestartButton = _require.createRestartButton;

var _require2 = require("./index"),
    takeTurn = _require2.takeTurn,
    replay = _require2.replay;

var Gameboard = function Gameboard(player) {
  var rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  var columns = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  var board = _generateBoard(rows, columns);

  var misses = [];
  var elements = [];
  var carrier = Ship(5, "carrier");
  var battleship = Ship(4, "battleship");
  var destroyer = Ship(3, "destroyer");
  var submarine = Ship(3, "submarine");
  var patrolBoat = Ship(2, "patrol-boat");
  var boats = [carrier, battleship, destroyer, submarine, patrolBoat];

  function _generateBoard(rows, columns) {
    var arr = [];

    for (var i = 0; i < columns.length; i++) {
      arr[i] = [];

      for (var j = 0; j < rows.length; j++) {
        arr[i][j] = rows[j];
      }
    }

    return arr;
  }

  var placeShip = function placeShip(ship, column, row, vertical, elem, index) {
    var playable = _checkPlayed(ship, column, row, vertical);

    if (!vertical && playable) {
      for (var i = column; i < ship.length + column; i++) {
        board[i][row] = {
          ship: ship.name,
          index: i - column
        };
        elem.querySelector("[data-coord-y=\"".concat(row, "\"][data-coord-x=\"").concat(i, "\"]")).dataset.ship = "".concat(boats[index.i].name);
      }

      index.i < 5 ? index.i += 1 : console.log("board set");
    } else if (vertical && playable) {
      for (var _i = row; _i < ship.length + row; _i++) {
        board[column][_i] = {
          ship: ship.name,
          index: _i - row
        };
        elem.querySelector("[data-coord-y=\"".concat(_i, "\"][data-coord-x=\"").concat(column, "\"]")).dataset.ship = "".concat(boats[index.i].name);
      }

      index.i += 1;
    } else {
      console.log("illegal move");
    }
  };

  var highlightShip = function highlightShip(elem, index, vertical) {
    var x = parseInt(elem.target.dataset.coordX, 10);
    var y = parseInt(elem.target.dataset.coordY, 10);
    var playerBoard = document.getElementById("player-board");

    var playable = _checkPlayed(boats[index.i], x, y, vertical);

    removeHighlight(elem, index);
    elem.target.classList.add("highlight");

    if (vertical && playable) {
      for (var i = y; i < boats[index.i].length + y; i++) {
        playerBoard.querySelector("[data-coord-x=\"".concat(x, "\"][data-coord-y=\"").concat(i, "\"]")).classList.add("highlight");
      }
    } else if (!vertical && playable) {
      for (var _i2 = x; _i2 < boats[index.i].length + x; _i2++) {
        playerBoard.querySelector("[data-coord-x=\"".concat(_i2, "\"][data-coord-y=\"").concat(y, "\"]")).classList.add("highlight");
      }
    } else {
      elem.target.classList.add("invalid");
    }
  };

  var removeHighlight = function removeHighlight(elem, index, vertical) {
    Array.from(elem.target.parentNode.children).forEach(function (elem) {
      elem.classList.remove("highlight", "invalid");
    });
  };

  var setBoard = function setBoard(elem, index, vertical, boardElem) {
    var set = false;
    var x = parseInt(elem.target.dataset.coordX, 10);
    var y = parseInt(elem.target.dataset.coordY, 10);
    placeShip(boats[index.i], x, y, vertical, boardElem, index);
  };

  function _checkPlayed(ship, col, row, vert) {
    var playable = true;
    var max = 11;

    if (!vert) {
      if (ship.length < max - col) {
        for (var i = col; i < ship.length + col; i++) {
          var cell = board[i][row];

          if (_typeof(cell) === "object") {
            playable = false;
          }
        }
      } else {
        playable = false;
      }
    } else {
      if (ship.length < max - row) {
        for (var _i3 = row; _i3 < ship.length + row; _i3++) {
          var _cell = board[col][_i3];

          if (_typeof(_cell) === "object") {
            playable = false;
          }
        }
      } else {
        playable = false;
      }
    }

    return playable;
  }

  var handleMove = function handleMove(e) {
    console.log(e.target);
    var col = 0;
    var row = 0;
    var name = "player one";
    col = e.target.dataset.coordX;
    row = e.target.dataset.coordY;
    e.target.parentNode.removeEventListener("click", handleMove);
    recieveAttack(name, col, row, e.target);
  };

  var randomMove = function randomMove(arr) {
    var elem = arr[Math.floor(Math.random() * 100)];
    var name = "computer";
    var col = elem.dataset.coordX;
    var row = elem.dataset.coordY;
    var played = recieveAttack(name, col, row, elem);
    if (played) randomMove(arr);
  };

  var recieveAttack = function recieveAttack(name, col, row, elem) {
    var played = false;
    var emptySpace = 1;
    var alertBox = document.getElementById("alert-box");
    if (row !== undefined && col !== undefined) if (board[col][row].length === emptySpace) {
      misses.push({
        col: col,
        row: row
      });
      board[col][row] = "miss";
      console.log("".concat(name, " missed"));
      alertBox.textContent = "".concat(name, " missed");
      elem.classList.add("miss");
      elem.dataset.played = true;
      elem.style.backgroundImage = "url(\"".concat(_crossed["default"], "\")");
    } else if (board[col][row] === "hit" || board[col][row] === "miss") {
      played = true;
      console.log("spot already played");
      alertBox.textContent = "spot already played";
      elem.dataset.played = true; // elem.parentNode.addEventListener("click", handleMove);
    } else {
      elem.style.backgroundImage = "url(\"".concat(_fire["default"], "\")");
      elem.dataset.played = true;
      console.log("".concat(name, "'s shot landed!"));
      alertBox.textContent = "".concat(name, "'s shot landed!");

      _updateHits(col, row, name, alertBox, elem);
    }
    return played;
  };

  function _updateHits(col, row, name, alertBox, elem) {
    var index = boats.findIndex(function (e) {
      return e.name === elem.dataset.ship;
    });
    var cell = document.querySelector("[data-coord-x=\"".concat(col, "\"][data-coord-y=\"").concat(row, "\"]"));

    for (var i = 0; i < boats.length; i++) {
      if (boats[i].name === board[col][row].ship) {
        boats[i].hit(board[col][row].index);
        boats[i].isSunk();
        board[col][row] = "hit";
      }

      if (boats[index].sunk) {
        alertBox.textContent = "".concat(boats[index].name, " was sunk by ").concat(name);
      }
    }
  }

  var allShipsSunk = function allShipsSunk(name) {
    var alertBox = document.getElementById("alert-box");
    var done = true;
    boats.forEach(function (element) {
      if (!element.sunk) done = false;
    });

    if (done) {
      alertBox.textContent = "".concat(name, " has sunken all of their enemies ships, ").concat(name, " wins!");
      createRestartButton(alertBox);
    }

    console.log(done);
    return done;
  };

  return {
    placeShip: placeShip,
    recieveAttack: recieveAttack,
    allShipsSunk: allShipsSunk,
    handleMove: handleMove,
    randomMove: randomMove,
    setBoard: setBoard,
    highlightShip: highlightShip,
    removeHighlight: removeHighlight,
    player: player,
    board: board,
    rows: rows,
    columns: columns,
    boats: boats,
    misses: misses
  };
};

exports.Gameboard = Gameboard;