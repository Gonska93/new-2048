import psycopg2
import psycopg2.extras
from functools import wraps
from data.db_config import get_connection_string


def open_database():
    try:
        connection_string = get_connection_string()
        connection = psycopg2.connect(
            database=connection_string.path[1:],
            user=connection_string.username,
            password=connection_string.password,
            host=connection_string.hostname,
            port=connection_string.port
        )
        connection.autocommit = True
    except psycopg2.DatabaseError as exception:
        print('Database connection problem')
        raise exception
    return connection


def connection_handler(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        connection = open_database()
        # RealDictCursor is  dictionary, where the column names are the keys
        dict_cur = connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        ret_value = func(dict_cur, *args, **kwargs)
        dict_cur.close()
        connection.close()
        return ret_value
    wrapper.__doc__ = func.__doc__
    wrapper.__name__ = func.__name__
    return wrapper
