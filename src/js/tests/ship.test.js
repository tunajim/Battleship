const Ship = require("../ship");

test("hit function returns whether the last hit sunk the ship", () => {
  const test = Ship(3);
  test.hit(2);
  expect(test.ship).toStrictEqual([
    { status: "unhit" },
    { status: "unhit" },
    { status: "hit" },
  ]);

  test.hit(0);
  test.hit(1);
  expect(test.ship).toStrictEqual([
    { status: "hit" },
    { status: "hit" },
    { status: "hit" },
  ]);
});

test("hit will be undefined", () => {
  const battleship = Ship(3);
  expect(battleship.hit(0)).toBeUndefined;
})

test("Ship returns object containing length, hits, if ship is sunk, and a function to initiate hit", () => {
  const test = Ship(2);
  expect(test).toEqual({
    length: 2,
    ship: [{ status: "unhit" }, { status: "unhit" }],
    sunk: false,
    hit: test.hit,
  });
});

test("if all cells on ship are hit, ship is sunken", () => {
    const test = Ship(3);
    test.hit(0);
    test.hit(1);

    expect(test.sunk).toBeFalsy;

    test.hit(2);
    expect(test.sunk).not.toBeFalsy;
})