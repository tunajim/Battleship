"use strict";

var Player = function Player(name) {
  var attack = function attack(gameboard, col, row) {
    gameboard.recieveAttack(name, col, row);
  };

  return {
    attack: attack,
    name: name
  };
};

var Computer = function Computer(name) {
  var unhit = 1;

  var randomAttack = function randomAttack(gameboard) {
    var col = Math.floor(Math.random() * 10);
    var row = Math.floor(Math.random() * 10);
    gameboard.board[col][row].length === unhit ? _attack(gameboard, col, row) : randomAttack(gameboard);
  };

  var _attack = function _attack(gameboard, col, row) {
    gameboard.board.recieveAttack(name, col, row);
  };

  return {
    randomAttack: randomAttack,
    name: name
  };
};

module.exports = {
  Player: Player,
  Computer: Computer
};