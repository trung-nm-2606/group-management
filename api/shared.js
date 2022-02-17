const userServices = require('../users/services');

const shared = {};

/**
 * Check if user is logged in to proceed further operation
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
shared.checkUserAuth = async (req, res, next) => {
  if (userServices.isUserAuthenticated(req)) {
    next();
  } else {
    // Unauthorized 401
    res.status(401).json({ oper: { status: false, error: 'User is not logged in' } });
  }
};

module.exports = shared;
