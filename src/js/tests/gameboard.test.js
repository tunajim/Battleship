const { TestWatcher } = require("@jest/core");
const Gameboard = require("../gameboard");
const { Player, Computer } = require("../player");

test("placeShip adds ship names to gameboard array", () => {
  const boardOne = Gameboard("tunajim");
  boardOne.placeShip(boardOne.boats[0], 5, 1, true);
  expect(boardOne.board[5][1]).toEqual({ index: 0, ship: "carrier" });
  expect(boardOne.board[5][2]).toEqual({ index: 1, ship: "carrier" });
  expect(boardOne.board[5][3]).toEqual({ index: 2, ship: "carrier" });
  expect(boardOne.board[5][4]).toEqual({ index: 3, ship: "carrier" });
  expect(boardOne.board[5][6]).not.toEqual({ index: 0, ship: "carrier" });
});

jest.spyOn(console, "log");

test("recieve attack logs whether the attack landed", () => {
  expect(console.log.mock.calls.length).toBe(0);
  const boardOne = Gameboard("tunajim");
  const computer = Computer("orochimaru");
  boardOne.placeShip(boardOne.boats[0], 5, 1, true);
  boardOne.recieveAttack(computer.name, 6, 1);
  boardOne.recieveAttack(computer.name, 5, 1);
  boardOne.recieveAttack(computer.name, 5, 1);
  expect(console.log.mock.calls.length).toBe(3);
  expect(console.log.mock.calls[0][0]).toBe("orochimaru missed");
  expect(console.log.mock.calls[1][0]).toBe("orochimaru's shot landed!");
  expect(console.log.mock.calls[2][0]).toBe("spot already hit");
  
});

test("allShipsSunk will return false until all ships are sunk", () => {
  const boardOne = Gameboard();
  const computer = Computer("orochimaru");

  boardOne.placeShip(boardOne.boats[4], 1, 1, true);
  expect(boardOne.allShipsSunk(computer.name)).toBe(false);
  boardOne.boats.forEach((elem) => {
    elem.sunk = true;
  });
  expect(boardOne.allShipsSunk(computer.name)).toBe(true);
});
