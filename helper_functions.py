import random
import numpy as np

ZERO = 0
ONE = 1
TWO = 2


def chunks(l, n):
    # For item i in a range that is a length of l,
    for i in range(0, len(l), n):
        # Create an index range for l of n items:
        yield l[i:i+n]


def get_random_pairs():
    """
    using random module gets 2 random pairs and returns them in list of lists
    """

    a = random.randint(0, 3)
    b = random.randint(0, 3)

    condition = True

    while condition:
        c = random.randint(0, 3)
        d = random.randint(0, 3)
        if (c != a) or (d != b):
            condition = False

    first_pair = [a, b]
    second_pair = [c, d]

    return [first_pair, second_pair]


def insert_random(game):
    a = random.randint(0, 3)
    b = random.randint(0, 3)

    condition = True

    while condition:
        if game[a][b] == ZERO:
            game[a][b] = TWO
            condition = False
        a = random.randint(0, 3)
        b = random.randint(0, 3)

    return game


def insert_random_2(game):
    """
    Insert two 2s in two empty places in our game board
    NOTICE: game board must be empty. (fullfilled with 0s)
    """

    pairs = get_random_pairs()

    first_pair = pairs[0]
    second_pair = pairs[1]

    game[first_pair[0]][first_pair[1]] = TWO
    game[second_pair[0]][second_pair[1]] = TWO

    return game


def reduce_zeroes(game):
    """
    reduce zeroes only in left direction
    """
    result = []
    for row in game:
        counter = 0
        temporary_list = []
        for element in row:
            if element != 0:
                temporary_list.append(element)
            else:
                counter += 1
        temporary_list += [0]*counter
        result.append(temporary_list)

    return result


def add_tiles(game):
    """
    add tiles if available in the game board(list of lists) only in left direction
    """

    for row in game:
        if row[0] == row[1] and row[0] != ZERO:
            row[0] = row[0]*TWO
            row[1] = ZERO
        if row[2] == row[3] and row[2] != ZERO:
            row[2] = row[2]*TWO
            row[3] = ZERO
        if row[1] == row[2] and row[1] != ZERO:
            row[1] = row[1]*TWO
            row[2] = ZERO

    return game


def move(game, movement_direction=4):
    """
    make tiles movement in the game board(list of lists), returns game board after movement:

                    1
                    |
                    |
             4------ ------2
                    |
                    |
                    3

    """

    movement = {'up': 1, 'right': 2, 'down': 3, 'left': 4}

    if movement_direction == movement['up']:
        game = np.rot90(game, k=1)
    elif movement_direction == movement['right']:
        game = np.fliplr(game)
    elif movement_direction == movement['down']:
        game = np.rot90(game, k=3)

    game = reduce_zeroes(game)
    game = add_tiles(game)
    game = reduce_zeroes(game)

    if movement_direction == movement['up']:
        game = np.rot90(game, k=3)
    elif movement_direction == movement['right']:
        game = np.fliplr(game)
    elif movement_direction == movement['down']:
        game = np.rot90(game, k=1)

    return game
