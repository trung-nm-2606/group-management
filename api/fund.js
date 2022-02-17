const express = require('express');
const shared = require('./shared');
const userServices = require('../users/services');
const fundRepo = require('../fund/repo');
const groupRepo = require('../groups/repo');

const checkGroupPermission = async (req, res, next) => {
  const userPk = userServices.getAuthenticatedUser(req)?.pk;
  const { group_pk: groupPk } = req.params;
  try {
    const groups = await groupRepo.findGroupByPkAndUserPk(groupPk, userPk);
    if (groups.length > 0) {
      next();
    } else {
      res.json({ oper: { status: false, error: 'You do not have permission on this group' } });
    }
  } catch (e) {
    res.json({ oper: { status: false, error: 'Cannot operate on this group' } });
  }
};

const checkGroupOwnerPermission = async (req, res, next) => {
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

const getAllFundItemsByGroupPk = async (req, res) => {
  try {
    const items = await fundRepo.getAllFundItemsByGroupPk(req.params.group_pk);
    res.json(items.map(({ pk, name, desc, content, price_per_member, status, created_at, updated_at }) => ({
      pk,
      name,
      desc,
      content,
      pricePerMember: price_per_member,
      status,
      createdAt: created_at,
      updatedAt: updated_at
    })));
  } catch (e) {
    res.json([]);
  }
};

const createFundItem = async (req, res) => {
  try {
    const userPk = userServices.getAuthenticatedUser(req)?.pk;
    const fundItemPk = await fundRepo.createFundItem(userPk, req.params.group_pk, req.body);
    if (fundItemPk > 0) {
      if (req.body.initTransaction) {
        try {
          const members = await groupRepo.findMembersOfGroup(req.params.group_pk);
          const memberPks = members.map(member => member.pk);
          const successCreateTransactions = await fundRepo.createFundTransactionForUsers(fundItemPk, [userPk, ...memberPks], userPk);
          if (!successCreateTransactions) {
            res.json({ oper: { status: true, message: 'There are some missing transactions created for members' } });
            return;
          }
        } catch (e) {
          res.json({ oper: { status: true, message: 'There are some missing transactions created for members' } });
          return;
        }
      }
      res.json({ oper: { status: true } });
    } else {
      res.json({ oper: { status: false, error: 'Cannot create fund item' } });
    }
  } catch (e) {
    res.json({ oper: { status: false, error: 'Cannot create fund item' } });
  }
};

const getAllFundTransactionByFundItemPk = async (req, res) => {
  try {
    const transactions = await fundRepo.getAllFundTransactionByFundItemPk(req.params.fund_item_pk);
    res.json(transactions.map(({ pk, proof, status, paid_price, name, full_name, email }) => ({
      pk,
      proof,
      status,
      paidPrice: paid_price,
      name,
      fullName: full_name,
      email
    })))
  } catch (e) {
    console.log(e);
    res.json([]);
  }
};

const api = express.Router();
api.get('/:group_pk/items', shared.checkUserAuth, checkGroupPermission, getAllFundItemsByGroupPk);
api.post('/:group_pk/create_item', shared.checkUserAuth, checkGroupOwnerPermission, createFundItem);
api.get('/:group_pk/:fund_item_pk/transactions', shared.checkUserAuth, checkGroupPermission, getAllFundTransactionByFundItemPk);

module.exports = api;
