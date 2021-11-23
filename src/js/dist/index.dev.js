"use strict";

require("../style.css");

var Ship = require("./ship");

var Gameboard = require("./gameboard");

var _require = require("./player"),
    Player = _require.Player,
    Computer = _require.Computer;

var _require2 = require("./DOM"),
    LoadBoard = _require2.LoadBoard,
    loadGame = _require2.loadGame;

var load = loadGame();
load.start.addEventListener("click", setUpGame);

function setUpGame(e) {
  e.target.parentNode.classList.add("hidden");
  load.start.removeEventListener("click", setUpGame);
  return gameLoop();
}

var gameLoop = function gameLoop() {
  var playerBoard = Gameboard("human");
  var computerBoard = Gameboard("computer");
  var playerOne = Player("george");
  var computer = Computer("orochimaru");

  for (var i = 0; i < playerBoard.boats.length; i++) {
    playerBoard.placeShip(playerBoard.boats[i], Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.random() < 0.5); // computerBoard.placeShip(
    //   computerBoard.boats[i],
    //   Math.floor(Math.random() * 10),
    //   Math.floor(Math.random() * 10),
    //   Math.random() < 0.5
    // );
  }

  LoadBoard(computerBoard);
  LoadBoard(playerBoard);
  console.log(playerBoard.board);
  console.log(computerBoard.board);
};