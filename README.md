# 2048 - the web mobile game

## About

Ever played 2048? Probably yes. On your phone? Yup. In a browser?! NO WAI!

This implementation of the popular 2048 logic game is made for mobile friendly
browser-ready experience. 
You can save/load your games anywhere you are, play it everywhere.

## How can you play?

You can play it here: https://new2048-gitschab.herokuapp.com/

## Getting source code

You can try out the source code.
You will need Python version 3.6 and a modern browser to handle the JS stuff.
All dependencies are in requirements.txt file. Create a virtual env and install them by typing this in bash:

```bash
$ virtualenv -p python3.6 <your_venv_name>
$ source <your_venv_name>/bin/activate
(<your_venv_name>)$ pip install -r requirements.txt
```

The app is written for Postgres DB, so it will be also required, you can download
postgres here: https://www.postgresql.org/download/
First create a database, then run the schema.
SQL file with base schema is in data/ folder, you can run it via psql with:

```psql
postgres=# create database 2048webapp
CREATE DATABASE
postgres=# \c 2048webapp  // connect to created database
2048webapp=# \i data/data_base.sql
```

## Technical stuff

Server-side is done in Python using Flask, front-end with vanilla JS, JQuery and Bootstrap 4.


This project was done as part of the Codecool programinng course.
--- https://codecool.pl/
