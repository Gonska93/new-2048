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