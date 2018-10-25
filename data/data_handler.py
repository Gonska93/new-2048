import data.db_connection as dbc


@dbc.connection_handler
def get_player(cursor, player_name):
    SQL = ("SELECT 1 "
           "FROM players "
           "WHERE player_name=%s;")

    cursor.execute(SQL, (player_name,))
    result = cursor.fetchone()

    return result


@dbc.connection_handler
def get_player_password(cursor, player_name):
    SQL = ("SELECT password "
           "FROM players "
           "WHERE player_name=%s;")

    cursor.execute(SQL, (player_name,))
    result = cursor.fetchone()

    return result.get('password')


@dbc.connection_handler
def add_player(cursor, registration_form):
    SQL = ("INSERT INTO players (player_name, password) "
           "VALUES (%s, %s);")
    
    cursor.execute(SQL, (registration_form['username'], registration_form['password']))


@dbc.connection_handler
def get_all_usernames(cursor):
    SQL = "SELECT player_name FROM players;"
    cursor.execute(SQL)
    result = cursor.fetchall()
    return [row['player_name'] for row in result]


@dbc.connection_handler
def get_player_id_by_username(cursor, username):
    sql = "SELECT id from players WHERE player_name=%s;"
    cursor.execute(sql, (username,))
    result = cursor.fetchone()

    return result['id']


@dbc.connection_handler
def save_new_game(cursor, game_state, title, save_score,  player_id):
    sql = ("INSERT INTO game(player_id, save_title, game_state, save_score) "
           "VALUES (%(player_id)s, %(save_title)s, %(game_state)s, %(save_score)s);")

    cursor.execute(sql, {'player_id': player_id, 'game_state': game_state, 'save_title': title, 'save_score': save_score})


@dbc.connection_handler
def get_saved_states(cursor, user_id):
    sql = ("SELECT id, save_title, game_state, save_score "
           "FROM game "
           "WHERE player_id = %s;")
    
    cursor.execute(sql, (user_id,))
    result = cursor.fetchall()

    return result
    