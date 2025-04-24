import "./style.css";
import { createBoard, setBoardState, setBoardFunction, createMessage, findSelectedSquare, addSubmitFunction, addTextToSquare } from "./html_handler.js";
import { newGame } from "./object_handler.js";

/*
function gameFlow(x, y, ships) {
    const returnFunc = function takePlacements(placements) {
        newGame(x, y, placements, ships);
    }

    createPlayerBoard(x, y, [...ships], returnFunc);
    createComputerBoard(x, y, ships)
};

const x = 10;
const y = 10;
const ships = [2, 2, 3, 1];

const restartButton = document.querySelector('#reset');
restartButton.addEventListener('click', () => {gameFlow(x, y, ships)});


gameFlow(x, y, ships);
*/

const x = 10;
const y = 10;
const ships = [2, 2, 3, 1];
const restartButton = document.querySelector('#reset');

createBoard(x, y, true);
createBoard(x, y, false);
setBoardState(true, 'selectable');
setBoardState(false, 'quiet');



function askForShips(remainingShips = [], locations = []) {
    if(remainingShips.length == 0) {
        // continue to next steps
        setBoardState(true, 'view');
        const players = newGame(x, y, locations, ships);
        takeTurn(players, 0);
        
    }
    else {
        const ship = remainingShips.pop();
        const direction = Math.floor(Math.random() * 2);
        setBoardFunction(true, (e) => {e.classList.toggle('selected')})
        createMessage(true, 'Select the location for a ship with the following location and direction', `${ship} Spaces ${direction == 0 ? 'Horizontally' : 'Vertically'}`, 'Add');
        addSubmitFunction(true, () => {
            const selectedIDX = findSelectedSquare(true);
            addTextToSquare(true, selectedIDX[0], selectedIDX[1], direction, ship, 'S');
            locations.push([selectedIDX[0], selectedIDX[1], direction, ship]);
            askForShips([...remainingShips], [...locations]);
        })
    }
}

function takeTurn(players, playerNum) {
    const player = players[playerNum];
    if(!player.board.isAlive) {
        alert(`${player.isComputer ? 'Computer' : 'Player'} has been defeated`)
        return
    }
    if(!player.isComputer) {
        setBoardState(false, 'selectable');
        setBoardState(true, 'view');
        setBoardFunction(false, (e) => {e.classList.toggle('selected')})
        createMessage(false, 'Select your next target location', '', 'Attack');
        addSubmitFunction(false, () => {
            const selectedIDX = findSelectedSquare(false);
            const result = players[playerNum == 0 ? 1 : 0].board.receiveAttack(selectedIDX[0], selectedIDX[1]);
            alert(`Attack was a ${result}`);
            addTextToSquare(false, selectedIDX[0], selectedIDX[1], 0, 1, result == 'miss' ? '-' : '*');
            takeTurn(players, playerNum == 0 ? 1 : 0)
        })
    }
    else {
        const attack = player.computerAttack();
        const result = players[playerNum == 0 ? 1 : 0].board.receiveAttack(attack[0], attack[1]);
        alert(`Computer attack was a ${result}`);
        addTextToSquare(true, attack[0], attack[1], 0, 1, result == 'miss' ? '-' : '*');
        takeTurn(players, playerNum == 0 ? 1 : 0)
    }
}

askForShips([...ships], [])

/*
Game steps
1. determine player boat locations
    - empty comp board, selectable player board
    - selecting updates player board
2. player turn
    - reference player board, selectable comp board
    - selecting updates player guess on comp board
3. computer turn
    - reference player board, reference comp board
    - no selection

*/