
    create table app_user (
        id int8 not null,
        email varchar(255) not null,
        first_name varchar(255),
        last_name varchar(255),
        picture_url varchar(255),
        role varchar(255),
        primary key (id)
    );

    create table enrollment (
        id int8 not null,
        enrollment_status int4,
        enroller_id int8,
        game_id int8,
        user_id int8,
        primary key (id)
    );

    create table enrollment_game (
        game_id int8 not null,
        enrollment_id int8 not null
    );

    create table game (
        id int8 not null,
        duration_in_minutes int4 not null,
        enrollment_over boolean not null,
        game_over boolean not null,
        start_timestamp int8 not null,
        teamascore int4 not null,
        teambscore int4 not null,
        pitch_id int8,
        primary key (id)
    );

    create table pitch (
        id int8 not null,
        address varchar(255),
        max_number_of_players int4 not null,
        min_number_of_players int4 not null,
        name varchar(255),
        pitch_type varchar(255),
        primary key (id)
    );

    create table rating (
        id int8 not null,
        game_id int8,
        player_id int8,
        voter_id int8,
        primary key (id)
    );

    create table teama (
        game_id int8 not null,
        user_id int8 not null
    );

    create table teamb (
        game_id int8 not null,
        user_id int8 not null
    );

    alter table app_user
        drop constraint if exists UK_1j9d9a06i600gd43uu3km82jw;

    alter table app_user
        add constraint UK_1j9d9a06i600gd43uu3km82jw unique (email);

    alter table enrollment
        add constraint FKejjiyja0buf88e01rwcwwvtth
        foreign key (enroller_id)
        references app_user;

    alter table enrollment
        add constraint FKpjds1jcxiinfn6wd6tj19kldm
        foreign key (game_id)
        references game;

    alter table enrollment
        add constraint FK8bxchtid6ujtutjb908cgvreu
        foreign key (user_id)
        references app_user;

    alter table enrollment_game
        add constraint FK2gtk8jfk98hgjjkdi2agwk5h3
        foreign key (enrollment_id)
        references enrollment;

    alter table enrollment_game
        add constraint FKcny1s2rxfy46yljr7vwjyyreq
        foreign key (game_id)
        references game;

    alter table game
        add constraint FKqwbrfra4d987a2jmnlfhhfljb
        foreign key (pitch_id)
        references pitch;

    alter table rating
        add constraint FKhotxgrgtrin4xcto6n1j4a946
        foreign key (game_id)
        references game;

    alter table rating
        add constraint FKelyxghno5vf5jiv4y7yqrq5k2
        foreign key (player_id)
        references app_user;

    alter table rating
        add constraint FKt3uj64lg1qjearaxsnn6a7jec
        foreign key (voter_id)
        references app_user;

    alter table teama
        add constraint FKrdgee7nfi42dndyc1x2ftd1s0
        foreign key (user_id)
        references app_user;

    alter table teama
        add constraint FKarvc764dp6mie69juaibnnnva
        foreign key (game_id)
        references game;

    alter table teamb
        add constraint FKoyex00a576xhea63dflm0u2kc
        foreign key (user_id)
        references app_user;

    alter table teamb
        add constraint FKfg0yernx0i70frr51am8xbi0n
        foreign key (game_id)
        references game;
