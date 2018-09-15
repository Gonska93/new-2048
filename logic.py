import data_handler as dh
import helper_functions as hf
import numpy as np


EMPTY_BOARD = [[0, 0, 0, 0],
               [0, 0, 0, 0],
               [0, 0, 0, 0],
               [0, 0, 0, 0]]


def get_progress():
    return dh.read_file()


def save_progress(game):
    return dh.save_to_file(game)


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
