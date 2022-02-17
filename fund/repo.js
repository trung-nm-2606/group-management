const db = require('../shared/db');

const repo = {};

repo.getAllFundItemsByUserPk = async (userPk) => {
  const query = 'select * from fund_items where created_by = ?';
  try {
    const fundItems = await db.query(query, [userPk]);
    return fundItems;
  } catch (e) {
    return [];
  }
};

repo.getAllFundItemsByGroupPk = async (groupPk) => {
  const query = 'select * from fund_items where group_pk = ?';
  try {
    const fundItems = await db.query(query, [groupPk]);
    return fundItems;
  } catch (e) {
    return [];
  }
};

repo.getAllFundTransactionByFundItemPk = async (fundItemPk) => {
  const query = 'select ft.*, u.name, u.full_name, u.email from fund_transactions as ft left join users u on ft.user_pk = u.pk where ft.fund_item_pk = ?';
  try {
    const transactions = await db.query(query, [fundItemPk]);
    return transactions;
  } catch (e) {
    console.log(e);
    return [];
  }
};

repo.createFundItem = async (userPk, groupPk, { name, desc, content, pricePerMember }) => {
  const query = 'insert into fund_items(name, `desc`, content, price_per_member, created_by, updated_by, group_pk) values(?, ?, ?, ?, ?, ?, ?)';
  try {
    const r = await db.query(query, [
      name,
      desc,
      content,
      pricePerMember,
      userPk,
      userPk,
      groupPk
    ]);
    if (r.insertId > 0) {
      return r.insertId;
    } else {
      return -1;
    }
  } catch (e) {
    return -1;
  }
};

repo.createFundTransactionForUsers = async (fundItemPk, memberPks, userPk) => {
  const query = 'insert into fund_transactions(fund_item_pk, user_pk, created_by, updated_by, update_notes, paid_price) values(?, ?, ?, ?, ?, ?)';
  try {
    for (i = 0; i < memberPks[i]; i++) {
      await db.query(query, [fundItemPk, memberPks[i], userPk, userPk, 'Init transaction', 0]);
    }
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

module.exports = repo;
