create table fund_items
(
    pk               int(11) unsigned auto_increment
        primary key,
    name             varchar(500)                                                                   not null,
    `desc`           varchar(500)                                                                   null,
    content          text                                                                           null,
    price_per_member double                                                                         not null,
    status           enum ('open', 'in_progress', 'closed', 'archived') default 'open'              not null,
    created_by       int(11) unsigned                                                               null,
    updated_by       int(11) unsigned                                                               null,
    created_at       datetime                                           default current_timestamp() not null,
    updated_at       datetime                                           default current_timestamp() not null,
    group_pk         int(11) unsigned                                                               null
);
