"use strict";

var Ship = require("../ship");

test("hit function returns whether the last hit sunk the ship", function () {
  var test = Ship(3);
  test.hit(2);
  expect(test.ship).toStrictEqual([{
    status: "unhit"
  }, {
    status: "unhit"
  }, {
    status: "hit"
  }]);
  test.hit(0);
  test.hit(1);
  expect(test.ship).toStrictEqual([{
    status: "hit"
  }, {
    status: "hit"
  }, {
    status: "hit"
  }]);
});
test("hit will be undefined", function () {
  var battleship = Ship(3);
  expect(battleship.hit(0)).toBeUndefined;
});
test("Ship returns object containing length, hits, if ship is sunk, and a function to initiate hit", function () {
  var test = Ship(2);
  expect(test).toEqual({
    length: 2,
    ship: [{
      status: "unhit"
    }, {
      status: "unhit"
    }],
    sunk: false,
    hit: test.hit
  });
});
test("if all cells on ship are hit, ship is sunken", function () {
  var test = Ship(3);
  test.hit(0);
  test.hit(1);
  expect(test.sunk).toBeFalsy;
  test.hit(2);
  expect(test.sunk).not.toBeFalsy;
});