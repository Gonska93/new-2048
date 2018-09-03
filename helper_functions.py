import random
import numpy as np

def chunks(l, n):
    # For item i in a range that is a length of l,
    for i in range(0, len(l), n):
        # Create an index range for l of n items:
        yield l[i:i+n]

		
def get_random_pairs():
	"""
	using random module gets 2 random pairs and returns them in list of lists
	"""
	
	a = random.randint(0,3)
	b = random.randint(0,3)

	condition = True

	while condition:
		c = random.randint(0,3)
		d = random.randint(0,3)
		if (c!=a) or (d!=b):
			condition = False
	
	first_pair = [a,b]
	second_pair = [c,d]
	
	return [first_pair, second_pair]

	
def reduce_zeroes(game):
	"""
	reduce zeroes only in left direction
	"""

	for row in game:
		if row[0] == '0':
			row[0] = row[1]
			row[1] = row[2]
			row[2] = row[3]
			row[3] = '0'
		if row[1] == '0':
			row[1] = row[2]
			row[2] = row[3]
			row[3] = '0'
		if row[2] == '0':
			row[2] = row[3]
			row[3] = '0'	
	return game

	
def add_tiles(game):
	"""
	add tiles if available in the game board(list of lists) only in left direction
	"""

	addable = {'first': 1, 'second': 1}
	for row in game:
		if row[3] != '0' and row[3] == row[2]:
			row[2] = str(int(row[2])*2)
			row[3] = '0'
			addable['first'] = 0
		elif row[2] != '0' and row[2] == row[1] and addable['first']:
			row[1] = str(int(row[1])*2)
			row[2] = '0'
			addable['second'] = 0
		elif row[1] != '0' and row[1] == row[0] and addable['second']:
			row[0] = str(int(row[0])*2)
			row[1] = '0'
	
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
		game = np.rot90(game, k=3)
	elif movement_direction == movement['right']:
		game = np.rot90(game, k=2)
	elif movement_direction == movement['down']:
		game = np.rot90(game, k=1)

	game = reduce_zeroes(game)
	add_tiles(game)
	game = reduce_zeroes(game)
	
	if movement_direction == movement['up']:
		game = np.rot90(game, k=1)
	elif movement_direction == movement['right']:
		game = np.rot90(game, k=2)
	elif movement_direction == movement['down']:
		game = np.rot90(game, k=3)

	return game
					