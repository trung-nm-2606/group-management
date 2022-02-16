const express = require('express');
const userRepo = require('../users/repo');

const getAllUsers = async (req, res) => {
  try {
    const users = await userRepo.getAll();
    return res.json(users);
  } catch (e) {
    return res.json([]);
  }
};

const api = express.Router();
api.get('/', getAllUsers);

module.exports = api;
