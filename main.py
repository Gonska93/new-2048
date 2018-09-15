from flask import Flask, request, redirect, render_template, url_for, session, flash
import logic
from os import urandom

app = Flask(__name__)


@app.route('/')
def main():
    return render_template('main.html')


@app.route('/game')
def game():
    return render_template('gameplay.html', game=game)


@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'GET':
        return render_template('register.html')
    else:
        new_player_data = request.form.to_dict()
        result = logic.register_user(new_player_data)
        flash(result['message'])
        if not result['status']:
            return redirect(url_for('register'))
        else:
            return redirect(url_for('main'))


if __name__ == "__main__":
    app.secret_key = urandom(24)
    app.run(
        host='127.0.0.1',
        port=5000,
        debug=True
    )
