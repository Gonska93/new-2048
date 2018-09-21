gameBoard = [[0, 0, 0, 0],
             [0, 0, 0, 0],
             [0, 0, 0, 0],
             [0, 0, 0, 0]];

table = ['A1', 'A2', 'A3', 'A4',
         'B1', 'B2', 'B3', 'B4',
         'C1', 'C2', 'C3', 'C4',
         'D1', 'D2', 'D3', 'D4'];

colors = {'': 'white', 2: 'orange', 4: 'red', 8: 'green', 16: 'blue'};

ZERO = 0; 
ONE = 1;
TWO = 2;

LEFT = 1;
UP = 2;
RIGHT = 3;
DOWN = 4;

STARTED = false;


function refreshGameBoard(game_board) {
    var displayBoard = game_board.flat();

    for (let i = 0; i < table.length; i++) {
        var element = document.getElementById(table[i]);
        if (displayBoard[i] != 0) {
            element.innerHTML = displayBoard[i];
        }
        else {
            element.innerHTML = '';
        }
        addColors(table[i]);
    }
}

function addColors (element_id) {
    var el = document.getElementById(element_id);
        content = el.textContent;
        el.style.background = colors[content];
}


function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function insertRandomTile(game_board) {
    let pair = [getRandom(0,3), getRandom(0,3)];
    let flatBoard = game_board.flat();

    if (flatBoard.indexOf(0) > -1) {
        while (game_board[pair[0]][pair[1]] != 0) {
            pair = [getRandom(0,3), getRandom(0,3)]
        }

        if (getRandom(0, 20) == 10) {
            game_board[pair[0]][pair[1]] = TWO*TWO;
        }
        else {
            game_board[pair[0]][pair[1]] = TWO;
        }
    }
    return game_board
}

function startGame() {
    gameBoard = insertRandomTile(gameBoard);
    gameBoard = insertRandomTile(gameBoard);

    STARTED = true;

    refreshGameBoard(gameBoard);

    let startButton = document.getElementById('start-button');
        startButton.setAttribute('onclick', 'resetProgress()');
        startButton.innerHTML = 'Reset';
    
}

function resetProgress() {
    gameBoard = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    refreshGameBoard(gameBoard);

    let startButton = document.getElementById('start-button');
        startButton.setAttribute('onclick', 'startGame()');
        startButton.innerHTML = 'Start Game';
    
    STARTED = false;
}


function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}


document.onkeydown = function(e) {
    e = e || window.event;
    switch(e.which || e.keyCode) {
        case 37: // left
        gameBoard = movement(1, gameBoard);
        break;

        case 38: // up
        gameBoard = movement(2, gameBoard);
        break;

        case 39: // right
        gameBoard = movement(3, gameBoard);
        break;

        case 40: // down
        gameBoard = movement(4, gameBoard);
        break;

        default: return; // exit this handler for other keys
    }
    refreshGameBoard(gameBoard);
    e.preventDefault(); // prevent the default action (scroll / move caret)
};

function movement(movement_direction, game_board) {
    let movement = {1: 'left',
                    2: 'up',
                    3: 'right',
                    4: 'down'}
    
    var boardBeforeMovement = game_board.slice();

    if (movement_direction in movement) {
        switch (movement_direction) {
            case UP:
                game_board = rotateBoard(game_board);
                break;
            case RIGHT:
                game_board = reverseBoard(game_board);
                break;
            case DOWN:
                game_board = rotateBoard(game_board);
                game_board = reverseBoard(game_board);
                break;
        }

        game_board = reduceZeros(game_board);
        sumTiles(game_board);
        game_board = reduceZeros(game_board);

        switch (movement_direction) {
            case UP:
                game_board = rotateBoard(game_board);
                comparison = arraysEqual(boardBeforeMovement, game_board);
                break;
            case RIGHT:
                comparison = arraysEqual(boardBeforeMovement,game_board);
                game_board = reverseBoard(game_board);
                break;
            case DOWN:
                game_board = rotateBoard(game_board);
                game_board = game_board.reverse();
                comparison = arraysEqual(boardBeforeMovement, game_board);
                break;
            case LEFT:
                comparison = arraysEqual(boardBeforeMovement, game_board);
                break;
        }
        if (!(comparison)) {
            game_board = insertRandomTile(game_board);
        }
    }
    return game_board
}

// defult - moving tiles to left side
function reduceZeros(game_board) {
    var result = [];
    for (row of game_board) {
        var counter = 0;
        var temporary_list = [];
        for (element of row) {
            if (element != 0) {
                temporary_list.push(element);
            }
            else {
                counter = counter + 1;
            }
        }
        for (var i = 0; i < counter; i++) {
            temporary_list.push(0);
        }
        result.push(temporary_list);
    }
    return result;
}

// default - summing to left direction
function sumTiles(game_board) {
    for (row of game_board) {
        if ((row[0] == row[1]) && (row[0] != ZERO)) {
            row[0] = row[0]*TWO;
            row[1] = ZERO;
        }
        if ((row[1] == row[2]) && (row[1] != ZERO)) {
            row[1] = row[1]*TWO;
            row[2] = ZERO;
        }
        if ((row[2] == row[3]) && (row[2] != ZERO)) {
            row[2] = row[2]*TWO;
            row[3] = ZERO;
        }
    }
}

function rotateBoard(game_board) {
    var result = [];
    var row, column;
    for (column = 0; column < 4; column++) {
        var temp = []
        for (row = 0; row < 4; row++) {
            temp.push(game_board[row][column])
        }
        result.push(temp);
    }
    return result;
}

// reverse all elements inside rows
function reverseBoard(game_board) {
    var result = [];
    for (row of game_board) {
        result.push(row.reverse());
    }
    return result;
}


function arraysEqual(arr1, arr2) {
    if(arr1.length !== arr2.length) {
        return false;
    }
    for(var i = 0; i < arr1.length; i++) {
        for (var j = 0; j < arr1[i].length; j++){
        if(arr1[i][j] !== arr2[i][j])
            return false;
        }
    }
    return true;
}