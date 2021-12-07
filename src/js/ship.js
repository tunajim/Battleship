const Ship = (length, name) => {
  const ship = [];
  let sunk = false;

  const _populateShip = () => {
    for (let i = 0; i < length; i++) {
      let cell = { status: "unhit" };
      ship.push(cell);
    }
  };

  _populateShip();

  const hit = (index) => {
    ship[index].status = "hit";
    console.log(ship);
  };

  function isSunk() {
    this.sunk = true;
    ship.forEach((element) => {
      console.log(element.status);
      if (element.status === "unhit") this.sunk = false;
    });
    console.log(this.sunk);
  };

  return {
    hit,
    isSunk,
    length,
    ship,
    name,
    sunk
  };
};

module.exports = Ship;
