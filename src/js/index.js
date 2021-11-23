import "../style.css";
const Ship = require("./ship");
const Gameboard = require("./gameboard");
const { Player, Computer } = require("./player");
const { LoadBoard, loadGame } = require("./DOM");

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

  const playerOne = Player("george");
  const computer = Computer("orochimaru");

  for (let i = 0; i < playerBoard.boats.length; i++) {
    playerBoard.placeShip(
      playerBoard.boats[i],
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
      Math.random() < 0.5
    );
    // computerBoard.placeShip(
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
