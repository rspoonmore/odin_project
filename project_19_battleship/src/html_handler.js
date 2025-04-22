const container = document.querySelector('.container');
const boardContainer = document.querySelector('#board');


function createBoard(x, y) {
    boardContainer.innerHTML = "";
    boardContainer.style.gridTemplate = `repeat(${y}, 50px) / repeat(${x}, 50px)`;
    boardContainer.style.width = `${x*50}px`
    for(let j = y-1; j >= 0; j--) {
        for(let i = 0; i < x; i++) {
            const boardSquare = document.createElement('div');
            boardSquare.classList.add('square');
            boardSquare.id = `square-${i}-${j}`;
            boardContainer.appendChild(boardSquare);
        }
    }
};

function translateIDToIDX(squareID) {
    const firstSlice = squareID.indexOf('-');
    const secondSlice = squareID.indexOf('-', firstSlice + 1);
    const x = parseInt(squareID.slice(firstSlice + 1, secondSlice));
    const y = parseInt(squareID.slice(secondSlice + 1, squareID.length));
    return [x, y];
};

function clearSelectedClass() {
    const squares = document.querySelectorAll('.square');
    squares.forEach((square) => {
        if(square.classList.contains('selected')) {
            square.classList.remove('selected')
        }
    })
}

function clearBoard() {
    clearSelectedClass()
    const squares = document.querySelectorAll('.square');
    squares.forEach((square) => {
        square.textContent = "";
        square.addEventListener('click', () => {
            clearSelectedClass();
            square.classList.add('selected');
        })
    })
}

function askForShip(shipLengths = [], placements=[]) {
    if(shipLengths.length == 0) {
        const messageDiv = document.querySelector('#result')
        const shipInfoDiv = document.querySelector('#instruct');
        messageDiv.textContent = '';
        shipInfoDiv.textContent = 'Press Start to start the game';

        const existingButton = document.querySelector('#submit')
        if(existingButton != null) {
            container.removeChild(existingButton);
        }

        const submitButton = document.createElement('button');
        submitButton.id = 'submit';
        submitButton.textContent = 'Start';
        submitButton.addEventListener('click', () => {
            clearBoard()
            console.log(placements)
        })


        container.appendChild(submitButton)
    }
    else {
        const shipLength = shipLengths.pop();
        const direction = Math.floor(Math.random() * 2);

        const messageDiv = document.querySelector('#result')
        const shipInfoDiv = document.querySelector('#instruct');
        messageDiv.textContent = 'Place a ship with the following size and direction';
        shipInfoDiv.textContent = `${shipLength} Space(s) ${direction == 0 ? 'Horizontally' : 'Vertically'}`;

        const existingButton = document.querySelector('#submit')
        if(existingButton != null) {
            container.removeChild(existingButton);
        }

        const submitButton = document.createElement('button');
        submitButton.id = 'submit';
        submitButton.textContent = 'Add';
        submitButton.addEventListener('click', () => {
            const square = document.querySelector('.selected');
            const location = translateIDToIDX(square.id);
            const shipInfoText = document.querySelector('#instruct').textContent;
            const shipInfoArray = shipInfoText.split(' ');
            addShip(location[0], location[1], shipInfoArray[2] == 'Horizontally' ? 0 : 1, parseInt(shipInfoArray[0]))
            placements.push([location[0], location[1], shipInfoArray[2] == 'Horizontally' ? 0 : 1, parseInt(shipInfoArray[0])])
            askForShip(shipLengths, placements);
        })

        container.appendChild(submitButton);
    }
}

function addShip(x, y, direction, shipLength) {
    for(let i=0; i < shipLength; i++){
        const currX = direction == 0 ? x + i : x;
        const currY = direction == 0 ? y : y + i;
        const currSquare = document.querySelector(`#square-${currX}-${currY}`);
        currSquare.textContent = 'S';
    }
};

function createPlayerBoard(x, y, shipLengths) {
    createBoard(x, y);
    clearBoard();
    askForShip(shipLengths);
}




export {createPlayerBoard}