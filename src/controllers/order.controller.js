/* eslint-disable import/no-unresolved */
const httpStatus = require('http-status');
const orderService = require('../services/orderService');
const catchAsync = require('../utils/catchAsync');
const ac = require('../validations/accessControl');
const { addOrderToUser } = require('../services/userService');

const createOrder = catchAsync(async (req, res) => {
  const order = await orderService.createOrder(req.body);
  const user = await addOrderToUser(req.body.user, order._id);
  return res.status(httpStatus.CREATED).json(order);
});

const listOrders = catchAsync(async (req, res) => {
  const orders = await orderService.listOrders();
  return res.status(httpStatus.OK).json(orders);
});

const updateOrder = catchAsync(async (req, res) => {
  const order = await orderService.updateOrderById(req.params.id, req.body);
  return res.status(httpStatus.OK).json(order);
});

const deleteOrder = catchAsync(async (req, res) => {
  const order = await orderService.deleteOrderById(req.params.id);
  return res.status(httpStatus.OK).json(order);
});

module.exports = {
  createOrder,
  listOrders,
  updateOrder,
  deleteOrder
};
