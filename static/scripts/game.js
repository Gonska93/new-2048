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

            if (gameplay.gameState == 1) {
                dom.updateGameOverModal();
            }

            ev.preventDefault(); // prevent the default action (scroll / move caret)
        }
        else {
            dom.updateGameOverModal()
        }
    }
};

const gameplay = {
    emptyBoard: [[0, 0, 0, 0],
                 [0, 0, 0, 0],
                 [0, 0, 0, 0],
                 [0, 0, 0, 0]],

    gameBoard: [[0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]],

    table: ['A1', 'A2', 'A3', 'A4',
            'B1', 'B2', 'B3', 'B4',
            'C1', 'C2', 'C3', 'C4',
            'D1', 'D2', 'D3', 'D4'],

    colors: {'': 'white', 2: 'orange', 4: 'yellow', 8: 'green', 16: 'blue', 32: 'purple',
            64: 'lightgreen', 128: 'aqua', 256: 'lightblue', 512: 'lightgreen',
            1024: 'red', 2048: 'brown'},

    constant: {'zero': 0, 'one': 1, 'two': 2, 'four': 4, 'left': 1, 'up': 2, 'right': 3, 'down': 4},

    started: false,

    gameMode: $('#mode').data('mode'),

    gameState: 0,

    score: 0,

    gameSettings: {},

    loadState: function(loadedState) {
        gameplay.gameBoard = loadedState.game_state;
        gameplay.score = loadedState.save_score;
        gameplay.refreshScore();
        gameplay.refreshGameBoard(gameplay.gameBoard);
    },

    refreshScore: function() {
        $('#score').text(gameplay.score);
    },

    saveGameState: function() {
        let title = $('#saveTitle').val();
        dataHandler.saveData(gameplay.gameBoard, title, gameplay.score);
        $('#saveInput').replaceWith(templates.getSaveButton());
        $('#saveBtn').on('click', dom.createTitleInput);
    },


    getGameSettings: function(mode) {
        return {
            maxTile: (mode === 'classic') ? false : 2048,
            timerOn: (mode !== 'classic'),
            isCountdown: (mode === 'time-attack')
        }
    },

    refreshGameBoard: function (game_board) {
        let displayBoard = game_board.flat();

        for (let i = 0; i < this.table.length; i++) {
            $(`#${gameplay.table[i]}`).text(
                (displayBoard[i]) ? displayBoard[i]: ''
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
        let pair = [this.getRandom(0,3), this.getRandom(0,3)],
            flatBoard = game_board.flat();

        if (flatBoard.indexOf(0) > -1) {
            while (game_board[pair[0]][pair[1]] !== this.constant.zero) {
                pair = [this.getRandom(0,3), this.getRandom(0,3)]
            }

        game_board[pair[0]][pair[1]] = (this.getRandom(0, 20) === 10) ? this.constant.four: this.constant.two;
        }

        return game_board
    },

    init: function() {
        $('#start-button').on('click', gameplay.startGame);
        this.gameSettings = this.getGameSettings(this.gameMode);
        if (this.gameSettings.timerOn) timer.init();
    },

    startGame: function() {
        let startButton = $('#start-button'),
            saveBtn = $('#saveBtn'),
            loadBtn = $('#loadBtn');

        startButton.off('click');
        startButton.on('click', gameplay.resetProgress);
        startButton.text('Reset');

        gameplay.gameBoard = gameplay.insertRandomTile(gameplay.gameBoard);
        gameplay.gameBoard = gameplay.insertRandomTile(gameplay.gameBoard);
        gameplay.started = true;

        if (gameplay.gameSettings.timerOn) timer.startTimer(gameplay.gameSettings.isCountdown);
        gameplay.refreshGameBoard(gameplay.gameBoard);

        saveBtn.off('click');
        saveBtn.on('click', dom.createTitleInput);

        loadBtn.off('click');
        loadBtn.on('click', dataHandler.getSavedGames);
    },

    resetProgress: function () {
        let startButton = $('#start-button'),
            saveBtn = $('#saveBtn'),
            loadBtn = $('#loadBtn');


        startButton.off('click');
        startButton.on('click', gameplay.startGame);
        startButton.text('Start Game');

        saveBtn.off('click');
        (loadBtn.length) ? loadBtn.off('click'): dom.restoreLoadBtn();
       
        gameplay.gameBoard = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
        gameplay.started = false;
        gameplay.score = 0;
        gameplay.refreshScore();

        if (gameplay.gameSettings.timerOn) timer.stopTimer();
        gameplay.refreshGameBoard(gameplay.gameBoard);
    },

    round: function (value, precision) {
        let multiplier = Math.pow(10, precision || 0);

        return Math.round(value * multiplier) / multiplier;
    },

    movement: function (movement_direction, game_board, score=true) {
        let movement = {1: 'left',
                        2: 'up',
                        3: 'right',
                        4: 'down'},
            boardBeforeMovement = game_board.slice(),
            comparison;

        if (movement_direction in movement) { // Rotate/reverse the game_board to make the movement

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
            game_board = this.sumTiles(game_board, score);
            gameplay.refreshScore();
            game_board = this.reduceZeros(game_board);

            switch (movement_direction) { //Rotate/reverse back the game_board and do comparison.

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

    // default - moving tiles to left side
    reduceZeros: function (game_board) {
        let result = [],
            counter,
            temporary_list,
            row,
            element,
            i;

        for (row of game_board) {
            counter = 0;
            temporary_list = [];

            for (element of row) {
                (element !== 0) ? temporary_list.push(element): counter++;
            }

            for (i = 0; i < counter; i++) {
                temporary_list.push(0);
            }

            result.push(temporary_list);

        }
        return result;
    },

    // default - summing to left direction
    sumTiles: function (game_board, score) {
        let temp = game_board.slice();
        for (let row of temp) {
            if ((row[0] === row[1]) && (row[0] !== this.constant.zero)) {
                (score) ? gameplay.score += row[0] * 10: null     
                row[0] = row[0]*this.constant.two;
                row[1] = this.constant.zero;
            }
            else if ((row[1] === row[2]) && (row[1] !== this.constant.zero)) {
                (score) ? gameplay.score += row[1] * 10: null  
                row[1] = row[1]*this.constant.two;
                row[2] = this.constant.zero;
            }
            else if ((row[2] === row[3]) && (row[2] !== this.constant.zero)) {
                (score) ? gameplay.score += row[2] * 10: null 
                row[2] = row[2]*this.constant.two;
                row[3] = this.constant.zero;
            }
        }
        return temp
    },

    rotateBoard: function (game_board) {
        let result = [],
            column,
            temp,
            row;

        for (column = 0; column < 4; column++) {
            temp = [];

            for (row = 0; row < 4; row++) {
                temp.push(game_board[row][column])
            }

            result.push(temp);
        }
        return result;
    },

    // reverse all elements inside rows
    reverseBoard: function (game_board) {
        let result = [],
            row;

        for (row of game_board) {
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
        let movements = [this.constant.left, this.constant.up, this.constant.right, this.constant.down],
            mov,
            copy,
            row;

        for (mov of movements) {
            copy = [];

            for (row of board_name) {
                copy.push(row.slice());
            }
            
            if (!(this.arraysEqual(board_name, this.movement(mov, copy, score=false)))) { // if during comparing following movement condition returns true
                return true;                                                 // don't check any other movements instantly return true
            }
        }
        return false;
    }
};

gameplay.init();