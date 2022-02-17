const express = require('express');
const groupRepo = require('../groups/repo');
const userServices = require('../users/services');

/**
 * Check if user is logged in to proceed further operation
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const checkUserAuth = async (req, res, next) => {
  if (userServices.isUserAuthenticated(req)) {
    next();
  } else {
    // Unauthorized 401
    res.status(401).json({ oper: { status: false, error: 'User is not logged in' } });
  }
};

/**
 * Check if the logged-in user is the owner of the given group to proceed further operation
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const checkGroupPermission = async (req, res, next) => {
  const userPk = userServices.getAuthenticatedUser(req)?.pk;
  const { group_pk: groupPk } = req.params;
  try {
    const group = await groupRepo.findGroupOwnedByUserPk(userPk);
    if (!group || +group.pk !== +groupPk) {
      res.json({ oper: { status: false, error: 'You do not have permission on this group' } });
    } else {
      next();
    }
  } catch (e) {
    res.json({ oper: { status: false, error: 'Cannot operate on this group' } });
  }
};

/**
 * Return all groups which are
 * - owned by the logged-in user
 * - including the logged-in user as member
 *
 * @param {*} req
 * @param {*} res
 */
const getAllGroupsByUserPk = async (req, res) => {
  try {
    const userPk = userServices.getAuthenticatedUser(req)?.pk;
    if (!userPk) res.json([]);
    const groups = await groupRepo.findGroupsByUserPk(userPk);
    res.json(groups.map(({ pk, name, desc, position, active }) => ({ pk, name, desc, position, active })));
  } catch (e) {
    res.json([]);
  }
};

/**
 * Add users to the given group as members
 *
 * @param {*} req
 * @param {*} res
 */
const addMembersToGroup = async (req, res) => {
  try {
    const success = await groupRepo.addMembersToGroup(req.params.group_pk, req.body.memberPks);
    if (success) {
      res.json({ ...req.body, operStatus: true });
    } else {
      res.json({ oper: { status: false, error: 'Cannot add members to group' } });
    }
  } catch (e) {
    res.json({ oper: { status: false, error: 'Cannot add members to group' } });
  }
};

const getAllMembersByGroupPk = async (req, res) => {
  try {
    const members = await groupRepo.findMembersOfGroup(req.params.group_pk);
    res.json(members.map(({ pk, name, full_name, email }) => ({ pk, name, fullName: full_name, email })));
  } catch (e) {
    res.json([]);
  }
};

/**
 * Remove member users from the given group
 *
 * @param {*} req
 * @param {*} res
 */
const removeMembersFromGroup = async (req, res) => {
  try {
    const success = await groupRepo.removeMembersFromGroup(req.params.group_pk, req.body.memberPks);
    if (success) {
      res.json({ ...req.body, operStatus: true });
    } else {
      res.json({ oper: { status: false, error: 'Cannot remove members from group' } });
    }
  } catch (e) {
    res.json({ oper: { status: false, error: 'Cannot remove members from group' } });
  }
};

/**
 * Leave the given group of which the logged-in user is a member
 *
 * @param {*} req
 * @param {*} res
 */
const leaveGroup = async (req, res) => {
  try {
    const userPk = userServices.getAuthenticatedUser(req)?.pk;
    const success = await groupRepo.removeMembersFromGroup(req.params.group_pk, [userPk]);
    if (success) {
      res.json({ ...req.body, operStatus: true });
    } else {
      res.json({ oper: { status: false, error: 'Cannot leave group' } });
    }
  } catch (e) {
    res.json({ oper: { status: false, error: 'Cannot leave group' } });
  }
};

const api = express.Router();
api.get('/', getAllGroupsByUserPk);
api.get('/:group_pk/members', getAllMembersByGroupPk);
api.post('/:group_pk/add_members', checkUserAuth, checkGroupPermission, addMembersToGroup);
api.post('/:group_pk/remove_members', checkUserAuth, checkGroupPermission, removeMembersFromGroup);
api.post('/:group_pk/leave', checkUserAuth, checkGroupPermission, leaveGroup);

module.exports = api;
