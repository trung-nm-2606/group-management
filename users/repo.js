const db = require('../shared/db');

const repo = {};

repo.getAll = async () => {
  const query = 'select * from users';
  try {
    const users = await db.query(query);
    return users;
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

repo.authenticate = async (email, password) => {
  const user = await repo.findUserByEmail(email);
  if (!user) {
    return {
      authenticated: false,
      message: 'User not found'
    };
  }
  if (user.encrypted_password !== password) {
    return {
      authenticated: false,
      message: 'Wrong email or password'
    };
  }
  return {
    authenticated: true,
    message: null,
    authUser: user
  };
};

module.exports = repo;