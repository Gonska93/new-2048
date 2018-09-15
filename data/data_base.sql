--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.6
-- Dumped by pg_dump version 9.5.6

ALTER TABLE IF EXISTS ONLY public.game DROP CONSTRAINT IF EXISTS pk_game_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.players DROP CONTRAINT IF EXISTS pk_players_id CASCADE;


DROP TABLE IF EXISTS public.players;
DROP SEQUENCE IF EXISTS public.players_id_seq;
CREATE TABLE players (
   id serial NOT NULL,
   creation_date timestamp without time zone default date_trunc('second', localtimestamp)
);

DROP TABLE IF EXISTS public.game;
DROP SEQUENCE IF EXISTS public.game_id_seq;
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
