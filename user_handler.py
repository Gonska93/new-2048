from flask import session, redirect, url_for, flash
from functools import wraps
from werkzeug.security import generate_password_hash, check_password_hash
import data_handler as dh


def authenticate_user(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        if 'player_name' in session:
            return func(*args, **kwargs)
        else:
            flash('You must be logged in to play.')
            return redirect(url_for('main'))
    return wrapper


def register_user(registration_form):
    """
    Takes user form as argument, check if username exists,
    if doesn't then hash password,create new user and set message to positive.
    Else set message to negative.

    Args: Dictionary with 'username' and 'password' keys.

    """

    result = {'status': True, 'message': 'Successfully registered!'}
    add_user_state = dh.add_player(registration_form)

    if not add_user_state:
        result['status'] = False
        result['message'] = 'Username already exists.'

    return result


def login_user(login_form):
    """
    Takes login form as argument, check if player name exist,
    if yes - hash password and compare to its password in player table,
    if everything correct then set session player name

    ARG: Dictionary with 'username' and 'password' keys.

    """

    player_name = login_form['username']
    check_player_existance = dh.get_player(player_name)

    if check_player_existance:
        form_password = login_form.get('password')
        player_password = dh.get_player_password(player_name)

        if check_password_hash(player_password, form_password):
            session['player_name'] = player_name
            flash('Successfully logged in!')
        else:
            flash('Wrong player name or password!')
