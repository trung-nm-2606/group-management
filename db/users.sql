-- auto-generated definition
create table users
(
    pk                 int(11) unsigned auto_increment
        primary key,
    name               varchar(100) null,
    full_name          varchar(250) null,
    email              varchar(150) not null,
    encrypted_password varchar(64)  not null,
    constraint users_email_uindex
        unique (email),
    constraint users_name_uindex
        unique (name)
);
