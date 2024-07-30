const choices = ['Rock', 'Paper', 'Scissors'];

function getComputerChoice() {
    const choice = Math.floor(Math.random() * choices.length);
    return choices[choice];
};

function getHumanChoice(try_limit = 3) {
    let awaiting_choice = true;
    let tries = 1;
    while(awaiting_choice && tries <= try_limit) {
        let raw_input = prompt("Select the number of your choice\n0: Rock\n1: Paper\n2: Scissors");
        tries = tries + 1;
        let input_int = parseInt(raw_input);
        if ([0, 1, 2].includes(input_int)) {
            return choices[input_int];
        }
    }
    if (awaiting_choice) {
        return "No choice was made in the proper number of tries";
    }
    
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
}

function playGame(rounds = 3) {
    let scores = [0, 0];
    for (let i = 0; i < rounds; i++) {
        console.log(`Round ${i+1}`)
        let computerChoice = getComputerChoice();
        let playerChoice = getHumanChoice();
        let round_result = `Player chose ${playerChoice} and Computer chose ${computerChoice}. `
        let winner = decideWinner(computerChoice, playerChoice);
        switch (winner) {
            case "player":
                console.log(round_result + 'Player Wins!');
                scores[0] += 1;
                break;
            case "computer":
                console.log(round_result + 'Computer Wins!');
                scores[1] += 1;
                break;
            default:
                console.log(round_result + 'It is a tie!');
                break;
        }
    }
    console.log(`${rounds} rounds completed!\nFinal Score:\n\tPlayer: ${scores[0]}\n\tComputer: ${scores[1]}`);
}


function startGame() {
    requestedRounds = parseInt(prompt("How many rounds would you like to play?"));
    playGame(rounds = requestedRounds);
}

startGame();
