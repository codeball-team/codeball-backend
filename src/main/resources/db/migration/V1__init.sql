CREATE TABLE app_user
(
  id          BIGINT PRIMARY KEY NOT NULL,
  email       VARCHAR(255)       NOT NULL,
  first_name  VARCHAR(255),
  last_name   VARCHAR(255),
  picture_url VARCHAR(255),
  role        VARCHAR(255)
);
CREATE UNIQUE INDEX uk_1j9d9a06i600gd43uu3km82jw ON app_user (email);

CREATE TABLE pitch
(
  id                    BIGINT PRIMARY KEY NOT NULL,
  address               VARCHAR(255),
  max_number_of_players INTEGER            NOT NULL,
  min_number_of_players INTEGER            NOT NULL,
  name                  VARCHAR(255),
  pitch_type            VARCHAR(255)
);

CREATE TABLE game
(
  id                  BIGINT PRIMARY KEY NOT NULL,
  duration_in_minutes INTEGER            NOT NULL,
  enrollment_over     BOOLEAN            NOT NULL,
  game_over           BOOLEAN            NOT NULL,
  start_timestamp     BIGINT             NOT NULL,
  teamascore          INTEGER            NOT NULL,
  teambscore          INTEGER            NOT NULL,
  pitch_id            BIGINT,
  CONSTRAINT fkqwbrfra4d987a2jmnlfhhfljb FOREIGN KEY (pitch_id) REFERENCES pitch (id)
);

CREATE TABLE enrollment
(
  id                BIGINT PRIMARY KEY NOT NULL,
  enrollment_status INTEGER,
  enroller_id       BIGINT,
  game_id           BIGINT,
  user_id           BIGINT,
  CONSTRAINT fkejjiyja0buf88e01rwcwwvtth FOREIGN KEY (enroller_id) REFERENCES app_user (id),
  CONSTRAINT fkpjds1jcxiinfn6wd6tj19kldm FOREIGN KEY (game_id) REFERENCES game (id),
  CONSTRAINT fk8bxchtid6ujtutjb908cgvreu FOREIGN KEY (user_id) REFERENCES app_user (id)
);

CREATE TABLE enrollment_game
(
  game_id       BIGINT NOT NULL,
  enrollment_id BIGINT NOT NULL,
  CONSTRAINT fkcny1s2rxfy46yljr7vwjyyreq FOREIGN KEY (game_id) REFERENCES game (id),
  CONSTRAINT fk2gtk8jfk98hgjjkdi2agwk5h3 FOREIGN KEY (enrollment_id) REFERENCES enrollment (id)
);

CREATE TABLE rating
(
  id        BIGINT PRIMARY KEY NOT NULL,
  game_id   BIGINT,
  player_id BIGINT,
  voter_id  BIGINT,
  CONSTRAINT fkhotxgrgtrin4xcto6n1j4a946 FOREIGN KEY (game_id) REFERENCES game (id),
  CONSTRAINT fkelyxghno5vf5jiv4y7yqrq5k2 FOREIGN KEY (player_id) REFERENCES app_user (id),
  CONSTRAINT fkt3uj64lg1qjearaxsnn6a7jec FOREIGN KEY (voter_id) REFERENCES app_user (id)
);

CREATE TABLE teama
(
  game_id BIGINT NOT NULL,
  user_id BIGINT NOT NULL,
  CONSTRAINT fkarvc764dp6mie69juaibnnnva FOREIGN KEY (game_id) REFERENCES game (id),
  CONSTRAINT fkrdgee7nfi42dndyc1x2ftd1s0 FOREIGN KEY (user_id) REFERENCES app_user (id)
);

CREATE TABLE teamb
(
  game_id BIGINT NOT NULL,
  user_id BIGINT NOT NULL,
  CONSTRAINT fkfg0yernx0i70frr51am8xbi0n FOREIGN KEY (game_id) REFERENCES game (id),
  CONSTRAINT fkoyex00a576xhea63dflm0u2kc FOREIGN KEY (user_id) REFERENCES app_user (id)
);
