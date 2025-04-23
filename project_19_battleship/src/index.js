import "./style.css";
import { createBoard, setBoardState } from "./html_handler.js";
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