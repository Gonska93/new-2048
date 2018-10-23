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