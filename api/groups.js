const express = require('express');
const shared = require('./shared.js');
const groupRepo = require('../groups/repo');
const userServices = require('../users/services');
const userRepo = require('../users/repo');
const fundRepo = require('../fund/repo');

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

  if (!groupPk) {
    res.json({ oper: { status: false, error: 'Group not found' } });
    return;
  }

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

const checkGroupAccessPermission = async (req, res, next) => {
  const userPk = userServices.getAuthenticatedUser(req)?.pk;
  const { group_pk: groupPk } = req.params;

  if (!groupPk) {
    res.json({ oper: { status: false, error: 'Group not found' } });
    return;
  }

  try {
    const groups = await groupRepo.findGroupsByUserPk(userPk);
    const group = groups.find(g => +g.group_pk === +groupPk);
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
      res.json({ ...req.body, oper: { status: true } });
    } else {
      res.json({ oper: { status: false, error: 'Cannot add members to group' } });
    }
  } catch (e) {
    res.json({ oper: { status: false, error: 'Cannot add members to group' } });
  }
};

const addMemberToGroupByEmail = async (req, res) => {
  try {
    const email = req.body?.email;
    const member = await userRepo.findUserByEmail(email);
    if (!member) {
      res.json({ oper: { status: false, error: `User with email ${email} not found` } });
      return;
    }

    const authUserPk = userServices.getAuthenticatedUser(req)?.pk;
    if (authUserPk === member.pk) {
      res.json({ oper: { status: false, error: 'Cannot add yourself as a member' } });
      return;
    }

    const success = await groupRepo.addMembersToGroup(req.params.group_pk, [member.pk]);
    if (success) {
      res.json({ ...req.body, oper: { status: true } });
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

const getGroupInfoByGroupPk = async (req, res) => {
  try {
    const groupPk = req.params.group_pk;
    const userPk = userServices.getAuthenticatedUser(req)?.pk;

    const members = await groupRepo.findMembersOfGroup(groupPk);
    const groups = await groupRepo.findGroupsByUserPk(userPk);
    const fundItems = await fundRepo.findAllFundItemsByGroupPk(groupPk);
    res.json({
      pk: groupPk,
      numberOfMembers: members.length,
      numberOfFundItems: fundItems.length,
      groups: groups.map(({ pk, name, position }) => ({ pk, name, position }))
    });
  } catch (e) {
    res.json({});
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
      res.json({ ...req.body, oper: { status: true } });
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
      res.json({ ...req.body, oper: { status: true } });
    } else {
      res.json({ oper: { status: false, error: 'Cannot leave group' } });
    }
  } catch (e) {
    res.json({ oper: { status: false, error: 'Cannot leave group' } });
  }
};

const setActiveGroup = async (req, res) => {
  try {
    const userPk = userServices.getAuthenticatedUser(req)?.pk;
    const success = await groupRepo.setActiveGroupByUserPk(req.params.group_pk, userPk);
    if (success) {
      const activeGroup = await groupRepo.findActiveGroupByUserPk(userPk);
      const { pk, name, desc, position } = activeGroup || {};
      res.json({ oper: { status: true }, activeGroup: { pk, name, desc, position } });
    } else {
      res.json({ oper: { status: false, error: 'Cannot set active group' } });
    }
  } catch (e) {
    res.json({ oper: { status: false, error: 'Cannot set active group' } });
  }
};

const api = express.Router();
api.get('/', shared.checkUserAuth, getAllGroupsByUserPk);
api.get('/:group_pk/members', shared.checkUserAuth, getAllMembersByGroupPk);
api.get('/:group_pk/info', shared.checkUserAuth, getGroupInfoByGroupPk);
api.post('/:group_pk/add_members', shared.checkUserAuth, checkGroupPermission, addMembersToGroup);
api.post('/:group_pk/add_member_by_email', shared.checkUserAuth, checkGroupPermission, addMemberToGroupByEmail);
api.post('/:group_pk/remove_members', shared.checkUserAuth, checkGroupPermission, removeMembersFromGroup);
api.post('/:group_pk/set-active', shared.checkUserAuth, checkGroupAccessPermission, setActiveGroup);
api.post('/:group_pk/leave', shared.checkUserAuth, checkGroupPermission, leaveGroup);

module.exports = api;
