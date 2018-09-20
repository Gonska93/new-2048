import data.db_connection as dbc
from werkzeug.security import generate_password_hash, check_password_hash


@dbc.connection_handler
def get_player(cursor, player_name):
    SQL = (f'SELECT 1 '
           f'FROM players '
           f"WHERE player_name='{player_name}';")

    cursor.execute(SQL, (player_name,))
    result = cursor.fetchone()
    return result


@dbc.connection_handler
def get_players_password(cursor, player_name):
    SQL = (f'SELECT password '
           f'FROM players '
           f"WHERE player_name='{player_name}';")

    cursor.execute(SQL, (player_name,))
    result = cursor.fetchone()
    return result.get('password')


@dbc.connection_handler
def add_player(cursor, registration_form):
    player_name = registration_form.get('username')

    if get_player(player_name) is None:
        password = generate_password_hash(registration_form.get('password'))

        SQL = (f'INSERT INTO players (player_name, password) '
               f"VALUES ('{player_name}', '{password}');")

        cursor.execute(SQL, (player_name, password))
        return True
    else:
        return False
