let dataHandler = {
    saveData: function(board_data, title, score) {
        fetch('/save-game', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                game_state: board_data,
                save_title: title,
                save_score: score
            })
        })
        .then(response => response.json())
        .then(result => dom.flashResult(result))
        .catch(err => console.log(err))
    },
    getSavedGames: function() {
        fetch('/get-saved-games')
        .then(response => response.json())
        .then(data => dom.displaySavedGames(data.body))
        .catch(err => console.log(err))
    }
}