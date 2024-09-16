let gameBoard = document.querySelector('#board');
let resetButton = document.querySelector('#reset');
let turnHeader = document.querySelector('#turn-header');
let resultHeader = document.querySelector('#result-header');

function createBoard() {
    let gameBegun = false;
    let winner = "";
    let currentTurn = 'X';
    const length = 3*3;
    let spaces = [];


    for (var i = 0; i < length; i++) {
        let newSpace = document.createElement('button');
        newSpace.id = i;

        newSpace.addEventListener('click', () => {
            if(newSpace.textContent != "") {
                alert('This space is already taken.');
            }
            else if (winner == "") {
                gameBegun = true;
                newSpace.classList.add('selected');
                newSpace.textContent = currentTurn;

                var nextTurn = currentTurn == 'X' ? 'O' : 'X';
                currentTurn = nextTurn;
                turnHeader.textContent = nextTurn + ' Goes ' + (gameBegun ? 'Next' : 'First');

                winner = checkSpaces();
            }

            if (winner != "") {
                resultHeader.textContent = winner + ' Wins!'
            }
        })

        spaces.push(newSpace);
    }

    function populateSpaces(currentGameBoard) {
        for (var i = 0; i < length; i++){
            currentGameBoard.appendChild(spaces[i]);
        }
    }

    function checkSpaces() {
        // Check rows
        for (var i = 0; i < 3; i++) {
            if (spaces[i * 3].textContent == spaces[i * 3 + 1].textContent && spaces[i * 3 + 1].textContent == spaces[i * 3 + 2].textContent && spaces[i * 3].textContent != "") {
                return spaces[i * 3].textContent;
            }
        }

        // Check columns
        for (var i = 0; i < 3; i++) {
            if (spaces[i].textContent == spaces[i + 3].textContent && spaces[i + 3].textContent == spaces[i + 6].textContent && spaces[i].textContent != "") {
                return spaces[i].textContent;
            }
        }

        // Check diagonals
        if (spaces[0].textContent == spaces[4].textContent && spaces[4].textContent == spaces[8].textContent && spaces[8].textContent != "") {
            return spaces[0].textContent;
        }
        if (spaces[2].textContent == spaces[4].textContent && spaces[4].textContent == spaces[6].textContent && spaces[6].textContent != "") {
            return spaces[2].textContent;
        }

        return "";
    }

    return {populateSpaces}
}

function resetBoard() {
    gameBoard.innerHTML = "";
    let board = createBoard();
    board.populateSpaces(gameBoard);
    turnHeader.textContent = 'X Goes First';
    resultHeader.textContent = '';
}

resetButton.addEventListener('click', resetBoard);