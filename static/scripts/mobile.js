let mobileGameplay = {
    hammertime: new Hammer(document.getElementById('game-board')),

    swipeFunc: function(direction) {
                return () => { if (gameplay.started) {
                        gameplay.gameBoard = gameplay.movement(direction, gameplay.gameBoard)
                        gameplay.refreshGameBoard(gameplay.gameBoard);
                    }
                }
    },

    init: function() {
        this.hammertime.get('swipe').set({ direction: Hammer.DIRECTION_ALL }),
        this.hammertime.on('swipeleft', this.swipeFunc(1));
        this.hammertime.on('swipeup', this.swipeFunc(2));
        this.hammertime.on('swiperight', this.swipeFunc(3));
        this.hammertime.on('swipedown', this.swipeFunc(4));
    }
}

mobileGameplay.init();




