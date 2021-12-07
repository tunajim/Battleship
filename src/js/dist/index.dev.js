"use strict";

require("../style.css");

var _gameboard = require("./gameboard");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var Ship = require("./ship");

var _require = require("./player"),
    Player = _require.Player,
    Computer = _require.Computer;

var _require2 = require("./DOM"),
    LoadBoard = _require2.LoadBoard,
    loadGame = _require2.loadGame,
    ClearBoard = _require2.ClearBoard,
    vertButton = _require2.vertButton,
    loadAlertBox = _require2.loadAlertBox;

var load = loadGame();
load.start.addEventListener("click", setUpGame);

function setUpGame(e) {
  e.target.parentNode.classList.add("hidden");
  load.start.removeEventListener("click", setUpGame);
  return gameLoop();
}

var gameLoop = function gameLoop() {
  var playerBoard = (0, _gameboard.Gameboard)("human");
  var computerBoard = (0, _gameboard.Gameboard)("computer");
  var playerOne = Player("Player One");
  var computer = Computer("Orochimaru");
  var computerDOM = LoadBoard(computerBoard);
  var alertBox = loadAlertBox();
  var toggleVert = vertButton();
  var playerDOM = LoadBoard(playerBoard);
  var vertical = true;
  var button = document.querySelector("#vertical");
  button.addEventListener("click", function () {
    if (vertical) {
      vertical = false;
    } else {
      vertical = true;
    }

    console.log(vertical);
  });
  var plBoard = document.getElementById("player-board");
  var compBoard = document.getElementById("computer-board"); // for(let i = 0; i < playerBoard.boats.length; i++) {
  //   plBoard.addEventListener("click", playerBoard.placeShip(boats[i].name, ))
  // }

  var playerIndex = {
    i: 0
  };
  var compIndex = {
    i: 0
  };

  while (compIndex.i < 5) {
    computerBoard.placeShip(computerBoard.boats[compIndex.i], Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.random() < 0.5, compBoard, compIndex);
    console.log(compIndex);
  }

  alertBox.textContent = "Welcome to Battleship! The top board is enemy waters! Place 5 ships on bottom board to start game";
  plBoard.addEventListener("mouseover", previewShip);

  function previewShip(e) {
    playerIndex.i < 5 ? playerBoard.highlightShip(e, playerIndex, vertical) : plBoard.removeEventListener("mouseover", previewShip);
  }

  plBoard.addEventListener("mouseout", cancelPreview);

  function cancelPreview(e) {
    playerIndex.i < 5 ? playerBoard.removeHighlight(e, playerIndex, vertical) : plBoard.removeEventListener("mouseout", cancelPreview);
  }

  plBoard.addEventListener("click", setShips);

  function setShips(e) {
    var changeDirection = document.getElementById("vertical");

    if (playerIndex.i < 5) {
      playerBoard.setBoard(e, playerIndex, vertical, plBoard);
      console.log(playerIndex.i);

      if (playerIndex.i === 5) {
        setShips(e);
      }
    } else {
      plBoard.removeEventListener("click", setShips);
      alertBox.textContent = "All ships have been set.. Cannons ready.. click enemy board to attack!";
      changeDirection.remove();
      play();
    }
  }

  console.log(playerBoard.board);
  var computerContainer = document.getElementById("computer-board");
  var playerTurn = true;
  var computerHit = {
    col: undefined,
    row: undefined
  };

  function play() {
    if (!computerBoard.allShipsSunk("Player one") && !playerBoard.allShipsSunk("Computer")) {
      if (playerTurn) {
        computerContainer.addEventListener("click", takeTurn);
        computerContainer.addEventListener("click", computerBoard.handleMove);
        computerContainer.addEventListener("click", replay);
      } else {
        var container = document.getElementById("player-board");

        var arr = _toConsumableArray(container.children);

        playerTurn = true;
        playerBoard.randomMove(arr);
        play();
      }
    } else {
      computerContainer.removeEventListener("click", computerBoard.handleMove);
      computerContainer.removeEventListener("click", takeTurn);
      computerContainer.removeEventListener("click", replay);
      var restart = document.getElementById("restart-button");
      restart.addEventListener("click", restartGame);
      console.log("finished");
    }
  }

  function takeTurn(e) {
    console.log(e.target.dataset.played === "true");

    if (e.target.id !== "computer-board") {
      if (!e.target.dataset.played) {
        playerTurn = false;
      }
    } else {
      alertBox.textContent = "turn did not register, please try again";
    }
  }

  function replay(e) {
    setTimeout(play, 1000);
  }

  function restartGame(e) {
    var restart = document.getElementById("restart-button");
    var alertBox = document.getElementById("alert-box");
    restart.remove();
    plBoard.remove();
    compBoard.remove();
    alertBox.remove();
    gameLoop();
  }
};