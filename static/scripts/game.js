document.onkeydown = function(ev) {
    if (gameplay.started === true) {
        if (gameplay.checkAnyMovementAvailability(gameplay.gameBoard)) {
            ev = ev || window.event;
            switch(ev.which || ev.keyCode) {
                case 37: // left
                gameplay.gameBoard = gameplay.movement(1, gameplay.gameBoard);
                break;

                case 38: // up
                gameplay.gameBoard = gameplay.movement(2, gameplay.gameBoard);
                break;

                case 39: // right
                gameplay.gameBoard = gameplay.movement(3, gameplay.gameBoard);
                break;

                case 40: // down
                gameplay.gameBoard = gameplay.movement(4, gameplay.gameBoard);
                break;

                default: return; // exit this handler for other keys
            }
            gameplay.refreshGameBoard(gameplay.gameBoard);
            ev.preventDefault(); // prevent the default action (scroll / move caret)
        }
        else {
            document.write('GAME OVER!');
        }
    }
};

const gameplay = {
    gameBoard: [[0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]],

    table: ['A1', 'A2', 'A3', 'A4',
            'B1', 'B2', 'B3', 'B4',
            'C1', 'C2', 'C3', 'C4',
            'D1', 'D2', 'D3', 'D4'],

    colors: {'': 'white', 2: 'orange', 4: 'yellow', 8: 'green', 16: 'blue', 32: 'purple', 64: 'lightgreen', 128: 'aqua', 256: 'lightblue', 512: 'lightgreen',
            1024: 'red', 2048: 'brown'},

    constant: {'zero': 0, 'one': 1, 'two': 2, 'four': 4, 'left': 1, 'up': 2, 'right': 3, 'down': 4},

    started: false,

    refreshGameBoard: function (game_board) {
        let displayBoard = game_board.flat(),
            toInsert;

        for (let i = 0; i < this.table.length; i++) {
            $(`#${gameplay.table[i]}`).text(
                (displayBoard[i]) ? toInsert = displayBoard[i]: toInsert = ''
            );
            this.addColors(this.table[i]);
        }
    },

    addColors: function (element_id) {
        let el = $(`#${element_id}`),
            content = el.text();

        el.css('background-color', this.colors[content]);
    },

    getRandom: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    insertRandomTile: function (game_board) {
        let pair = [this.getRandom(0,3), this.getRandom(0,3)];
        let flatBoard = game_board.flat();

        if (flatBoard.indexOf(0) > -1) {
            while (game_board[pair[0]][pair[1]] !== this.constant.zero) {
                pair = [this.getRandom(0,3), this.getRandom(0,3)]
            }

        game_board[pair[0]][pair[1]] = (this.getRandom(0, 20) === 10) ? this.constant.four: this.constant.two;
        }

        return game_board
    },

    startGame: function() {
        let startButton = document.getElementById('start-button');
        startButton.addEventListener('click', this.resetProgress);
        startButton.innerHTML = 'Reset';

        this.gameBoard = this.insertRandomTile(this.gameBoard);
        this.gameBoard = this.insertRandomTile(this.gameBoard);
        this.started = true;
        this.refreshGameBoard(this.gameBoard);
    },

    resetProgress: function () {
        let startButton = document.getElementById('start-button');
        startButton.innerHTML = 'Start Game';
        startButton.addEventListener("click", this.startGame);
       
        this.gameBoard = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
        this.started = true;
        gameplay.refreshGameBoard(this.gameBoard);
    },

    round: function (value, precision) {
        let multiplier = Math.pow(10, precision || 0);
        return Math.round(value * multiplier) / multiplier;
    },

    movement: function (movement_direction, game_board) {
        let movement = {1: 'left',
                        2: 'up',
                        3: 'right',
                        4: 'down'}
        
        let boardBeforeMovement = game_board.slice();

        if (movement_direction in movement) {
            switch (movement_direction) {
                case this.constant.up:
                    game_board = this.rotateBoard(game_board);
                    break;
                case this.constant.right:
                    game_board = this.reverseBoard(game_board);
                    break;
                case this.constant.down:
                    game_board = this.rotateBoard(game_board);
                    game_board = this.reverseBoard(game_board);
                    break;
            }

            game_board = this.reduceZeros(game_board);
            this.sumTiles(game_board);
            game_board = this.reduceZeros(game_board);

            let comparison;
            switch (movement_direction) {
                case this.constant.up:
                    game_board = this.rotateBoard(game_board);
                    comparison = this.arraysEqual(boardBeforeMovement, game_board);
                    break;
                case this.constant.right:
                    comparison = this.arraysEqual(boardBeforeMovement,game_board);
                    game_board = this.reverseBoard(game_board);
                    break;
                case this.constant.down:
                    game_board = this.rotateBoard(game_board);
                    game_board = game_board.reverse();
                    comparison = this.arraysEqual(boardBeforeMovement, game_board);
                    break;
                case this.constant.left:
                    comparison = this.arraysEqual(boardBeforeMovement, game_board);
                    break;
            }
            if (!(comparison)) {
                game_board = this.insertRandomTile(game_board);
            }
        }
        return game_board
    },

    // defult - moving tiles to left side
    reduceZeros: function (game_board) {
        let result = [];
        for (let row of game_board) {
            let counter = 0;
            let temporary_list = [];
            for (let element of row) {
                if (element !== 0) {
                    temporary_list.push(element);
                }
                else {
                    counter++;
                }
            }
            for (let i = 0; i < counter; i++) {
                temporary_list.push(0);
            }
            result.push(temporary_list);
        }
        return result;
    },

    // default - summing to left direction
    sumTiles: function (game_board) {
        for (let row of game_board) {
            if ((row[0] === row[1]) && (row[0] !== this.constant.zero)) {
                row[0] = row[0]*this.constant.two;
                row[1] = this.constant.zero;
            }
            else if ((row[1] === row[2]) && (row[1] !== this.constant.zero)) {
                row[1] = row[1]*this.constant.two;
                row[2] = this.constant.zero;
            }
            else if ((row[2] === row[3]) && (row[2] !== this.constant.zero)) {
                row[2] = row[2]*this.constant.two;
                row[3] = this.constant.zero;
            }
        }
    },
    rotateBoard: function (game_board) {
        let result = [];

        for (let column = 0; column < 4; column++) {
            let temp = [];
            for (let row = 0; row < 4; row++) {
                temp.push(game_board[row][column])
            }
            result.push(temp);
        }
        return result;
    },

    // reverse all elements inside rows
    reverseBoard: function (game_board) {
        let result = [];

        for (let row of game_board) {
            result.push(row.reverse());
        }
        return result;
    },

    arraysEqual: function (arr1, arr2) {
        if(arr1.length !== arr2.length) {
            return false;
        }
        for(let i = 0; i < arr1.length; i++) {
            for (let j = 0; j < arr1[i].length; j++){
            if(arr1[i][j] !== arr2[i][j])
                return false;
            }
        }
        return true;
    },

    checkAnyMovementAvailability: function (board_name) {
        let movements = [this.constant.left, this.constant.up, this.constant.right, this.constant.down];

        for (let mov of movements) {
            let copy = [];
            for (let row of board_name) {
                copy.push(row.slice());
            }
            if (!(this.arraysEqual(board_name, this.movement(mov, copy)))) {
                return true;
            }
        }
        return false;
    }
};