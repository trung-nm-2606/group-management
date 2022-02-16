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

const handleLogin = (req, res) => {
  const {
    email_or_account_name: emailOrAccountName,
    password
  } = req.body;
  if (!emailOrAccountName || !password) {
    res.render('login', { message: 'Wrong username/email or password' });
  } else {
    const user = userRepo.authenticate(emailOrAccountName, password);
    if (user) {
      req.session.authUser = user;
      res.redirect('/protected-page');
    } else {
      res.render('login', { message: 'Wrong username/email or password' });
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

const checkAuthUser = (req, res, next) => {
  const { authUser } = req.session;
  if (!authUser) {
    res.redirect('/login');
  } else {
    next();
  }
};

const protectedPage = (req, res) => {
  res.render('protected-page');
};

router.get('/signup', signup);
router.get('/login', login);
router.get('/logout', logout);
router.get('/protected-page', checkAuthUser, protectedPage);

router.post('/signup', handleSignup);
router.post('/login', handleLogin);

module.exports = router;
