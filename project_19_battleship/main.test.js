const shipExports = require('./src/ship.js');
const boardExports = require('./src/gameboard.js');
const playerExports = require('./src/player.js');

test('Ship structure', () => {
    const ship = new shipExports['Ship'](10);
    expect(ship.getLength).toBe(10);
    
    for(let i = 0; i < 10; i++) {
        expect(ship.isSunk).toBe(false);
        ship.hit();
    }
    
    expect(ship.isSunk).toBe(true);
});

test('Gameboard structure', () => {
    const x = 10;
    const y = 5;
    const board = new boardExports['GameBoard'](x, y);
    expect(board.spaces.length).toBe(x);
    expect(board.spaces[0].length).toBe(y);

    board.placeShip([2, 0], 2, 0);
    
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
});

test('Vertical GameBoard bounds test', () => {
    function t() {
        const board = new boardExports['GameBoard'](10, 5);
        board.placeShip([0, 2], 4, 1)
    }

    expect(t).toThrow('Ship placement is not valid');
});

test('Horizontal GameBoard bounds test', () => {
    function t() {
        const board = new boardExports['GameBoard'](10, 5);
        board.placeShip([8, 0], 4, 0)
    }

    expect(t).toThrow('Ship placement is not valid');
});

test('GameBoard direction test', () => {
    function t() {
        const board = new boardExports['GameBoard'](10, 5);
        board.placeShip([0, 0], 1, 2)
    }

    expect(t).toThrow('Ship placement is not valid');
});

test('GameBoard ship length test', () => {
    function t() {
        const board = new boardExports['GameBoard'](10, 5);
        board.placeShip([0, 2], 0, 0)
    }

    expect(t).toThrow('Ship placement is not valid');
});

test('Gameboard hit test', () => {
    const x = 10;
    const y = 5;
    const board = new boardExports['GameBoard'](x, y);
    expect(board.spaces.length).toBe(x);
    expect(board.spaces[0].length).toBe(y);

    board.placeShip([2, 0], 2, 0);

    expect(board.receiveAttack(0, 0)).toBe("miss");
    expect(board.receiveAttack(2, 0)).toBe('hit');
    expect(board.receiveAttack(3, 0)).toBe('sink');
});


test('Gameboard attack out of bounds test', () => {
    const x = 10;
    const y = 5;
    const board = new boardExports['GameBoard'](x, y);
    expect(board.spaces.length).toBe(x);
    expect(board.spaces[0].length).toBe(y);

    const testCoords = [[-1, 0], [0, -1], [11, 0], [0, 11]];
    for(let i=0; i < testCoords.length; i++) {
        function t() {
            board.receiveAttack(testCoords[i][0], testCoords[i][1])
        }
        expect(t).toThrow('Attack is out of bounds');
    }
});

test('Gameboard attack twice test', () => {
    const x = 10;
    const y = 5;
    const board = new boardExports['GameBoard'](x, y);
    expect(board.spaces.length).toBe(x);
    expect(board.spaces[0].length).toBe(y);

    function t() {
        board.receiveAttack(0, 0)
        board.receiveAttack(0, 0)
    }
    expect(t).toThrow('Space already attacked');
});


test('Random board test', () => {
    for(let testNum = 0; testNum < 100; testNum ++) {
        const shipLengths = [2, 3, 3, 2];
        const board = new boardExports['GameBoard'](10, 10);
        board.generateRandomBoard(shipLengths);
        // board.printBoard();

        let shipSpaceCount = 0;

        for(let i = 0; i < 10; i++){
            for(let j = 0; j < 10; j++) {
                if(board.spaces[i][j].hasShip) {
                    shipSpaceCount += 1
                }
            }
        }

        expect(shipSpaceCount).toBe(10);
    }
});

test('Computer Random Board Test', () => {
    const shipLengths = [2, 3, 3, 2];
    const board1 = new boardExports['GameBoard'](10, 10);
    const board2 = new boardExports['GameBoard'](10, 10);

    const player1 = new playerExports['Player'](true, board1);
    const player2 = new playerExports['Player'](true, board2);

    player1.generateComputerBoard(shipLengths);
    let shipSpaceCount = 0;
    for(let i = 0; i < 10; i++){
        for(let j = 0; j < 10; j++) {
            if(player1.board.spaces[i][j].hasShip) {
                shipSpaceCount += 1
            }
        }
    }
    expect(shipSpaceCount).toBe(10);

    player2.generateComputerBoard(shipLengths);
    shipSpaceCount = 0;
    for(let i = 0; i < 10; i++){
        for(let j = 0; j < 10; j++) {
            if(player2.board.spaces[i][j].hasShip) {
                shipSpaceCount += 1
            }
        }
    }
    expect(shipSpaceCount).toBe(10);
});

test('Computer Random Attack Test', () => {
    const shipLengths = [2, 3, 3, 2];
    const board1 = new boardExports['GameBoard'](10, 10);
    const board2 = new boardExports['GameBoard'](10, 10);

    const player1 = new playerExports['Player'](true, board1);
    player1.generateComputerBoard(shipLengths);

    const player2 = new playerExports['Player'](true, board2);
    player2.generateComputerBoard(shipLengths);

    const rounds = 10
    for(let roundNum = 0; roundNum < rounds; roundNum++) {
        const player1Attack = player1.computerAttack();
        const p1AttackResult = player2.board.receiveAttack(player1Attack[0], player1Attack[1]);

        const player2Attack = player2.computerAttack();
        const p2AttackResult = player1.board.receiveAttack(player2Attack[0], player2Attack[1]);

        // console.log(`Round ${roundNum + 1}\n\tPlayer 1 attacked at ${player1Attack} and it was a ${p1AttackResult}\n\tPlayer 2 attacked at ${player2Attack} and it was a ${p2AttackResult}`)
    }

    // console.log('Player 1 Board')
    // player1.board.printPlays()

    // console.log('Player 2 Board')
    // player2.board.printPlays()


    let p1PlayedCount = 0;
    for(let i = 0; i < 10; i++){
        for(let j = 0; j < 10; j++) {
            if(player2.board.spaces[i][j].played) {
                p1PlayedCount += 1
            }
        }
    }
    expect(p1PlayedCount).toBe(rounds);

    let p2PlayedCount = 0;
    for(let i = 0; i < 10; i++){
        for(let j = 0; j < 10; j++) {
            if(player1.board.spaces[i][j].played) {
                p2PlayedCount += 1
            }
        }
    }
    expect(p2PlayedCount).toBe(rounds);
});

