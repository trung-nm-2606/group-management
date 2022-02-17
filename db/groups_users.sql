-- auto-generated definition
create table groups_users
(
    group_pk int(11) unsigned not null,
    user_pk  int(11) unsigned not null,
    constraint groups_users_pk
        unique (group_pk, user_pk),
    constraint groups_users_groups_pk_fk
        foreign key (group_pk) references `groups` (pk)
            on delete cascade,
    constraint groups_users_users_pk_fk
        foreign key (user_pk) references users (pk)
            on delete cascade
);
