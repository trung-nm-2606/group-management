const db = require('../shared/db');

const repo = {};

repo.findActiveGroupByUserPk = async (userPk) => {
  const query = 'select * from `groups` left join groups_users gu on `groups`.pk = gu.group_pk where gu.user_pk = ? and gu.active = ?';
  try {
    const groups = await db.query(query, [userPk, 1]);
    return groups[0];
  } catch (e) {
    return null;
  }
};

repo.findGroupByPkAndUserPk = async (groupPk, userPk) => {
  const query = 'select * from `groups` left join groups_users gu on `groups`.pk = gu.group_pk where gu.group_pk = ? and gu.user_pk = ?';
  try {
    const groups = await db.query(query, [groupPk, userPk]);
    return groups;
  } catch (e) {
    return [];
  }
};

repo.findGroupsByUserPk = async (userPk) => {
  const query = 'select * from `groups` left join groups_users gu on `groups`.pk = gu.group_pk where gu.user_pk = ?';
  try {
    const groups = await db.query(query, [userPk]);
    return groups;
  } catch (e) {
    return [];
  }
};

repo.findGroupOwnedByUserPk = async (userPk) => {
  const query = 'select * from `groups` left join groups_users gu on `groups`.pk = gu.group_pk where gu.user_pk = ? and gu.position = ?';
  try {
    const groups = await db.query(query, [userPk, 'owner']);
    return groups[0];
  } catch (e) {
    return null;
  }
};

repo.findMembersOfGroup = async (groupPk) => {
  const query = 'select * from users where pk in (select user_pk from groups_users where group_pk = ? and position = ?)';
  try {
    const members = await db.query(query, [groupPk, 'member']);
    return members;
  } catch (e) {
    return [];
  }
};

repo.addMembersToGroup = async (groupPk, memberPks = []) => {
  const query = 'insert into groups_users(group_pk, user_pk, position, active) values(?, ?, ?, ?)';
  try {
    for (i = 0; i < memberPks.length; i++) {
      const memberPk = memberPks[i];
      await db.query(query, [groupPk, memberPk, 'member', 0]);
    }
    return true;
  } catch (e) {
    return false;
  }
};

repo.removeMembersFromGroup = async (groupPk, memberPks = []) => {
  const query = 'delete from groups_users where group_pk = ? and user_pk = ? and position = ?';
  try {
    for (i = 0; i < memberPks.length; i++) {
      const memberPk = memberPks[i];
      await db.query(query, [groupPk, memberPk, 'member']);
    }
    return true;
  } catch (e) {
    return false;
  }
};

repo.setActiveGroupByUserPk = async (activeGroupPk, userPk) => {
  try {
    const query1 = 'update groups_users set active = 0 where active = 1 and user_pk = ?;';
    await db.query(query1, [userPk]);

    const query2 = 'update groups_users set active = 1 where group_pk = ? and user_pk = ?;';
    const r = await db.query(query2, [activeGroupPk, userPk]);
    if (r.affectedRows === 1) return true;
    return false;
  } catch (e) {
    return false;
  }
};

module.exports = repo;
