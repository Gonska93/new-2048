from flask import Flask, request, redirect, render_template, url_for, session, flash
import logic
from os import urandom
import user_handler as uh


app = Flask(__name__)


@app.route('/', methods=['GET', 'POST'])
def main():
    if request.method == 'POST':
        form_dict = request.form.to_dict()
        if 'login' in form_dict:
            uh.login_user(form_dict)
        if 'register' in form_dict:
            result = uh.register_user(form_dict)
            flash(result['message'])
        return render_template('main.html')
    else:
        return render_template('main.html')


@app.route('/game')
@uh.authenticate_user
def game():
    return render_template('gameplay.html', game=game)


@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('main'))


if __name__ == "__main__":
    app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'
    app.run(
        host='127.0.0.1',
        port=5000,
        debug=True
    )
