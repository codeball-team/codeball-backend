INSERT INTO app_user (avatar_url, email, first_name, last_name, role)
VALUES ('https://rawgit.com/codeball-team/codeball/master/src/frontend/src/images/user-missing-picture.png', 'john@codeball.com', 'John', 'Doe', 'ROLE_USER');
INSERT INTO app_user (avatar_url, email, first_name, last_name, role)
VALUES ('https://rawgit.com/codeball-team/codeball/master/src/frontend/src/images/user-missing-picture.png', 'alex@codeball.com', 'Alex', 'Treadwell', 'ROLE_USER');
INSERT INTO app_user (avatar_url, email, first_name, last_name, role)
VALUES ('https://rawgit.com/codeball-team/codeball/master/src/frontend/src/images/user-missing-picture.png', 'matt@codeball.com', 'Matt', 'Karlen', 'ROLE_ADMIN');
INSERT INTO app_user (avatar_url, email, first_name, last_name, role)
VALUES ('https://rawgit.com/codeball-team/codeball/master/src/frontend/src/images/user-missing-picture.png', 'andrew@codeball.com', 'Andrew', 'Caruso', 'ROLE_USER');
INSERT INTO app_user (avatar_url, email, first_name, last_name, role)
VALUES ('https://rawgit.com/codeball-team/codeball/master/src/frontend/src/images/user-missing-picture.png', 'ashley@codeball.com', 'Ashley', 'Rodrigues', 'ROLE_USER');
INSERT INTO app_user (avatar_url, email, first_name, last_name, role)
VALUES ('https://rawgit.com/codeball-team/codeball/master/src/frontend/src/images/user-missing-picture.png', 'randy@codeball.com', 'Randy', 'Cushing', 'ROLE_USER');
INSERT INTO app_user (avatar_url, email, first_name, last_name, role)
VALUES ('https://rawgit.com/codeball-team/codeball/master/src/frontend/src/images/user-missing-picture.png', 'lauretta@codeball.com', 'Lauretta', 'Bolzan', 'ROLE_USER');
INSERT INTO app_user (avatar_url, email, first_name, last_name, role)
VALUES ('https://rawgit.com/codeball-team/codeball/master/src/frontend/src/images/user-missing-picture.png', 'mendie@codeball.com', 'Mendie', 'Frazee', 'ROLE_USER');

INSERT INTO pitch (address, max_number_of_players, min_number_of_players, name, type) VALUES ('25 Bedford St. New York City', 16, 4, 'NY Pitch', 'HARD_GROUND');
INSERT INTO pitch (address, max_number_of_players, min_number_of_players, name, type) VALUES ('ul. Filipa, Kraków', 8, 6, 'Filipa', 'ARTIFICIAL_SOFT');
INSERT INTO pitch (address, max_number_of_players, min_number_of_players, name, type) VALUES ('Sukhumvit 11, Bangkok', 16, 4, 'Bangkok football', 'INDOOR');

INSERT INTO game (duration_in_minutes, enrollment_over, game_over, start_time, teamascore, teambscore, pitch_id) VALUES (90, TRUE, TRUE, '2010-04-10 10:00:00', 1, 7, 3);
INSERT INTO teama (game_id, user_id) VALUES (1, 1);
INSERT INTO teama (game_id, user_id) VALUES (1, 2);
INSERT INTO teama (game_id, user_id) VALUES (1, 3);
INSERT INTO teama (game_id, user_id) VALUES (1, 4);
INSERT INTO teamb (game_id, user_id) VALUES (1, 5);
INSERT INTO teamb (game_id, user_id) VALUES (1, 6);
INSERT INTO teamb (game_id, user_id) VALUES (1, 7);
INSERT INTO teamb (game_id, user_id) VALUES (1, 8);

INSERT INTO game (duration_in_minutes, enrollment_over, game_over, start_time, teamascore, teambscore, pitch_id) VALUES (125, TRUE, TRUE, '2014-06-14 16:30:00', 5, 5, 2);
INSERT INTO teama (game_id, user_id) VALUES (2, 2);
INSERT INTO teama (game_id, user_id) VALUES (2, 3);
INSERT INTO teama (game_id, user_id) VALUES (2, 4);
INSERT INTO teamb (game_id, user_id) VALUES (2, 6);
INSERT INTO teamb (game_id, user_id) VALUES (2, 7);
INSERT INTO teamb (game_id, user_id) VALUES (2, 8);

INSERT INTO game (duration_in_minutes, enrollment_over, game_over, start_time, teamascore, teambscore, pitch_id) VALUES (180, TRUE, TRUE, '2017-02-22 21:15:00', 21, 17, 1);
INSERT INTO teama (game_id, user_id) VALUES (3, 1);
INSERT INTO teama (game_id, user_id) VALUES (3, 2);
INSERT INTO teama (game_id, user_id) VALUES (3, 4);
INSERT INTO teamb (game_id, user_id) VALUES (3, 5);
INSERT INTO teamb (game_id, user_id) VALUES (3, 6);
INSERT INTO teamb (game_id, user_id) VALUES (3, 8);

INSERT INTO game (duration_in_minutes, enrollment_over, game_over, start_time, teamascore, teambscore, pitch_id) VALUES (360, FALSE, FALSE, '2420-04-20 19:00:00', 0, 0, 2);
INSERT INTO enrollment (status, enroller_id, game_id, user_id) VALUES (0, 1, 4, 1);
INSERT INTO enrollment_game (game_id, enrollment_id) VALUES (4, 1);
INSERT INTO enrollment (status, enroller_id, game_id, user_id) VALUES (1, 1, 4, 2);
INSERT INTO enrollment_game (game_id, enrollment_id) VALUES (4, 2);
INSERT INTO enrollment (status, enroller_id, game_id, user_id) VALUES (2, 1, 4, 3);
INSERT INTO enrollment_game (game_id, enrollment_id) VALUES (4, 3);
INSERT INTO enrollment (status, enroller_id, game_id, user_id) VALUES (0, 1, 4, 4);
INSERT INTO enrollment_game (game_id, enrollment_id) VALUES (4, 4);
INSERT INTO enrollment (status, enroller_id, game_id, user_id) VALUES (0, 1, 4, 5);
INSERT INTO enrollment_game (game_id, enrollment_id) VALUES (4, 5);
INSERT INTO enrollment (status, enroller_id, game_id, user_id) VALUES (0, 1, 4, 6);
INSERT INTO enrollment_game (game_id, enrollment_id) VALUES (4, 6);
INSERT INTO enrollment (status, enroller_id, game_id, user_id) VALUES (2, 1, 4, 7);
INSERT INTO enrollment_game (game_id, enrollment_id) VALUES (4, 7);
INSERT INTO enrollment (status, enroller_id, game_id, user_id) VALUES (0, 1, 4, 8);
INSERT INTO enrollment_game (game_id, enrollment_id) VALUES (4, 8);


