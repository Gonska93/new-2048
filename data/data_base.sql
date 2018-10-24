
DROP TABLE IF EXISTS players CASCADE;
DROP TABLE IF EXISTS game CASCADE;
DROP TABLE IF EXISTS highscores CASCADE;


CREATE TABLE players (
    id serial NOT NULL,
    player_name varchar(50) UNIQUE NOT NULL,
    password varchar(120) NOT NULL,
    creation_date timestamp without time zone default date_trunc('second', localtimestamp)
);

CREATE TABLE game (
    id serial NOT NULL,
    player_id integer NOT NULL,
    game_state integer[4][4] NOT NULL,
    submission_time timestamp without time zone default date_trunc('second', localtimestamp)
);

CREATE TABLE highscores (
    id serial not null,
    player_id integer NOT NULL,
    score integer NOT NULL,
    game_mode varchar(15) NOT NULL,
    score_date timestamp without time zone default date_trunc('second', localtimestamp)
);

ALTER TABLE ONLY players
    ADD CONSTRAINT pk_players_id PRIMARY KEY (id);

ALTER TABLE ONLY game
    ADD CONSTRAINT pk_game_id PRIMARY KEY (id);

ALTER TABLE ONLY game
    ADD CONSTRAINT fk_player_id FOREIGN KEY (player_id) REFERENCES players(id);

ALTER TABLE ONLY highscores
    ADD CONSTRAINT pk_highscore_id PRIMARY KEY (id);

ALTER TABLE ONLY highscores
    ADD CONSTRAINT fk_player_id FOREIGN KEY (player_id) REFERENCES players(id);
