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
    console.log(ship);
  };

  function isSunk() {
    var _this = this;

    this.sunk = true;
    ship.forEach(function (element) {
      console.log(element.status);
      if (element.status === "unhit") _this.sunk = false;
    });
    console.log(this.sunk);
  }

  ;
  return {
    hit: hit,
    isSunk: isSunk,
    length: length,
    ship: ship,
    name: name,
    sunk: sunk
  };
};

module.exports = Ship;