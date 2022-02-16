var express = require('express');
var userRepo = require('./repo');

var router = express.Router();

const signup = (req, res) => {
  res.render('signup');
};

const handleSignup = (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.render('signup', { message: 'Invalid signup information' });
  } else {
    const user = userRepo.findUserByEmail(email);
    if (user) {
      res.render('signup', { message: 'Your account already exist. Login or create another account' });
    } else {
      const newUser = userRepo.createNewUser(name, email, password);
      req.session.authUser = newUser;
      res.redirect('/login');
    }
  }
};

const login = (req, res) => {
  res.render('login');
};

const handleLogin = async (req, res) => {
  const {
    email,
    password
  } = req.body;
  if (!email || !password) {
    res.render('login', { message: 'Credentials missing' });
  } else {
    const { authenticated, message, authUser } = await userRepo.authenticate(email, password);
    if (authenticated) {
      req.session.authUser = authUser;
      res.redirect('/');
    } else {
      res.render('login', { message });
    }
  }
};

const logout = (req, res) => {
  const { name, email } = req.session.authUser || {};
  req.session.destroy(function() {
    console.log(`user[${name}(${email})] logged out.`)
 });
 res.redirect('/login');
};

router.get('/signup', signup);
router.get('/login', login);
router.get('/logout', logout);

router.post('/signup', handleSignup);
router.post('/login', handleLogin);

module.exports = router;
