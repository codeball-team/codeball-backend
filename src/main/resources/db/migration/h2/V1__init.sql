CREATE TABLE app_user
(
  id BIGINT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  avatar_url VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL
);
CREATE UNIQUE INDEX unique_app_user_email ON app_user (email);

CREATE TABLE pitch
(
  id BIGINT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  address VARCHAR(255) NOT NULL,
  max_number_of_players INTEGER NOT NULL,
  min_number_of_players INTEGER NOT NULL,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(255) NOT NULL
);

CREATE TABLE game
(
  id BIGINT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  duration_in_minutes INTEGER NOT NULL,
  enrollment_over BOOLEAN NOT NULL,
  game_over BOOLEAN NOT NULL,
  start_time TIMESTAMP NOT NULL,
  teamascore INTEGER NOT NULL,
  teambscore INTEGER NOT NULL,
  pitch_id BIGINT NOT NULL,

  CONSTRAINT fk_game_pitch_id FOREIGN KEY (pitch_id) REFERENCES pitch (id)
);

CREATE TABLE enrollment
(
  id BIGINT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  status INTEGER NOT NULL,
  enroller_id BIGINT NOT NULL,
  game_id BIGINT NOT NULL,
  user_id BIGINT NOT NULL,

  CONSTRAINT fk_enrollment_user_id FOREIGN KEY (user_id) REFERENCES app_user (id),
  CONSTRAINT fk_enrollment_enroller_id FOREIGN KEY (enroller_id) REFERENCES app_user (id),
  CONSTRAINT fk_enrollment_game_id FOREIGN KEY (game_id) REFERENCES game (id)
);

CREATE TABLE enrollment_game
(
  game_id BIGINT NOT NULL,
  enrollment_id BIGINT NOT NULL,

  CONSTRAINT fk_enrollment_game_game_id FOREIGN KEY (game_id) REFERENCES game (id),
  CONSTRAINT fk_enrollment_game_enrollment_id FOREIGN KEY (enrollment_id) REFERENCES enrollment (id)
);


CREATE TABLE teama
(
  game_id BIGINT NOT NULL,
  user_id BIGINT NOT NULL,

  CONSTRAINT fk_teama_game_id FOREIGN KEY (game_id) REFERENCES game (id),
  CONSTRAINT fk_teama_user_id FOREIGN KEY (user_id) REFERENCES app_user (id)
);

CREATE TABLE teamb
(
  game_id BIGINT NOT NULL,
  user_id BIGINT NOT NULL,

  CONSTRAINT fk_teamb_game_id FOREIGN KEY (game_id) REFERENCES game (id),
  CONSTRAINT fk_teamb_user_id FOREIGN KEY (user_id) REFERENCES app_user (id)
);