"use strict";

var _require = require('../player'),
    Player = _require.Player,
    Computer = _require.Computer;

var Gameboard = require("../gameboard");

test('making new player or computer will return object with attack function and player name', function () {
  var player = Player("tunajim");
  var computer = Computer("orochimaru");
  expect(player).toEqual({
    attack: player.attack,
    name: "tunajim"
  });
  expect(computer).toEqual({
    randomAttack: computer.randomAttack,
    name: "orochimaru"
  });
});
test('when a player attacks, update opponents board', function () {
  var player = Player("tunajim");
  var computer = Computer("orochimaru");
  var playerBoard = Gameboard();
  var computerBoard = Gameboard();
  computerBoard.placeShip(computerBoard.boats[0], 2, 1, true);
  player.attack(computerBoard, 1, 1);
  player.attack(computerBoard, 2, 1);
  expect(computerBoard.board[1][1]).toEqual('miss');
  expect(computerBoard.board[2][1]).toEqual('hit');
  expect(computerBoard.board[2][2]).toEqual({
    "index": 1,
    "ship": "carrier"
  });
});