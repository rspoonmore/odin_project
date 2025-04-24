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
        this.ships = [];
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
        let board = "";
        let header = " \t";
        let subHeader = ' \t';
        for(let j = this.boardY - 1; j >= 0; j--) {
            board += `${j}|\t`;
            let rowSplit = ' \t';
            for(let i = 0; i < this.boardX; i++) {
                board += this.spaces[i][j].hasShip ? 'S' : 'O';
                board += ' |\t'
                rowSplit += '--------';
                if(j == 0) {
                    header += `${i} |\t`;
                    subHeader += '--------';
                }
            }
            board = board + '\n' + rowSplit + '\n'
        }
        header += '\n';
        subHeader += '\n'
        board = header + subHeader + board;
        console.log(board);
    }

    printPlays() {
        let board = "";
        let header = " \t";
        let subHeader = ' \t';
        for(let j = this.boardY - 1; j >= 0; j--) {
            board += `${j}|\t`;
            let rowSplit = ' \t';
            for(let i = 0; i < this.boardX; i++) {
                let currentSpaceStr = 'O';
                if (this.spaces[i][j].played) {
                    currentSpaceStr = this.spaces[i][j].hasShip ? '*': 'X';
                }
                board += currentSpaceStr;
                board += ' |\t'
                rowSplit += '--------';
                if(j == 0) {
                    header += `${i} |\t`;
                    subHeader += '--------';
                }
            }
            board = board + '\n' + rowSplit + '\n'
        }
        header += '\n';
        subHeader += '\n'
        board = header + subHeader + board;
        console.log(board);
    }

    isValidShipLocation(location, shipLength, direction) {
        if(shipLength < 1) {
            return false;
        }
        if(direction != 0 & direction != 1) {
            return false;
        }
        if(direction == 0 & shipLength + location[0] > this.boardX) {
            return false;
        }
        if(direction == 1 & shipLength + location[1] > this.boardY) {
            return false;
        }

        for(let i = 0; i < shipLength; i++) {
            let currentSpace = undefined;
            if(direction == 0){
                currentSpace = this.spaces[location[0] + i][location[1]];
            }
            else {
                currentSpace = this.spaces[location[0]][location[1] + i];
            }
            if(currentSpace == undefined | currentSpace.hasShip) {
                return false;
            }
        }

        return true;
    }

    placeShip(location, shipLength, direction) {
        if(!this.isValidShipLocation(location, shipLength, direction)){ throw new Error('Ship placement is not valid')}

        let newShip = new Ship(shipLength);
        this.ships.push(newShip);

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

    generateRandomBoard(shipLengths) {
        shipLengths.forEach((currentShipLength) => {
            let isPlaced = false;
            while(!isPlaced) {
                const direction = Math.floor(Math.random() * 2);
                const placeX = Math.floor(Math.random() * this.boardX);
                const placeY = Math.floor(Math.random() * this.boardY);
                if(this.isValidShipLocation([placeX, placeY], currentShipLength, direction)){
                    this.placeShip([placeX, placeY], currentShipLength, direction)
                    isPlaced = true;
                }
            }
        })
        
    }

    receiveAttack(attackX, attackY) {
        if(attackX < 0 | attackX >= this.boardX | attackY < 0 | attackY >= this.boardY) {
            throw new Error('Attack is out of bounds');
        }

        const attackedSpace = this.spaces[attackX][attackY];

        if(attackedSpace.played) {
            throw new Error('Space already attacked');
        }

        attackedSpace.played = true;
        if(attackedSpace.ship == null) {
            return 'miss';
        }
        attackedSpace.ship.hit();
        if(attackedSpace.ship.isSunk) {
            return 'sink'
        }
        return 'hit'
    }

    get isAlive() {
        for(let i = 0; i < this.ships.length; i++) {
            const ship = this.ships[i]
            if(!ship.isSunk) {
                return true;
            }
        }
        return false;
    }
}

export {GameBoard}