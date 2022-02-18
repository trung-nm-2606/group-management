const express = require('express');
const shared = require('./shared');
const groupRepo = require('../groups/repo');
const userServices = require('../users/services.js');

const getAppContext = async (req, res) => {
  try {
    const userPk = userServices.getAuthenticatedUser(req)?.pk;
    const activeGroup = await groupRepo.findActiveGroupByUserPk(userPk);
    if (activeGroup) {
      const { pk, name, desc, position } = activeGroup;
      res.json({
        activeGroup: { pk, name, desc, position }
      });
    }
  } catch (e) {
    res.status(500).json({ message: 'Cannot get application context' });
  }
};

const api = express.Router();
api.get('/get-context', shared.checkUserAuth, getAppContext);

module.exports = api;
