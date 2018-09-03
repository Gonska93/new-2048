import data_handler as dh
import helper_functions as hf

EMPTY_BOARD = [[0,0,0,0],
			   [0,0,0,0],
	           [0,0,0,0],
	           [0,0,0,0]]


def get_progress():
	return dh.read_file()

	
def insert_random_2(game):
	"""
	Insert two 2s in two empty places in our game board
	NOTICE: game board must be empty. (fullfilled with '0's)
	"""
	
	pairs = hf.get_random_pairs()
	
	first_pair = pairs[0]
	second_pair = pairs[1]

	game[first_pair[0]][first_pair[1]] = '2'
	game[second_pair[0]][second_pair[1]] = '2'
	
	return game


def start_game():
	dh.save_to_file(EMPTY_BOARD)
	empty_game = dh.read_file()
	game = insert_random_2(empty_game)
	dh.save_to_file(game)
	
	return game

	
def reset():


	dh.save_to_file(empty_board)


def make_movement(game, movement_direction=4):
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

	game = hf.move(game)

	return game