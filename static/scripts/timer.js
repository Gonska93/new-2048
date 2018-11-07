let timer = {
    value: $('#mode').data('timer'),
    existence: false,
    running: null,

    startTimer: function(countdown=false) {
       this.running = setInterval(this.timeStep, 1000, countdown);
       timer.refresh();
    },

    stopTimer: function() {
        clearInterval(this.running);
        this.value = $('#mode').data('timer');
    },

    convertTime: function(secondsAmount) {
        let hours = Math.floor(secondsAmount/(3600)).toString(), 
            minutes = Math.floor(secondsAmount/60 % 60).toString(), 
            seconds = (secondsAmount%60).toString(),
            convertedHours = (hours.length < 2) ? `0${hours}`:hours,
            convertedMinutes = (minutes.length < 2) ? `0${minutes}`:minutes,
            convertedSeconds = (seconds.length < 2) ? `0${seconds}`:seconds;
        
        return `H:${convertedHours} M:${convertedMinutes} S:${convertedSeconds}`
    },

    timeStep: function(countdown) {
    if (countdown) {
        timer.value -= 1;
        if (timer.value < 0) {
            gameplay.gameState = 2;
            dom.updateGameOverModal();
        }
     }
    else {
        timer.value += 1;
    }
    timer.refresh();
    },

    refresh: function() {
        $('#timer').text(timer.convertTime(timer.value));
    },

    init: function () {
        $('#game-buttons').prepend($(`<div id="timer">${this.convertTime(this.value)}</div>`));
    }
};

