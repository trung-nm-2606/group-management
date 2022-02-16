const services = {};

services.isUserAuthenticated = req => !!req.session.authUser;

module.exports = services;
