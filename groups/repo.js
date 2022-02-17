const db = require('../shared/db');

const repo = {};

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

module.exports = repo;
