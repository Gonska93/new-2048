from flask import session, redirect, url_for, flash
from functools import wraps
from werkzeug.security import check_password_hash, generate_password_hash

from util import USERNAME_LENGTH_RANGE
from data import data_handler as dh


def authenticate_user(func):
    """
    Decorator for authentication user. Created to use on routes.
    If username is in the session, continues with the function, else redirects to index page.

    :param func: Original function to prevent from not logged users.
    :return: Original function call or redirect.
    """
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
    username = registration_form['username']
    if username in dh.get_all_usernames():
        result['status'] = False
        result['message'] = 'Username already taken!'
    elif len(username) not in USERNAME_LENGTH_RANGE:
        result['status'] = False
        result['message'] = 'Username too long!'
    else:
        registration_form['password'] = generate_password_hash(registration_form['password'])
        dh.add_player(registration_form)

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
