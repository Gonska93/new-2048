from data import data_handler as dh

def save_game(data, player_name):
    result = {'status': True, 'message': 'Game saved!'}
    player_id = dh.get_player_id_by_username(player_name)
    try:
        dh.save_new_game(data['game_state'], data['save_title'], player_id)
    except:
        raise
        result['status'] = False
        result['message'] = 'Saving failed!'

    return result


def get_saved_games_by_user(username):
    result = {'status': True, 'message': 'Games loaded!', 'body': []}
    player_id = dh.get_player_id_by_username(username)
    try:
        result['body'] = dh.get_saved_states(player_id)
    except:
        result['status'] = False
        result['message'] = 'Loading failed!'

    return result
