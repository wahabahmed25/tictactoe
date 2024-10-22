const boardInput = document.getElementById("game-board");
const introductionText = document.getElementById("intro-text");
const restartInput = document.getElementById("restart")
const p1ScoreInput = document.getElementById("p1Score");
const p2ScoreInput = document.getElementById("p2Score");
const turnIndicator = document.getElementById("turn-indicator");
const gameResults = document.getElementById("game-result")
const gameBoard = document.querySelectorAll('game-board-1')

//whenever you click the grid postions, it places an X/O
//1 1, 2 2, 3 3 diagnal win
//1 1 , 1 2, 1 3 vertical win
//1 1 , 2 1, 3 1 horizontal win
//general gamerule

//when player "1" -->  use X, when player "2" --> use O
//when playerX wins display game results ("playerX wins")
//which saves score whichever player
//when clicked restart empty gameresults and board

//store an array of winning combinations instead, then compare whether they match the winning conditions
//alternating moves: when p1 = 1 --> p1 turn if 0 p2 turn

//variables

const gridSize = 9;

let plScore = 0;
let p2Score = 0;
let playerOne = 1;
let playerTwo = 0;
let currentPlayer = playerOne; //player 1 always goes first
let board = Array(gridSize).fill(null) //represents the state of the game, like which cell is occupied by X or O
let gameActive = true; //keeps track if the game is ongoing or ended
let winner = gameResults;
let movesCount = 0; //keeping track of moves can help determine whether game is gonna end in a draw


//winning condition array:
const winningConditions = [
    [0,1,2], //row 1
    [3,4,5], //row 2
    [6,7,8], //row 3
    [0,3,6], //col 1
    [1,4,7], //col 2
    [2,5,8], //col 3
    [0,4,8], //diag 1
    [2,4,6], //diag 2
];



let gameRule = () => {
    // Loop over each winning condition
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        const cellA = board[a];
        const cellB = board[b];
        const cellC = board[c];

        // Check if cells are not null and they are the same (X or O)
        if (cellA && cellA === cellB && cellA === cellC) {
            // Determine the winner
            gameResults.textContent = `${cellA === "X" ? 'Player 1' : 'Player 2'} wins!`;
            gameResults.style.display = "block";
            if (cellA === "X") {
                plScore += 1;
                p1ScoreInput.textContent = `p1 Score: ${plScore}`;
            } else {
                p2Score += 1;
                p2ScoreInput.textContent = `p1 Score: ${p2Score}`;
            }
            gameActive = false; // End the game

            setTimeout(() => {
                
                resetGame();
            }, 2050); // Delay before resetting the game
            return; // Exit the function after finding a winner
        }
    }

    // Check for a draw
    if (movesCount === 9) {
        gameResults.textContent = "It's a draw!";
        gameResults.style.display = "block";

        gameActive = false; // End the game

        setTimeout(() => {
            
            resetGame();
        }, 2050); // Delay before resetting the game
    }
};

let player = () =>{
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell=>{
        cell.addEventListener('click',()=>{
            if(!gameActive) return;
            const index = Number(cell.dataset.index);
            if(board[index] !== null){
                return;
            }

            board[index] = currentPlayer === playerOne ? "X" : "O";
            cell.textContent = currentPlayer === playerOne ? "X" : "O";
            movesCount+=1;

            gameRule();

            currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
            turnIndicator.textContent = currentPlayer === playerOne ? "Player 1 Turn" : "Player 2 Turn"
            console.log("cell clicked: ", cell.dataset.index);
        })
    })
}



let resetGame = () => {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.textContent = ''; // Clear the cell text
    });
    turnIndicator.textContent = 'Player 1 Turn';
    gameResults.textContent = '';
    
    
    movesCount = 0; // Reset the move count
    currentPlayer = playerOne; // Reset to player 1
    board.fill(null); // Reset the board array
    gameActive = true; // Make sure the game is active again

    // Clear the scores as well
    p1ScoreInput.textContent = `p1 Score: ${plScore}`;
    p2ScoreInput.textContent = `p2 Score: ${p2Score}`;

    boardInput.style.display = 'none';
    restartInput.style.display = '';
    

    // Show the board again
    boardInput.style.display = 'grid'; // Change to your desired display style
    winner.style.display = ''; // Hide the winner message
};


let restart = () => {
    restartInput.addEventListener('click', ()=>{
        resetGame();
    })
}

player()
restart()