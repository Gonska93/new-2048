
DROP TABLE IF EXISTS players CASCADE;
DROP TABLE IF EXISTS game CASCADE;



CREATE TABLE players (
   id serial NOT NULL,
   creation_date timestamp without time zone default date_trunc('second', localtimestamp)
);



CREATE TABLE game (
    id serial NOT NULL,
    player_id integer NOT NULL,
    submission_time timestamp without time zone default date_trunc('second', localtimestamp),
    a1 integer,
    a2 integer,
    a3 integer,
    a4 integer,
    b1 integer,
    b2 integer,
    b3 integer,
    b4 integer,
    c1 integer,
    c2 integer,
    c3 integer,
    c4 integer,
    d1 integer,
    d2 integer,
    d3 integer,
    d4 integer	
);

ALTER TABLE ONLY players
    ADD CONSTRAINT pk_players_id PRIMARY KEY (id);

ALTER TABLE ONLY game
    ADD CONSTRAINT pk_game_id PRIMARY KEY (id);

ALTER TABLE ONLY game
    ADD CONSTRAINT fk_player_id FOREIGN KEY (player_id) REFERENCES players(id);
