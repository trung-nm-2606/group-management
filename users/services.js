const services = {};

services.isUserAuthenticated = req => !!req.session.authUser;

services.getAuthenticatedUser = req => req.session.authUser;

module.exports = services;
