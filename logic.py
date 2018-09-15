import data_handler as dh
import helper_functions as hf
import numpy as np
from werkzeug.security import generate_password_hash, check_password_hash


def register_user(registration_form):
    """
    Takes user form as argument, check if username exists,
    if doesn't then hash password,create new user and set message to positive.
    Else set message to negative.

    Args: Dictionary with 'username' and 'password' keys.

    """

    result = {'status': True, 'message': 'Successfully registered!'}
    add_user = dh.add_player(registration_form)
    if not add_user:
        result['status'] = False
        result['message'] = 'Username already exists.'

    return result


def insert_one_random(game):
    """
    insert one random number 2 on the game board
    """

    hf.insert_random(game)

    return game


def start_game():
    dh.save_to_file(EMPTY_BOARD)
    empty_game = dh.read_file()
    game = hf.insert_random_2(empty_game)
    dh.save_to_file(game)

    return game


def make_movement(game, movement_direction=4):
    """
    make tiles movement in the game board(list of lists), returns game board after movement:

                    1
                    |
                    |
            4 ------ ------ 2
                    |
                    |
                    3

    """

    copy = [item.copy() for item in game]
    copy = hf.move(copy, movement_direction)

    if not np.array_equal(copy, game):
        copy = hf.insert_random(copy)
        return copy
    else:
        return game
