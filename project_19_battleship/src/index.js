import "./style.css";
import { createPlayerBoard } from "./html_handler.js";
import { newGame } from "./object_handler.js";

// TODO: Change from showing 1 board to showing 2
// TODO: Create player move function
// TODO: Create computer move function
// TODO: Create end game scenario

function gameFlow(x, y, ships) {
    const returnFunc = function takePlacements(placements) {
        newGame(x, y, placements, ships);
    }

    createPlayerBoard(x, y, [...ships], returnFunc);
};

const x = 10;
const y = 10;
const ships = [2, 2, 3, 1];

const restartButton = document.querySelector('#reset');
restartButton.addEventListener('click', () => {gameFlow(x, y, ships)});


gameFlow(x, y, ships);