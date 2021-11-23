"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var Ship = require("./ship");

var Gameboard = function Gameboard(player) {
  var rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  var columns = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  var board = _generateBoard(rows, columns);

  var misses = [];
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

  var placeShip = function placeShip(ship, column, row, vertical) {
    console.log({
      column: column,
      row: row
    });

    var playable = _checkPlayed(ship, column, row, vertical);

    if (!vertical && playable) {
      for (var i = column; i < ship.length + column; i++) {
        board[i][row] = {
          ship: ship.name,
          index: i - column
        };
      }
    } else if (vertical && playable) {
      for (var _i = row; _i < ship.length + row; _i++) {
        board[column][_i] = {
          ship: ship.name,
          index: _i - row
        };
      }
    } else {
      console.log("invalid position, ship must remain on board");
      placeShip(ship, Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), vertical);
    }
  };

  function _checkPlayed(ship, col, row, vert) {
    var playable = true;
    var max = 10;
    console.log({
      vert: vert
    });

    if (!vert) {
      if (ship.length < max - col) {
        for (var i = col; i < ship.length + col; i++) {
          var cell = board[i][row];
          console.log(_typeof(cell));

          if (_typeof(cell) === "object") {
            playable = false;
            console.log("ship already placed");
          }
        }
      } else {
        playable = false;
      }
    } else {
      if (ship.length < max - row) {
        for (var _i2 = row; _i2 < ship.length + row; _i2++) {
          var _cell = board[col][_i2];
          console.log(_typeof(_cell));

          if (_typeof(_cell) === "object") {
            playable = false;
            console.log("ship already placed");
          }
        }
      } else {
        playable = false;
      }
    }

    console.log({
      vert: vert
    });
    console.log({
      playable: playable
    });
    console.log({
      ship: ship
    });
    return playable;
  }

  var recieveAttack = function recieveAttack(name, column, row) {
    var result = null;

    if (board[column][row].length === 1) {
      misses.push({
        column: column,
        row: row
      });
      board[column][row] = "miss";
      result = console.log("".concat(name, " missed"));
    } else if (board[column][row] === "hit") {
      result = console.log("spot already hit");
    } else {
      _updateHits(column, row);

      result = console.log("".concat(name, "'s shot landed!"));
    }

    return result;
  };

  function _updateHits(col, row) {
    for (var i = 0; i < boats.length; i++) {
      if (boats[i].name === board[col][row].ship) {
        boats[i].hit(board[col][row].index);
        board[col][row] = "hit";
      }
    }
  }

  var allShipsSunk = function allShipsSunk(name) {
    var done = true;
    boats.forEach(function (element) {
      if (!element.sunk) done = false;
    });
    if (done) console.log("".concat(name, " has sunken all of their enemies ships, ").concat(name, " wins!"));
    console.log({
      done: done
    });
    return done;
  };

  return {
    placeShip: placeShip,
    recieveAttack: recieveAttack,
    allShipsSunk: allShipsSunk,
    player: player,
    board: board,
    rows: rows,
    columns: columns,
    boats: boats,
    misses: misses
  };
};

module.exports = Gameboard;