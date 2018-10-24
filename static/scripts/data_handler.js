let dataHandler = {
    saveData: function(board_data, title) {
        fetch('/save-game', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                game_state: board_data,
                save_title: title
            })
        })
        .then(response => response.json())
        .then(result => flashResult(result))
        .catch(err => console.log(err))
<<<<<<< HEAD
    },
    getSavedGames: function() {
        fetch('/get-saved-games')
        .then(response => response.json())
        .then(data => displaySavedGames(data.body))
        .catch(err => console.log(err))
=======
>>>>>>> Added new js module for ajax requests
    }
}