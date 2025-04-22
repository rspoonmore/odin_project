import { Player } from "./player.js";
import { GameBoard } from "./gameboard.js";


function newGame(boardX, boardY) {
    const board1 = new GameBoard(boardX, boardY);
    const player1 = new Player(isComputer = false, board1);

    const board2 = new GameBoard(boardX, boardY);
    const player2 = new Player(isComputer = true, board2);
    player2.generateComputerBoard();
};

export {newGame}