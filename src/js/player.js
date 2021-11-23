const Player = (name) => {
  const attack = (gameboard, col, row) => {
    gameboard.recieveAttack(name, col, row);
  };
  return { attack, name };
};

const Computer = (name) => {
  const unhit = 1;
  const randomAttack = (gameboard) => {
    const col = Math.floor(Math.random() * 10);
    const row = Math.floor(Math.random() * 10);
    gameboard.board[col][row].length === unhit
      ? _attack(gameboard, col, row)
      : randomAttack(gameboard);
  };
  const _attack = (gameboard, col, row) => {
    gameboard.board.recieveAttack(name, col, row);
  };

  return { randomAttack, name };
};

module.exports = { Player, Computer };
