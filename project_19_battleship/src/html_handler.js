const container = document.querySelector('.container');
const playerBoardContainer = document.querySelector('#player-board');
const compBoardContainer = document.querySelector('#computer-board');


function createBoard(x, y, player) {
    const boardContainer = player ? playerBoardContainer : compBoardContainer;
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

function setBoardState(player, state) {
    if(!['quiet', 'selectable', 'view'].includes(state)) {
        throw new Error(`State must equal quiet or selectable but ${state} was given`)
    }
    const queryString = `#${player ? 'player' : 'computer'}-board > .square`
    const squares = document.querySelectorAll(queryString);
    squares.forEach(square => {
        if(square.classList.contains('selected')) {
            square.classList.remove('selected');
        }
        if(state == 'quiet' & !square.classList.contains('quiet')) {
            square.classList.add('quiet');
        }
        if(state == 'quiet') {
            square.textContent = "";
        }
        if(['selectable', 'view'].includes(state) & square.classList.contains('quiet')) {
            square.classList.remove('quiet');
        }
    })

    const button = document.querySelector(`#${player ? 'player' : 'computer'}-submit`);
    if(['view', 'quiet'].includes(state)) {
        createMessage(player, "", "", "");
        button.style.display = 'none';
    }
    else {
        button.style.display = 'inline';
    }
};

function clearSelectedClass(player) {
    const queryString = `#${player ? 'player' : 'computer'}-board > .square`;
    const squares = document.querySelectorAll(queryString);
    squares.forEach((square) => {
        if(square.classList.contains('selected')) {
            square.classList.remove('selected')
        }
    })
};

function setBoardFunction(player, eventFunc) {
    const queryString = `#${player ? 'player' : 'computer'}-board > .square`;
    const squares = document.querySelectorAll(queryString);
    squares.forEach(square => {
        square.addEventListener('click', () => {
            clearSelectedClass(player);
            eventFunc(square);
        })
    })
};

function translateIDToIDX(squareID) {
    const firstSlice = squareID.indexOf('-');
    const secondSlice = squareID.indexOf('-', firstSlice + 1);
    const x = parseInt(squareID.slice(firstSlice + 1, secondSlice));
    const y = parseInt(squareID.slice(secondSlice + 1, squareID.length));
    return [x, y];
};

function createMessage(player, topMessage, bottomMessage, buttonMessage) {
    const topMessageDiv = document.querySelector(`#${player ? 'player' : 'computer'}-top-message`);
    const bottomMessageDiv = document.querySelector(`#${player ? 'player' : 'computer'}-bottom-message`);
    const button = document.querySelector(`#${player ? 'player' : 'computer'}-submit`);

    topMessageDiv.textContent = topMessage;
    bottomMessageDiv.textContent = bottomMessage;
    button.textContent = buttonMessage;
};

function addSubmitFunction(player, submitFunc) {
    const button = document.querySelector(`#${player ? 'player' : 'computer'}-submit`);
    const newButton = button.cloneNode(true);
    button.parentNode.replaceChild(newButton, button)
    newButton.addEventListener('click', submitFunc);
};

function findSelectedSquare(player) {
    const queryString = `#${player ? 'player' : 'computer'}-board > .selected`;
    const square = document.querySelector(queryString);
    return translateIDToIDX(square.id);
};

function addTextToSquare(player, x, y, direction, shipLength, txt = "") {
    for(let i=0; i < shipLength; i++){
        const currX = direction == 0 ? x + i : x;
        const currY = direction == 0 ? y : y + i;
        const currSquare = document.querySelector(`#${player ? 'player' : 'computer'}-board > #square-${currX}-${currY}`);
        currSquare.textContent = txt;
    }
};

export { createBoard, setBoardState, setBoardFunction, createMessage, findSelectedSquare, addSubmitFunction, addTextToSquare }


/*

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

function askForShip(shipLengths, placements, returnFunc) {
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
            returnFunc(placements);
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
            askForShip(shipLengths, placements, returnFunc);
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

function createPlayerBoard(x, y, shipLengths, returnFunc) {
    createBoard(x, y, true);
    clearBoard();
    askForShip(shipLengths, [], returnFunc);
}

function createComputerBoard(x, y, shipLengths) {
    createBoard(x, y, false);
    clearBoard();
}




export {createPlayerBoard, createComputerBoard}

*/