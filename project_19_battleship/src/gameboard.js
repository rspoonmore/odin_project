import {Ship} from './ship.js'

class Space {
    constructor(){
        this.played = false;
        this.ship = null;
    }

    get hasShip() {
        return this.ship !== null;
    }
}

class GameBoard {
    constructor(boardX = 10, boardY = 10) {
        this.boardX = boardX;
        this.boardY = boardY;
        this.spaces = this.createBoard();
    }

    createBoard() {
        let spaces = [];
        for(let i = 0; i < this.boardX; i++) {
            let col = [];
            for(let j = 0; j < this.boardY; j++) {
                col.push(new Space());
            }
            spaces.push(col);
        }
        return spaces;
    }

    printBoard() {
        let board = ""
        for(let j = this.boardY - 1; j >= 0; j--) {
            for(let i = 0; i < this.boardX; i++) {
                board += this.spaces[i][j].hasShip ? 'S' : 'O';
            }
            board += '\n'
        }
        console.log(board);
    }

    placeShip(location, shipLength, direction) {
        if(shipLength < 1) {
            throw new Error('Must have ship length > 0');
        }
        if(direction != 0 & direction != 1) {
            throw new Error('Direction numeral must be either 0 or 1');
        }
        if(direction == 0 & shipLength + location[0] > this.boardX) {
            throw new Error('Ship runs off of board horizontally');
        }
        if(direction == 1 & shipLength + location[1] > this.boardY) {
            throw new Error('Ship runs off of board vertically');
        }

        let newShip = new Ship(shipLength);

        for(let i = 0; i < shipLength; i++) {
            let currentSpace = undefined;
            if(direction == 0){
                currentSpace = this.spaces[location[0] + i][location[1]];
            }
            else {
                currentSpace = this.spaces[location[0]][location[1] + i];
            }
            currentSpace.ship = newShip;
        }
    }
}

export {GameBoard}