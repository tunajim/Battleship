const { Player, Computer } = require('../player');
const Gameboard = require("../gameboard");

test('making new player or computer will return object with attack function and player name', () => {
    const player = Player("tunajim");
    const computer = Computer("orochimaru")
    expect(player).toEqual({ attack: player.attack, name: "tunajim"});
    expect(computer).toEqual({ randomAttack: computer.randomAttack, name: "orochimaru"});

})

test('when a player attacks, update opponents board', () => {
    const player = Player("tunajim");
    const computer = Computer("orochimaru");
    const playerBoard = Gameboard();
    const computerBoard = Gameboard();

    computerBoard.placeShip(computerBoard.boats[0], 2, 1, true);

    player.attack(computerBoard, 1, 1);
    player.attack(computerBoard, 2, 1);
    expect(computerBoard.board[1][1]).toEqual('miss');
    expect(computerBoard.board[2][1]).toEqual('hit');
    expect(computerBoard.board[2][2]).toEqual({ "index": 1, "ship": "carrier"});


})
