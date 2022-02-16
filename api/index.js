var express = require('express');

var demoApi = require('./demo');

const api = express.Router();

api.get('/', (req, res) => res.json({ message: 'Welcome to Group Management API suite' }));
api.use('/demo', demoApi);

api.get('*', (req, res) => res.json({ message: 'Invalid API endpoint' }));

module.exports = api;
