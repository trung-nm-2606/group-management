const express = require('express');
const userRepo = require('../users/repo');
const userServices = require('../users/services');

const getAllUsers = async (req, res) => {
  try {
    const users = await userRepo.getAll();
    return res.json(users.map(({ pk, name, email, full_name }) => ({pk, name, email, fullName: full_name})));
  } catch (e) {
    return res.json([]);
  }
};

const authPing = (req, res) => {
  if (userServices.isUserAuthenticated(req)) {
    res.send(true);
  } else {
    res.send(false);
  }
};

const api = express.Router();
api.get('/', getAllUsers);
api.get('/auth-ping', authPing);

module.exports = api;
