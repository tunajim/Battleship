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
    _isSunk();
  };

  const _isSunk = () => {
    ship.forEach((element) => {
      element.status === "hit" ? (sunk = true) : (sunk = false);
    });
  };

  return {
    length,
    ship,
    name,
    sunk,
    hit,
  };
};

module.exports = Ship;
  
