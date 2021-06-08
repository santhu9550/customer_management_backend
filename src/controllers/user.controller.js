/* eslint-disable import/no-unresolved */
const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const userService = require('../services/userService');
const catchAsync = require('../utils/catchAsync');
const ac = require('../validations/accessControl');

const createUserWithRole = catchAsync(async (req, res) => {
  const { email, firstname, lastname, role } = req.body;
  req.body.name = `${firstname} ${lastname}`;
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(req.body.password, salt, (error, hash) => {
      if (error) throw error;
      req.body.password = hash;
    });
  });
  const user = await userService.createUser(req.body);
  return res.status(httpStatus.CREATED).json(user);
});

const listCustomers = catchAsync(async (req, res) => {
  const users = await userService.queryUsers('role', 'Customer');
  return res.status(httpStatus.OK).json(users);
});

const listCustomerById = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  return res.status(httpStatus.OK).json(user);
});

const updateUserAdmin = catchAsync(async (req, res) => {
  const permission = ac.can(req.user.role).updateAny('Customer');
  if (permission.granted) {
    const user = await userService.updateUserById(req.params.id, req.body);
    return res.status(httpStatus.OK).json(user);
  }
  return res.status(httpStatus.UNAUTHORIZED).json('UnAuthorized');
});

const deleteUserAdmin = catchAsync(async (req, res) => {
  const user = await userService.deleteUserById(req.params.id);
  return res.status(httpStatus.OK).json(user);
});

module.exports = {
  createUserWithRole,
  listCustomers,
  updateUserAdmin,
  deleteUserAdmin,
  listCustomerById
};
