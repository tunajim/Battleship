import "../style.css";
import { Gameboard } from "./gameboard";

const Ship = require("./ship");
const { Player, Computer } = require("./player");
const {
  LoadBoard,
  loadGame,
  ClearBoard,
  vertButton,
  loadAlertBox,
} = require("./DOM");

const load = loadGame();
load.start.addEventListener("click", setUpGame);

function setUpGame(e) {
  e.target.parentNode.classList.add("hidden");
  load.start.removeEventListener("click", setUpGame);
  return gameLoop();
}

const gameLoop = () => {
  const playerBoard = Gameboard("human");
  const computerBoard = Gameboard("computer");

  const playerOne = Player("Player One");
  const computer = Computer("Orochimaru");

  const computerDOM = LoadBoard(computerBoard);
  const alertBox = loadAlertBox();
  const toggleVert = vertButton();
  const playerDOM = LoadBoard(playerBoard);

  let vertical = true;
  const button = document.querySelector("#vertical");
  button.addEventListener("click", () => {
    if (vertical) {
      vertical = false;
    } else {
      vertical = true;
    }
    console.log(vertical);
  });

  const plBoard = document.getElementById("player-board");
  const compBoard = document.getElementById("computer-board");

  // for(let i = 0; i < playerBoard.boats.length; i++) {
  //   plBoard.addEventListener("click", playerBoard.placeShip(boats[i].name, ))
  // }

  var playerIndex = { i: 0 };
  var compIndex = { i: 0 };

  while (compIndex.i < 5) {
    computerBoard.placeShip(
      computerBoard.boats[compIndex.i],
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
      Math.random() < 0.5,
      compBoard,
      compIndex
    );
    console.log(compIndex);
  }

  alertBox.textContent =
    "Welcome to Battleship! The top board is enemy waters! Place 5 ships on bottom board to start game";

  plBoard.addEventListener("mouseover", previewShip);
  function previewShip(e) {
    playerIndex.i < 5
      ? playerBoard.highlightShip(e, playerIndex, vertical)
      : plBoard.removeEventListener("mouseover", previewShip);
  }

  plBoard.addEventListener("mouseout", cancelPreview);
  function cancelPreview(e) {
    playerIndex.i < 5
      ? playerBoard.removeHighlight(e, playerIndex, vertical)
      : plBoard.removeEventListener("mouseout", cancelPreview);
  }

  plBoard.addEventListener("click", setShips);
  function setShips(e) {
    const changeDirection = document.getElementById("vertical");
    if (playerIndex.i < 5) {
      playerBoard.setBoard(e, playerIndex, vertical, plBoard);
      console.log(playerIndex.i);
      if (playerIndex.i === 5) {
        setShips(e);
      }
    } else {
      plBoard.removeEventListener("click", setShips);
      alertBox.textContent =
        "All ships have been set.. Cannons ready.. click enemy board to attack!";
      changeDirection.remove();
      play();
    }
  }
  console.log(playerBoard.board);

  const computerContainer = document.getElementById("computer-board");

  let playerTurn = true;
  let computerHit = { col: undefined, row: undefined };

  function play() {
    if (
      !computerBoard.allShipsSunk("Player one") &&
      !playerBoard.allShipsSunk("Computer")
    ) {
      if (playerTurn) {
        computerContainer.addEventListener("click", takeTurn);
        computerContainer.addEventListener("click", computerBoard.handleMove);
        computerContainer.addEventListener("click", replay);
      } else {
        const container = document.getElementById("player-board");
        const arr = [...container.children];
        playerTurn = true;
        playerBoard.randomMove(arr);
        play();
      }
    } else {
      computerContainer.removeEventListener("click", computerBoard.handleMove);
      computerContainer.removeEventListener("click", takeTurn);
      computerContainer.removeEventListener("click", replay);
      const restart = document.getElementById("restart-button");
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
    const restart = document.getElementById("restart-button");
    const alertBox = document.getElementById("alert-box");
    restart.remove();
    plBoard.remove();
    compBoard.remove();
    alertBox.remove();

    gameLoop();
  }
};
