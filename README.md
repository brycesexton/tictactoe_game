# tictactoe_game

<img width="1266" alt="TIC TAC WIREFRAME" src="https://github.com/brycesexton/tictactoe_game/assets/144744378/8f83bfa2-e8fa-447d-8f87-778676cc28d4">


// pseudo-code for game functionality

    // define all necessary variables, array for x/o
    // event listeners for x/o click, start/restart

    // game start
        //click in desired field

    // function to handle clicks
        // update the board and each cell's content
        // check to see if cell has been populated already
        // switch to the next player after each turn
        // check for win or a draw

    // function to check for a win
        // check for a win
        // true if win / false if not

    // function to check for draw
        // logic to check for a draw
        // true if draw / false if not

    // result function
        // display if win or draw + allow player to restart the game
        // restart button (reset CSS elements)

    // initialize the game


    **FINAL README**
Overview:

-2 player game on a 3x3 grid.  
-Players take turns clicking the cells to place symbols.  
-The game ends when a player wins by filling a row, column or diagonal, or when the board is filled resulting in a draw.

Notes:

-Game reset happens when you click “Play Again” which only appears after a win has been found. 
-Each cell has event handlers defined to respond to clicks.  
-The game checks the winner after each move by examining the rows, columns and diagonals. If a winner is found or the board is full, the game is eligible to restart.
-The render() function updates the visual representation of the game.  
-The message area shows the current player and the result of the move or game. 
-The visibility of the play button is adjusted depending on whether the game has finished. 

Functions:

resetBoard()
-Resets the game then switches between 'X' and 'O'.
-Invokes the init() function.
placeXO()
-Handles the click event on a cell, so players can place their symbols on the board.
getWinner()
-Checks for winner after each click by examining rows, columns, and diagonals.
-Returns the winning player or tie.
renderBoard()
-Updates the game board based on its current state.
renderMessage()
-Updates the message bar to display the current player's turn and the result of the game
renderControls()
-Adjusts the visibility of the "Play Again" button based on if a winner has been found.




