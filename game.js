const players = {
    '0': 'white',
    '1': 'X',
    '-1': 'O'
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
        ['', '', ''], // col 0
        ['', '', ''], // col 1
        ['', '', ''], // col 2
    //row0,  1,   2
    ];
    winner = null;
    initialPlayerChoice = null;

    boardEl.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const cell = document.createElement('div');
            cell.classList.add('tictac');
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener('click', placeMark);
            boardEl.appendChild(cell);
        }
    }

    document.getElementById('xButt').addEventListener('click', () => handlePlayerChoice('X'));
    document.getElementById('oButt').addEventListener('click', () => handlePlayerChoice('O'));

    playAgainBtn.style.visibility = 'hidden';
    // playAgainBtn.style.display = 'none';

    render();
}

function handlePlayerChoice(choice) {
    if (initialPlayerChoice === null) {
        initialPlayerChoice = choice;
        players['1'] = initialPlayerChoice === 'X' ? 'black' : 'white';
        players['-1'] = initialPlayerChoice === 'X' ? 'white' : 'black';

        document.getElementById('xButt').removeEventListener('click', () => handlePlayerChoice('X'));
        document.getElementById('oButt').removeEventListener('click', () => handlePlayerChoice('O'));

        document.querySelectorAll('.tictac').forEach(cell => {
            cell.addEventListener('click', placeMark);
            cell.style.cursor = 'pointer';
        });
    }
}

playAgainBtn.addEventListener('click', resetBoard);

function resetBoard() {
    // playAgainBtn.style.display = 'none';
    init();
}

function placeMark(evt) {
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
    if (
        board[rowIdx][0] === board[rowIdx][1] &&
        board[rowIdx][1] === board[rowIdx][2]
    ) {
        return board[rowIdx][0];
    }

    if (
        board[0][colIdx] === board[1][colIdx] &&
        board[1][colIdx] === board[2][colIdx]
    ) {
        return board[0][colIdx];
    }

    if (
        board[0][0] === board[1][1] &&
        board[1][1] === board[2][2]
    ) {
        return board[0][0];
    }
    if (
        board[0][2] === board[1][1] && 
        board[0][2] === board[2][0]

    ) {
        return board[0][2];
    }

    if (board.flat().every(cell => cell !== '')) {
        return 'T';
    }

    return null;
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
            cell.innerText = colVal === 1 ? 'X' : colVal === -1 ? 'O' : '';
            cell.style.color = players[colVal];
        });
    });
}

function renderMessage() {
    const messageEl = document.getElementById('message');
    messageEl.innerText = '';
    messageEl.style.color = 'rgb(82, 195, 172)';
    messageEl.style.fontSize = '30px';
    messageEl.style.fontWeight = 'bold';

    if (winner === 'T') {
        messageEl.innerText = "YOU TIED, TRY AGAIN!";
    } else if (winner) {
        messageEl.innerHTML = `<span style="color: ${players[winner]}">${players[winner].toUpperCase()}</span> WINS!`;
    } else {
        messageEl.innerHTML = `<span style="color: ${players[turn]}">${players[turn].toUpperCase()}</span> TURN.`;
    }
}

function renderControls() {
    playAgainBtn.style.visibility = winner ? 'visible' : 'hidden';
}

init();
