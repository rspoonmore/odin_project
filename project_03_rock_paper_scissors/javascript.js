function getComputerChoice() {
    const choice = Math.floor(Math.random() * choices.length);
    return choices[choice];
};

function decideWinner(computerChoice, playerChoice) {
    if (computerChoice == playerChoice) {
        return "Tie";
    }
    if (computerChoice == "Rock") {
        return playerChoice == "Paper" ? "player" : "computer";
    }
    if (computerChoice == "Paper") {
        return playerChoice == "Scissors" ? "player" : "computer";
    }
    if (computerChoice == "Scissors") {
        return playerChoice == "Rock" ? "player" : "computer";
    }
};

function checkHiddenStatus() {
    const newGame = gamesPlayed == 0;
    const resultsClasses = Array.from(resultsSection.classList);

    if (newGame && !resultsClasses.includes('hidden')) {
        resultsSection.classList.add('hidden');
    }
    else if (!newGame && resultsClasses.includes('hidden')) {
        resultsSection.classList.remove('hidden');
    };
};


function resetGame() {
    score = [0, 0];
    gamesPlayed = 0;
    scoreSummary.textContent = "Results:"
    checkHiddenStatus();
};

function clickHumanChoice() {
    const humanChoice = this.id;
    const computerChoice = getComputerChoice();
    let round_result = `Player chose ${humanChoice} and Computer chose ${computerChoice}. `
    const winner = decideWinner(computerChoice, humanChoice);
    switch (winner) {
        case "player":
            round_result += 'Player Wins!';
            score[0] += 1;
            break;
        case "computer":
            round_result += 'Computer Wins!';
            score[1] += 1;
            break;
        default:
            round_result += 'It is a tie!';
            break;
    }
    
    gamesPlayed += 1;

    updateScore();
    updateSummary(round_result);
    checkHiddenStatus();
};

function updateScore() {
    scoreTitle.textContent = `Player: ${score[0]} Computer: ${score[1]}`;
};

function updateSummary(roundResult) {
    scoreSummary.innerHTML += `<br>${roundResult}`;
}

const choices = ['Rock', 'Paper', 'Scissors'];

const rockButton = document.querySelector('#Rock');
const paperButton = document.querySelector('#Paper');
const scissorsButton = document.querySelector('#Scissors');
const resetButton = document.querySelector('#reset');
const resultsSection = document.querySelector('#results-section');
const scoreTitle = document.querySelector('#score');
const scoreSummary = document.querySelector('#score-summary');

resetButton.addEventListener('click', resetGame);
rockButton.addEventListener('click', clickHumanChoice);
paperButton.addEventListener('click', clickHumanChoice);
scissorsButton.addEventListener('click', clickHumanChoice);

var gamesPlayed = 0;
var score = [0, 0];

updateScore();
checkHiddenStatus();

