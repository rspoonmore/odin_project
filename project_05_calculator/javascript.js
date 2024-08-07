function editCurrentNumber() {
    currentNumber = currentNumber + idDictionary[this.id];
    screen.textContent = currentNumber;
};

function checkCurrentNumber() {
    let pointCount = 0;
    for (let i = 0; i < currentNumber.length; i++){
        pointCount += currentNumber[i] == '.' ? 1 : 0;
        if (pointCount > 1) {
            return false;
        }
    }
    return !isNaN(parseFloat(currentNumber));
}

function clearPressed() {
    screen.textContent = "";
    if (currentNumber == "") {
        equation = [];
    }
    else {
        currentNumber = "";
    }
}

function addOperation() {
    if (!checkCurrentNumber()) {
        alert(`The current number of ${currentNumber} is not valid`);
    }
    else {
        equation.push(currentNumber);
        equation.push(idDictionary[this.id]);
    }
    currentNumber = "";
    screen.textContent = "";
}

function evaluate() {
    if (!checkCurrentNumber()) {
        alert(`The current number of ${currentNumber} is not valid`);
        currentNumber = "";
        screen.textContent = "";
        return;
    }
    equation.push(currentNumber);
    let equationString = equation.join(' ');
    let result = eval(equationString);
    result = Math.round(result * 1000) / 1000;
    if (!isNaN(result)) {
        screen.textContent = result;
    }
    else {
        alert(`Error calculating results of ${equationString}. Got ${result}`);
    }
    currentNumber = "";
    equation = [];
}

idDictionary = {
    'point': '.',
    'zero': '0',
    'one': '1',
    'two': '2',
    'three': '3',
    'four': '4',
    'five': '5',
    'six': '6',
    'seven': '7',
    'eight': '8',
    'nine': '9',
    'plus': '+',
    'sub': '-',
    'mult': '*',
    'divide': '/'
};

let screen = document.querySelector('#screen');
let bEnter = document.querySelector('#enter');
let bClear = document.querySelector('#clear');
let bNumerals = document.querySelectorAll('.numeral');
let bOperations = document.querySelectorAll('.operation');
let currentNumber = "";
let equation = [];

for(let i = 0; i < bNumerals.length; i++) {
    bNumerals[i].addEventListener('click', editCurrentNumber);
};

for(let i = 0; i < bOperations.length; i++) {
    bOperations[i].addEventListener('click', addOperation);
};

bEnter.addEventListener('click', evaluate);
bClear.addEventListener('click', clearPressed);
