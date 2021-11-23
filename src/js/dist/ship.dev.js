"use strict";

var Ship = function Ship(length, name) {
  var ship = [];
  var sunk = false;

  var _populateShip = function _populateShip() {
    for (var i = 0; i < length; i++) {
      var cell = {
        status: "unhit"
      };
      ship.push(cell);
    }
  };

  _populateShip();

  var hit = function hit(index) {
    ship[index].status = "hit";

    _isSunk();
  };

  var _isSunk = function _isSunk() {
    ship.forEach(function (element) {
      element.status === "hit" ? sunk = true : sunk = false;
    });
  };

  return {
    length: length,
    ship: ship,
    name: name,
    sunk: sunk,
    hit: hit
  };
};

module.exports = Ship;