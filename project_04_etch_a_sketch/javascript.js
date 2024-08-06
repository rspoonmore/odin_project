function switchClass() {
    if (!this.classList.contains('hover')) {
        this.classList.add('hover');
    }
    let currentOpacity = this.style.opacity == "" ? 0 : parseFloat(this.style.opacity);
    console.log(currentOpacity);
    if (currentOpacity < 1) {
        console.log("opacity < 1", this.style.opacity);
        this.style.opacity = .1 + currentOpacity;
    }
};

function clearGrid(grid) {
    while(grid.firstChild) {
        grid.removeChild(grid.lastChild);
    }
}


function createGrid() {
    clearGrid(grid);
    for(let i = 0; i < nRows; i++) {
        let newRow = document.createElement('div');
        newRow.classList.add('cell-row');
        for(let j = 0; j < nCols; j++) {
            let newCell = document.createElement('div');
            newCell.classList.add('cell');
            newCell.addEventListener('mouseenter', switchClass)
            newRow.appendChild(newCell);
        }
        grid.appendChild(newRow);
    }
};

function isInputValid(input){
    if (input == "") {
        return false;
    }
    else if (typeof input != 'number') {
        return false;
    }
    else if (isNaN(input)) {
        return false;
    }
    else if (input < 1) {
        return false;
    }
    else if (input > 100) {
        return false;
    }
    else {
        return true;
    }
}

function resetHit() {
    let validInput = false;
    
    while (validInput == false) {
        nRows = parseInt(prompt("How many rows do you want? (Max 100)"));
        console.log(nRows);
        validInput = isInputValid(nRows);
    }

    validInput = false;
    while (validInput == false) {
        nCols = parseInt(prompt("How many columns do you want? (Max 100)"));
        console.log(nCols);
        validInput = isInputValid(nCols);
    }
    console.log(nRows, nCols);
    createGrid(nRows = nRows, nCols = nCols, grid = grid);
}

let nRows = 16;
let nCols =16;
let grid = document.querySelector('.grid');

let resetButton = document.querySelector('#reset');
resetButton.addEventListener('click', resetHit);

let clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', createGrid);
createGrid();

