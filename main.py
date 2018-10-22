from flask import Flask, request, redirect, render_template, url_for, session, flash
from logic import user_handler as uh

app = Flask(__name__)


@app.route('/')
def main():
    return render_template('main.html')


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


@app.route('/game')
@uh.authenticate_user
def game():
    return render_template('gameplay.html')


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
