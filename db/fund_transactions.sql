create table fund_transactions
(
    pk           int(11) unsigned auto_increment
        primary key,
    fund_item_pk int(11) unsigned                                               null,
    user_pk      int(11) unsigned                                               null,
    proof        varchar(500)                                                   null,
    created_by   int(11) unsigned                                               null,
    created_at   datetime                           default current_timestamp() not null,
    updated_by   int(11) unsigned                                               null,
    updated_at   datetime                           default current_timestamp() not null,
    update_notes text                                                           not null,
    status       enum ('unpaid', 'paid', 'skipped') default 'unpaid'            not null,
    paid_price   double                                                         not null,
    constraint fund_transactions_fund_items_pk_fk
        foreign key (fund_item_pk) references fund_items (pk)
            on delete set null,
    constraint fund_transactions_users_1_fk
        foreign key (user_pk) references users (pk)
            on delete set null,
    constraint fund_transactions_users_2_fk
        foreign key (created_by) references users (pk)
            on delete set null,
    constraint fund_transactions_users_3_fk
        foreign key (updated_by) references users (pk)
            on delete set null
);
