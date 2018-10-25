import urllib
from os import environ


def get_connection_string():
    urllib.parse.uses_netloc.append('postgres')
    url = urllib.parse.urlparse(environ.get('DATABASE_URL'))

    if url:
        return url
    else:
        print('Error')
        raise KeyError
