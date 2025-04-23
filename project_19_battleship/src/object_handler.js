import { Player } from "./player.js";
import { GameBoard } from "./gameboard.js";


function newGame(boardX, boardY, placements, computerShipLengths) {
    const board1 = new GameBoard(boardX, boardY);
    const player1 = new Player(false, board1);
    for(let i = 0; i < placements.length; i++) {
        const placement = placements[i];
        player1.board.placeShip([placement[0], placement[1]], placement[3], placement[2])
    }

    const board2 = new GameBoard(boardX, boardY);
    const player2 = new Player(true, board2);
    player2.generateComputerBoard(computerShipLengths);
};

export {newGame}