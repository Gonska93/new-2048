<<<<<<< HEAD
from flask import Flask, request, redirect, render_template, url_for, session, flash
from flask_socketio import SocketIO
from logic import user_handler as uh
=======
from flask import Flask, request, redirect, render_template, url_for, session, flash, jsonify
from logic import user_handler as uh, data_logic as dl
>>>>>>> Added new route for handling ajax POST requests
from util import GAME_MODES


app = Flask(__name__)
app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'
app.config['SECRET_KEY'] = 'vnkdjnfjknfl1232#'
socketio = SocketIO(app)


@app.route('/')
def main():

    return render_template('main.html', gamemodes=GAME_MODES)


@app.route('/login', methods=['POST'])
def login():
    form_dict = request.form.to_dict()
    result = uh.login_user(form_dict)
    flash(result['message'], result['status'])

    return redirect(url_for('main'))


@app.route('/register', methods=['POST'])
def register():
    form_dict = request.form.to_dict()
    result = uh.register_user(form_dict)
    flash(result['message'], result['status'])

    return redirect(url_for('main'))


@app.route('/game/<mode>')
@uh.authenticate_user
def game(mode):

    return render_template('gameplay.html', gamemode=mode)


@app.route('/logout')
@uh.authenticate_user
def logout():
    session.clear()

    return redirect(url_for('main'))


<<<<<<< HEAD
@socketio.on('user_connected')
def handle_user_connection(json):
    json['message'] = session['player_name'] + ' has connected.'
    socketio.emit('response', json)


@socketio.on('message')
def handle_message(json):
    json['player_name'] = session['player_name']
    socketio.emit('response', json)
=======
@app.route('/save-game', methods=['POST'])
@uh.authenticate_user
def save_data():
    data = request.get_json()
    result = dl.save_game(data, session['player_name'])
    
    return jsonify(result)


@app.route('/get-saved-games')
@uh.authenticate_user
def get_saved_games():
    result = dl.get_saved_games_by_user(session['player_name'])

    return jsonify(result)
>>>>>>> Added new route for handling ajax POST requests


if __name__ == "__main__":
    socketio.run(app,
                 host="127.0.0.1",
                 port=5000,
                 debug=True)
