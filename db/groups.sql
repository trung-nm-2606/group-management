create table `groups`
(
    pk     int(11) unsigned auto_increment
        primary key,
    name   varchar(250)  not null,
    `desc` varchar(1000) null
);
