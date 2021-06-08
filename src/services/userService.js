/* eslint-disable security/detect-non-literal-regexp */
/* eslint-disable import/no-extraneous-dependencies */
const httpStatus = require('http-status');
const logger = require('../config/logger');
const ApiError = require('../utils/ApiError');
const User = require('../models/user.model');
/**
 * Create a User
 * @body {Object} UserBody
 * @returns {Promise<User>}
 */
const createUser = async function (UserBody) {
  const userExists = await User.findOne({ email: UserBody.email });
  if (userExists) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User With The Email Already Exists');
  }
  const user = await User.create(UserBody);
  return user;
};

/**
 * Find user by id
 * @returns {Promise<User>}
 */
const getUserById = async function (id) {
  const user = await User.findById(id).populate('orders.order');
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No User Found');
  }
  return user;
};

/**
 * Find user by email
 * @returns {Promise<User>}
 */
const getUserByEmail = async function (email) {
  const user = await User.findOne({ email }).select('+password').populate('orders.order');
  return user;
};

/**
 * Query for Users
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (key, value) => {
  // eslint-disable-next-line security/detect-non-literal-regexp
  const users = await User.find({ [key]: new RegExp(value, 'i') }).populate('orders.order');
  if (!users) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No users found');
  }
  return users;
};

/**
 * adds order to user
 * @returns {Promise<User>}
 */
const addOrderToUser = async (userId, orderId) => {
  // eslint-disable-next-line security/detect-non-literal-regexp
  User.findByIdAndUpdate(
    userId,
    { $push: { orders: { order: orderId } } },
    { safe: true, upsert: true },
    function (err, resp) {
      if (err) {
        throw new ApiError(httpStatus.NOT_FOUND, 'No user found');
      } else {
        return resp;
      }
    }
  );
};

/**
 * Update User by id
 * @param {ObjectId} UserId
 * @body {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && updateBody.email !== user.email) {
    const emailExists = await User.findOne({ email: updateBody.email });
    if (emailExists) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Email Already Used');
    } else {
      user.email = updateBody.email;
    }
  }
  if (updateBody.role) {
    user.role = updateBody.role;
  }

  if (updateBody.mobile) {
    user.mobile = updateBody.mobile;
  }
  if (updateBody.address) {
    user.address = updateBody.address;
  }
  if (updateBody.orders) {
    user.orders = updateBody.orders;
  }
  if (updateBody.photo) {
    user.photo = updateBody.photo;
  }
  if (updateBody.firstname && updateBody.lastname) {
    user.firstname = updateBody.firstname;
    user.lastname = updateBody.lastname;
    user.name = `${updateBody.firstname} ${updateBody.lastname}`;
  }
  if (updateBody.firstname && !updateBody.lastname) {
    user.firstname = updateBody.firstname;
    user.name = `${updateBody.firstname} ${user.lastname}`;
  }
  if (updateBody.lastname && updateBody.firstname) {
    user.lastname = updateBody.lastname;
    user.name = `${user.firstname} ${updateBody.lastname}`;
  }
  const result = await user.save();
  return result;
};

/**
 * Delete User by id
 * @param {ObjectId} UserId
 * @returns {Promise}
 */
const deleteUserById = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();
  return null;
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  getUserByEmail,
  addOrderToUser
};
