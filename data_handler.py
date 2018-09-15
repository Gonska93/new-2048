import helper_functions as hf

DIRECTORY = "data"
FILE_NAME = "game.csv"
ROWS = 4
STARTING_PROGRESS = [0]*(ROWS*ROWS)


def read_file():
    """
    Read game progress from file and returns list of list of rows,
    if file does not exist creates new file with STARTING PROGRESS data
    """

    try:
        with open(DIRECTORY+'/'+FILE_NAME, 'r') as file:
            content = file.read().split(',')
        content = list(hf.chunks(content, ROWS))
        result = [[int(e) for e in row] for row in content]

        return result
    except FileNotFoundError:
        with open(DIRECTORY+'/'+FILE_NAME, 'w+') as file:
            file.write(','.join(str(e) for e in STARTING_PROGRESS))
        return read_file()


def save_to_file(arg):
    """
    Takes list of lists of the game progress as argument and converts it to a list of strings of row to save in the file
    """

    unpacked = [str(item) for element in arg for item in element]
    converted = ','.join(unpacked)

    with open("%s/%s" % (DIRECTORY, FILE_NAME), 'w+') as file:
        file.writelines(converted)
