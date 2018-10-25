import urllib
from os import environ



class PGSQL:
    def get_db_uri():
        urllib.parse.uses_netloc.append('postgres')
        url = urllib.parse.urlparse(environ.get('DATABASE_URL'))

        if url:
            return url
        else:
            print('Error')
            raise KeyError
    
    DBURI = get_db_uri()
