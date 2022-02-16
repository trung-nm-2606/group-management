var express = require('express');

const api = express.Router();

api.get('/hello-world', (req, res) => res.json({ message: 'Hello World' }));

module.exports = api;
