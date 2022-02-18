const express = require('express');

const demoApi = require('./demo');
const usersApi = require('./users');
const groupsApi = require('./groups');
const fundApi = require('./fund');
const appApi = require('./app');

const api = express.Router();

api.get('/', (req, res) => res.json({ message: 'Welcome to Group Management API suite' }));
api.use('/demo', demoApi);
api.use('/app', appApi);
api.use('/users', usersApi);
api.use('/groups', groupsApi);
api.use('/fund', fundApi);

api.use('*', (req, res) => res.status(500).json({ message: 'Invalid API endpoint' }));

module.exports = api;
