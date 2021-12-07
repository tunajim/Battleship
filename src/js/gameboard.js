const Ship = require("./ship");
const { LoadBoard, createRestartButton } = require("./DOM");
const { takeTurn, replay } = require("./index");
import fire from "../images/fire.png";
import cross from "../images/crossed.png";

const Gameboard = (player) => {
  const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const columns = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const board = _generateBoard(rows, columns);
  const misses = [];
  const elements = [];

  const carrier = Ship(5, "Carrier");
  const battleship = Ship(4, "Battleship");
  const destroyer = Ship(3, "Destroyer");
  const submarine = Ship(3, "Submarine");
  const patrolBoat = Ship(2, "Patrol-boat");

  const boats = [carrier, battleship, destroyer, submarine, patrolBoat];

  function _generateBoard(rows, columns) {
    const arr = [];
    for (let i = 0; i < columns.length; i++) {
      arr[i] = [];
      for (let j = 0; j < rows.length; j++) {
        arr[i][j] = rows[j];
      }
    }
    return arr;
  }

  const placeShip = (ship, column, row, vertical, elem, index) => {
    let playable = _checkPlayed(ship, column, row, vertical);
    const alertBox = document.getElementById("alert-box");
    if (!vertical && playable) {
      for (let i = column; i < ship.length + column; i++) {
        board[i][row] = { ship: ship.name, index: i - column };
        elem.querySelector(
          `[data-coord-y="${row}"][data-coord-x="${i}"]`
        ).dataset.ship = `${boats[index.i].name}`;
      }
      if (index.i < 5) {
        index.i += 1;
        alertBox.textContent = `${ship.name} was placed`;
      } else {
        alertBox.textContent = `${ship.name} was placed`;
      }
    } else if (vertical && playable) {
      for (let i = row; i < ship.length + row; i++) {
        board[column][i] = { ship: ship.name, index: i - row };
        elem.querySelector(
          `[data-coord-y="${i}"][data-coord-x="${column}"]`
        ).dataset.ship = `${boats[index.i].name}`;
      }
      if (index.i < 5) {
        index.i += 1;
        alertBox.textContent = `${ship.name} was placed`;
      } else {
        alertBox.textContent = `${ship.name} was placed`;
      }
    } else {
      console.log("illegal move");
      alertBox.textContent = "illegal placement, try again";
    }
  };

  const highlightShip = (elem, index, vertical) => {
    const x = parseInt(elem.target.dataset.coordX, 10);
    const y = parseInt(elem.target.dataset.coordY, 10);
    const playerBoard = document.getElementById("player-board");
    let playable = _checkPlayed(boats[index.i], x, y, vertical);
    removeHighlight(elem, index);
    elem.target.classList.add("highlight");
    if (vertical && playable) {
      for (let i = y; i < boats[index.i].length + y; i++) {
        playerBoard
          .querySelector(`[data-coord-x="${x}"][data-coord-y="${i}"]`)
          .classList.add("highlight");
      }
    } else if (!vertical && playable) {
      for (let i = x; i < boats[index.i].length + x; i++) {
        playerBoard
          .querySelector(`[data-coord-x="${i}"][data-coord-y="${y}"]`)
          .classList.add("highlight");
      }
    } else {
      elem.target.classList.add("invalid");
    }
  };

  const removeHighlight = (elem, index, vertical) => {
    Array.from(elem.target.parentNode.children).forEach((elem) => {
      elem.classList.remove("highlight", "invalid");
    });
  };

  const setBoard = (elem, index, vertical, boardElem) => {
    let set = false;

    const x = parseInt(elem.target.dataset.coordX, 10);
    const y = parseInt(elem.target.dataset.coordY, 10);

    placeShip(boats[index.i], x, y, vertical, boardElem, index);
  };

  function _checkPlayed(ship, col, row, vert) {
    let playable = true;
    const max = 11;

    if (!vert) {
      if (ship.length < max - col) {
        for (let i = col; i < ship.length + col; i++) {
          const cell = board[i][row];
          if (typeof cell === "object") {
            playable = false;
          }
        }
      } else {
        playable = false;
      }
    } else {
      if (ship.length < max - row) {
        for (let i = row; i < ship.length + row; i++) {
          const cell = board[col][i];
          if (typeof cell === "object") {
            playable = false;
          }
        }
      } else {
        playable = false;
      }
    }

    return playable;
  }

  const handleMove = (e) => {
    console.log(e.target);
    let col = 0;
    let row = 0;
    const name = "Player One";
    col = e.target.dataset.coordX;
    row = e.target.dataset.coordY;
    e.target.parentNode.removeEventListener("click", handleMove);
    recieveAttack(name, col, row, e.target);
  };

  const randomMove = (arr) => {
    const elem = arr[Math.floor(Math.random() * 100)];
    const name = "Computer";
    let col = elem.dataset.coordX;
    let row = elem.dataset.coordY;
    const played = recieveAttack(name, col, row, elem);
    if (played) randomMove(arr);
  };

  const recieveAttack = (name, col, row, elem) => {
    let played = false;
    const emptySpace = 1;
    const alertBox = document.getElementById("alert-box");
    if (row !== undefined && col !== undefined)
      if (board[col][row].length === emptySpace) {
        misses.push({ col, row });
        board[col][row] = `miss`;
        console.log(`${name} missed`);
        alertBox.textContent = `${name} missed`;
        elem.classList.add("miss");
        elem.dataset.played = true;
        elem.style.backgroundImage = `url("${cross}")`;
      } else if (board[col][row] === "hit" || board[col][row] === "miss") {
        played = true;
        console.log("spot already played");
        alertBox.textContent = `spot already played`;
        elem.dataset.played = true;
        // elem.parentNode.addEventListener("click", handleMove);
      } else {
        elem.style.backgroundImage = `url("${fire}")`;
        elem.dataset.played = true;
        console.log(`${name}'s shot landed!`);
        alertBox.textContent = `${name}'s shot landed!`;

        _updateHits(col, row, name, alertBox, elem);
      }
    return played;
  };

  function _updateHits(col, row, name, alertBox, elem) {
    const index = boats.findIndex((e) => e.name === elem.dataset.ship);
    const cell = document.querySelector(
      `[data-coord-x="${col}"][data-coord-y="${row}"]`
    );
    for (let i = 0; i < boats.length; i++) {
      if (boats[i].name === board[col][row].ship) {
        boats[i].hit(board[col][row].index);
        boats[i].isSunk();
        board[col][row] = "hit";
      }
      if (boats[index].sunk) {
        alertBox.textContent = `${boats[index].name} was sunk by ${name}`;
      }
    }
  }

  const allShipsSunk = (name) => {
    const alertBox = document.getElementById("alert-box");
    let done = true;
    boats.forEach((element) => {
      if (!element.sunk) done = false;
    });
    if (done) {
      alertBox.textContent = `${name} has sunken all of their enemies ships, ${name} wins!`;
      createRestartButton(alertBox);
    }
    console.log(done);
    return done;
  };

  return {
    placeShip,
    recieveAttack,
    allShipsSunk,
    handleMove,
    randomMove,
    setBoard,
    highlightShip,
    removeHighlight,
    player,
    board,
    rows,
    columns,
    boats,
    misses,
  };
};

export { Gameboard };
