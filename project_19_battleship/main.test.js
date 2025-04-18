const shipExports = require('./src/ship.js');
const boardExports = require('./src/gameboard.js');

test('Ship structure', () => {
    const ship = new shipExports['Ship'](10);
    expect(ship.getLength).toBe(10);
    
    for(let i = 0; i < 10; i++) {
        expect(ship.isSunk).toBe(false);
        ship.hit();
    }
    
    expect(ship.isSunk).toBe(true);
})

test('Gameboard structure', () => {
    const x = 10;
    const y = 5;
    const board = new boardExports['GameBoard'](x, y);
    expect(board.spaces.length).toBe(x);
    expect(board.spaces[0].length).toBe(y);

    // board.printBoard();

    board.placeShip([2, 0], 2, 0);

    // board.printBoard();
    
    for(let currX = 0; currX < x; currX++) {
        for(let currY = 0; currY < y; currY++) {
            if(currY == 0 & currX >= 2 & currX <= 3) {
                expect(board.spaces[currX][currY].hasShip).toBe(true);
            }
            else {
                expect(board.spaces[currX][currY].hasShip).toBe(false);
            }
        }
    }
})

test('Vertical GameBoard bounds test', () => {
    function t() {
        const board = new boardExports['GameBoard'](10, 5);
        board.placeShip([0, 2], 4, 1)
    }

    expect(t).toThrow('Ship runs off of board vertically');
})

test('Horizontal GameBoard bounds test', () => {
    function t() {
        const board = new boardExports['GameBoard'](10, 5);
        board.placeShip([8, 0], 4, 0)
    }

    expect(t).toThrow('Ship runs off of board horizontally');
})

test('GameBoard direction test', () => {
    function t() {
        const board = new boardExports['GameBoard'](10, 5);
        board.placeShip([0, 0], 1, 2)
    }

    expect(t).toThrow('Direction numeral must be either 0 or 1');
})

test('GameBoard ship length test', () => {
    function t() {
        const board = new boardExports['GameBoard'](10, 5);
        board.placeShip([0, 2], 0, 0)
    }

    expect(t).toThrow('Must have ship length > 0');
})