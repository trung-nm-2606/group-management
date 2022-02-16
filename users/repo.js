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

repo.createNewUser = async (email, password) => {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        reject(err);
      }
      connection.beginTransaction((err) => {
        if (err) {
          connection.rollback(() => {
            connection.release();
            reject(err);
          });
        } else {
          const query = 'insert into users(email, encrypted_password) values(?,?)';
          connection.query(query, [email, password], (err, result) => {
            if (err) {
              connection.rollback(() => {
                connection.release();
                reject(err);
              });
            } else {
              const userPk = result.insertId;
              const query = 'insert into groups(name, `desc`) values(?,?)';
              connection.query(query, ['Your Group', 'Your initially default group'], (err, result) => {
                if (err) {
                  connection.rollback(() => {
                    connection.release();
                    reject(err);
                  });
                } else {
                  const groupPk = result.insertId;
                  const query = 'insert into groups_users(group_pk, user_pk) values(?,?)';
                  connection.query(query, [groupPk, userPk], (err) => {
                    if (err) {
                      connection.rollback(() => {
                        connection.release();
                        reject(err);
                      });
                    } else {
                      connection.commit((err) => {
                        if (err) {
                          connection.rollback(() => {
                            connection.release();
                            reject(err);
                          });
                        } else {
                          connection.release();
                          resolve(true);
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    });
  });
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
