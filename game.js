const players = {
    '0': 'white', //background color
    '1': 'black', // update later
    '-1': 'black' // update later
};

let turn;
let board;
let winner;

const boardEl = document.getElementById('board');
const playAgainBtn = document.getElementById('play-again-btn');

let initialPlayerChoice = null;

function init() {
    turn = 1;
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    winner = null;

    initialPlayerChoice = null;

    boardEl.innerHTML = ''; // Clear the board
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const cell = document.createElement('div');
            cell.classList.add('tictac');
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener('click', handleDrop);
            boardEl.appendChild(cell);
        }
    }

    document.getElementById('xButt').addEventListener('click', () => handlePlayerChoice('X'));
    document.getElementById('oButt').addEventListener('click', () => handlePlayerChoice('O'));

    playAgainBtn.style.visibility = 'hidden';

    render();
}

function handlePlayerChoice(choice) {
    if (initialPlayerChoice === null) {
        initialPlayerChoice = choice;
        players['1'] = initialPlayerChoice === 'X' ? 'purple' : 'orange';
        players['-1'] = initialPlayerChoice === 'X' ? 'orange' : 'purple';

        document.getElementById('xButt').removeEventListener('click', () => handlePlayerChoice('X'));
        document.getElementById('oButt').removeEventListener('click', () => handlePlayerChoice('O'));

        document.querySelectorAll('.tictac').forEach(cell => {
            cell.addEventListener('click', handleDrop);
            cell.style.cursor = 'pointer';
        });
    }
}

playAgainBtn.addEventListener('click', resetBoard);

function resetBoard() {
    init();
}

function handleDrop(evt) {
    const cell = evt.target;
    const rowIdx = cell.dataset.row;
    const colIdx = cell.dataset.col;

    if (board[rowIdx][colIdx] === '') {
        board[rowIdx][colIdx] = turn;
        turn *= -1;
        winner = getWinner(rowIdx, colIdx);
        render();
    }
}

function getWinner(rowIdx, colIdx) {
    function getWinner(rowIdx, colIdx) {
        // Check for horizontal win
        if (
            board[rowIdx][0] === board[rowIdx][1] &&
            board[rowIdx][1] === board[rowIdx][2]
        ) {
            return board[rowIdx][0];
        }
    
        // Check for vertical win
        if (
            board[0][colIdx] === board[1][colIdx] &&
            board[1][colIdx] === board[2][colIdx]
        ) {
            return board[0][colIdx];
        }
    
        // Check for diagonal win (top-left to bottom-right)
        if (
            rowIdx === colIdx &&
            board[0][0] === board[1][1] &&
            board[1][1] === board[2][2]
        ) {
            return board[0][0];
        }
    
        // Check for diagonal win (top-right to bottom-left)
        if (
            rowIdx + colIdx === 2 &&
            board[0][2] === board[1][1] &&
            board[1][1] === board[2][0]
        ) {
            return board[0][2];
        }
    
        // Check for a tie
        if (board.flat().every(cell => cell !== '')) {
            return 'T';
        }
    
        // No winner yet
        return null;
    }
}

function render() {
    renderBoard();
    renderMessage();
    renderControls();
}

function renderBoard() {
    board.forEach(function (rowArr, rowIdx) {
        rowArr.forEach(function (colVal, colIdx) {
            const cell = document.querySelector(`[data-row="${rowIdx}"][data-col="${colIdx}"]`);
            cell.style.backgroundColor = players[colVal];
        });
    });
}

function renderMessage() {
    const messageEl = document.getElementById('message');
    if (winner === 'T') {
        messageEl.innerText = "No winner, try again!";
    } else if (winner) {
        messageEl.innerHTML = `<span style="color: ${players[winner]}">${players[winner].toUpperCase()}</span> Wins!`;
    } else {
        messageEl.innerHTML = `<span style="color: ${players[turn]}">${players[turn].toUpperCase()}</span>'s turn`;
    }
}

function renderControls() {
    playAgainBtn.style.visibility = winner ? 'visible' : 'hidden';
}

init();
