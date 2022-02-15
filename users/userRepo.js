const Users = [];

const findByEmailOrName = (emailOrName) => {
  return Users.find(user => user.email === emailOrName || user.name === emailOrName);
};

const userRepo = {
  findByEmailOrName,
  createNewUser: (name, email, password) => {
    const newUser = {
      name,
      email,
      password
    };
    Users.push(newUser);
    return newUser;
  },
  authenticate: (emailOrName, password) => {
    const user = findByEmailOrName(emailOrName);
    return user?.password === password ? user : null;
  }
};

module.exports = userRepo;
