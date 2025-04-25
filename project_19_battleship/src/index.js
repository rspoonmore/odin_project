import "./style.css";
import { createBoard, setBoardState, setBoardFunction, createMessage, findSelectedSquare, addSubmitFunction, addTextToSquare, setMainMessage } from "./html_handler.js";
import { newGame } from "./object_handler.js";

const x = 10;
const y = 10;
const ships = [1, 2, 2, 3, 3, 4];


function battleship(x, y, ships) {
    const restartButton = document.querySelector('#reset');
    restartButton.addEventListener('click', () => {
        startGame(x, y);
        askForShips([...ships]);
        restartButton.textContent = "Reset";
    })
}

function startGame(x, y) {
    createBoard(x, y, true);
    createBoard(x, y, false);
    setBoardState(true, 'selectable');
    setBoardState(false, 'quiet');
    setMainMessage('Time to create your board!')
}


function askForShips(remainingShips = [], locations = []) {
    if(remainingShips.length == 0) {
        setBoardState(true, 'view');
        const players = newGame(x, y, locations, ships);
        setBoardState(true, 'view');
        setMainMessage("Time to play!");
        takeTurn(players, 0, 0);
        
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

const delay = ms => new Promise(res => setTimeout(res, ms));

async function takeTurn(players, playerNum, waitTime=0) {
    const player = players[playerNum];
    if(!player.board.isAlive) {
        alert(`${player.isComputer ? 'Computer' : 'Player'} has been defeated!`)
        setBoardState(false, 'view');
        return
    }
    if(!player.isComputer) {
        setBoardState(false, 'selectable');
        setBoardFunction(false, (e) => {e.classList.toggle('selected')})
        createMessage(false, 'Select your next target location', '', 'Attack');
        addSubmitFunction(false, () => {
            const selectedIDX = findSelectedSquare(false);
            const result = players[playerNum == 0 ? 1 : 0].board.receiveAttack(selectedIDX[0], selectedIDX[1]);
            setMainMessage(`Attack at ${selectedIDX} was a ${result}`);
            addTextToSquare(false, selectedIDX[0], selectedIDX[1], 0, 1, result == 'miss' ? '-' : '*');
            takeTurn(players, playerNum == 0 ? 1 : 0, 2500)
        })
    }
    else {
        setBoardState(false, 'view');
        const attack = player.computerAttack();
        await delay(waitTime);
        const result = players[playerNum == 0 ? 1 : 0].board.receiveAttack(attack[0], attack[1]);
        setMainMessage(`Computer attack at ${attack} was a ${result}`);
        addTextToSquare(true, attack[0], attack[1], 0, 1, result == 'miss' ? '-' : '*');
        takeTurn(players, playerNum == 0 ? 1 : 0, 0)
    }
}

battleship(x, y, [...ships])
