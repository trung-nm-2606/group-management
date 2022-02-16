const db = require('../shared/db');

const repo = {};

repo.getAll = async () => {
  const query = 'select * from users';
  try {
    const users = await db.query(query);
    return users.map(({ pk, name, email, full_name }) => ({ pk, name, email, fullName: full_name }));
  } catch (e) {
    return [];
  }
};

repo.findUserByEmail = async (email) => {
  const query = 'select * from users where email = ?';
  try {
    const users = await db.query(query, [email]);
    return users[0];
  } catch (e) {
    return null;
  }
};

repo.findUserByName = async (name) => {
  const query = 'select * from users where name = ?';
  try {
    const users = await db.query(query, [name]);
    return users[0];
  } catch (e) {
    return null;
  }
};

repo.createNewUser = (name, email, password) => {
  const newUser = { name, email, password };
  return newUser;
};

repo.authenticate = (emailOrName, password) => {
  return false;
};

module.exports = repo;
