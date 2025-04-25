import { GameBoard } from "./gameboard.js";

class Player {
    constructor(isComputer, board){
        this.isComputer = isComputer;
        this.board = board;
        this.attackHistory = [];
    }

    generateComputerBoard(shipLengths) {
        if(!this.isComputer) { return }
        this.board.generateRandomBoard(shipLengths);
    }

    computerAttack() {
        if(!this.isComputer) { return }
        let hasAttacked = false;
        while (!hasAttacked) {
            const attackX = Math.floor(Math.random() * this.board.boardX);
            const attackY = Math.floor(Math.random() * this.board.boardY);
            if(!this.attackHistory.includes(`${attackX}, ${attackY}`)) {
                this.attackHistory.push(`${attackX}, ${attackY}`);
                return [attackX, attackY];
            }
        }
    }
}

export {Player}