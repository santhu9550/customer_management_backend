/* eslint-disable security/detect-non-literal-regexp */
/* eslint-disable import/no-extraneous-dependencies */
const httpStatus = require('http-status');
const logger = require('../config/logger');
const ApiError = require('../utils/ApiError');
const Order = require('../models/order.model');
/**
 * Create a Order
 * @body {Object} OrderBody
 * @returns {Promise<Order>}
 */
const createOrder = async function (OrderBody) {
  const order = await Order.create(OrderBody);
  return order;
};

/**
 * Find Order by id
 * @returns {Promise<Order>}
 */
const getOrderById = async function (id) {
  const order = await Order.findById(id);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No Order Found');
  }
  return order;
};

/**
 * Query for Orders
 * @returns {Promise<QueryResult>}
 */
const queryOrders = async (key, value) => {
  // eslint-disable-next-line security/detect-non-literal-regexp
  const orders = await Order.find({ [key]: new RegExp(value, 'i') }).populate('user');
  if (!orders) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No Orders found');
  }
  return orders;
};

/**
 * list Orders
 * @returns {Promise<listResult>}
 */
const listOrders = async () => {
  // eslint-disable-next-line security/detect-non-literal-regexp
  const orders = await Order.find().populate('user');
  if (!orders) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No Orders found');
  }
  return orders;
};

/**
 * Update Order by id
 * @param {ObjectId} OrderId
 * @body {Object} updateBody
 * @returns {Promise<Order>}
 */
const updateOrderById = async (OrderId, updateBody) => {
  const order = await Order.findById(OrderId);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  if (updateBody.name) {
    order.name = updateBody.name;
  }

  if (updateBody.status) {
    order.status = updateBody.status;
  }
  if (updateBody.amount) {
    order.amount = updateBody.amount;
  }

  const result = await order.save();
  return result;
};

/**
 * Delete Order by id
 * @param {ObjectId} OrderId
 * @returns {Promise}
 */
const deleteOrderById = async (OrderId) => {
  const order = await Order.findById(OrderId);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  await order.remove();
  return null;
};

module.exports = {
  createOrder,
  queryOrders,
  getOrderById,
  updateOrderById,
  deleteOrderById,
  listOrders
};
