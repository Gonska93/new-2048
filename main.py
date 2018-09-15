from flask import Flask, request, redirect, render_template, url_for
import logic

app = Flask(__name__)


@app.route('/')
def main():
    return render_template('main.html')


@app.route('/game')
def game():
    game = logic.start_game()
    return render_template('gameplay.html', game=game)


@app.route('/game/left')
def move_left():
    game = logic.get_progress()
    game = logic.make_movement(game, 4)
    logic.save_progress(game)
    return render_template('gameplay.html', game=game)


@app.route('/game/right')
def move_right():
    game = logic.get_progress()
    game = logic.make_movement(game, 2)
    logic.save_progress(game)
    return render_template('gameplay.html', game=game)


@app.route('/game/up')
def move_up():
    game = logic.get_progress()
    game = logic.make_movement(game, 1)
    logic.save_progress(game)
    return render_template('gameplay.html', game=game)


@app.route('/game/down')
def move_down():
    game = logic.get_progress()
    game = logic.make_movement(game, 3)
    logic.save_progress(game)
    return render_template('gameplay.html', game=game)


if __name__ == "__main__":
    app.run(
        host='127.0.0.1',
        port=5000,
        debug=True
    )
