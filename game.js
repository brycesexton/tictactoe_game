const players = {
    '1': 'X',
    '-1': 'O'
};

let turn;
let board;
let winner;
let round; // ROUND

const boardEl = document.getElementById('board');
const playAgainBtn = document.getElementById('play-again-btn');

let initialPlayerChoice = null;

function init() {
    turn = 1;
    board = [
        ['', '', ''], // col 0
        ['', '', ''], // col 1
        ['', '', ''], // col 2
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

    render();
}

playAgainBtn.addEventListener('click', resetBoard);

function resetBoard() {
    init();
}

function placeMark(evt) {
    if (winner) {
        return;
    }

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

