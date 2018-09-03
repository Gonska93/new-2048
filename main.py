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

	
@app.route('/reset')
def reset():
	game = logic.start_game()
	return redirect(url_for('game'))

	
@app.route('/game/left')
def move_left():
	game = logic.get_progress()
	return redirect(url_for('game'))
	

if __name__ == "__main__":
    app.run(
        host='127.0.0.1',
        port=5000,
        debug=True
    )