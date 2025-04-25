const playerBoardContainer = document.querySelector('#player-board');
const compBoardContainer = document.querySelector('#computer-board');

function setMainMessage(txt) {
    const messageDiv = document.querySelector("#main-message");
    messageDiv.textContent = txt;
};

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
    for( let squareIDX = 0; squareIDX < squares.length; squareIDX++ ){
        const square = squares[squareIDX];
        const newSquare = square.cloneNode(true);
        square.parentNode.replaceChild(newSquare, square)

        if(newSquare.classList.contains('selected')) {
            newSquare.classList.remove('selected');
        }
        if(state == 'quiet' & !newSquare.classList.contains('quiet')) {
            newSquare.classList.add('quiet');
        }
        if(state == 'quiet') {
            newSquare.textContent = "";
        }
        if(['selectable', 'view'].includes(state) & newSquare.classList.contains('quiet')) {
            newSquare.classList.remove('quiet');
        }
    }

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
        square.removeEventListener('click', () => {
            clearSelectedClass(player);
            eventFunc(square);
        })
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

export { createBoard, setBoardState, setBoardFunction, createMessage, findSelectedSquare, addSubmitFunction, addTextToSquare, setMainMessage }
