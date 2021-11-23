const Ship = require("./ship");

const Gameboard = (player) => {
  const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const columns = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const board = _generateBoard(rows, columns);
  const misses = [];

  const carrier = Ship(5, "carrier");
  const battleship = Ship(4, "battleship");
  const destroyer = Ship(3, "destroyer");
  const submarine = Ship(3, "submarine");
  const patrolBoat = Ship(2, "patrol-boat");

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

  const placeShip = (ship, column, row, vertical) => {
    console.log({ column, row });
    let playable = _checkPlayed(ship, column, row, vertical);
    if (!vertical && playable) {
      for (let i = column; i < ship.length + column; i++) {
        board[i][row] = { ship: ship.name, index: i - column };
      }
    } else if (vertical && playable) {
      for (let i = row; i < ship.length + row; i++) {
        board[column][i] = { ship: ship.name, index: i - row };
      }
    } else {
      console.log("invalid position, ship must remain on board");
      placeShip(
        ship,
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        vertical
      );
    }
  };

  function _checkPlayed(ship, col, row, vert) {
    let playable = true;
    const max = 10;
    console.log({ vert });

    if (!vert) {
      if (ship.length < max - col) {
        for (let i = col; i < ship.length + col; i++) {
          const cell = board[i][row];
          console.log(typeof cell);
          if (typeof cell === "object") {
            playable = false;
            console.log("ship already placed");
          }
        }
      } else {
        playable = false;
      }
    } else {
      if (ship.length < max - row) {
        for (let i = row; i < ship.length + row; i++) {
          const cell = board[col][i];
          console.log(typeof cell);
          if (typeof cell === "object") {
            playable = false;
            console.log("ship already placed");
          }
        }
      } else {
        playable = false;
      }
    }

    console.log({ vert });
    console.log({ playable });
    console.log({ ship });
    return playable;
  }

  const recieveAttack = (name, column, row) => {
    let result = null;
    if (board[column][row].length === 1) {
      misses.push({ column, row });
      board[column][row] = `miss`;
      result = console.log(`${name} missed`);
    } else if (board[column][row] === "hit") {
      result = console.log("spot already hit");
    } else {
      _updateHits(column, row);
      result = console.log(`${name}'s shot landed!`);
    }
    return result;
  };

  function _updateHits(col, row) {
    for (let i = 0; i < boats.length; i++) {
      if (boats[i].name === board[col][row].ship) {
        boats[i].hit(board[col][row].index);
        board[col][row] = "hit";
      }
    }
  }

  const allShipsSunk = (name) => {
    let done = true;
    boats.forEach((element) => {
      if (!element.sunk) done = false;
    });
    if (done)
      console.log(
        `${name} has sunken all of their enemies ships, ${name} wins!`
      );

    console.log({ done });
    return done;
  };

  return {
    placeShip,
    recieveAttack,
    allShipsSunk,
    player,
    board,
    rows,
    columns,
    boats,
    misses,
  };
};

module.exports = Gameboard;
