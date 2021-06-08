/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose');
const searchable = require('mongoose-regex-search');
const timestamps = require('mongoose-timestamp');
// Create Schema
const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    searchable: true,
    required: true
  },
  status: {
    type: String,
    enum: ['Completed', 'Pending'],
    default: 'Pending'
  },
  amount: {
    type: String
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }
});
orderSchema.plugin(timestamps);

orderSchema.plugin(searchable);
const Order = mongoose.model('orders', orderSchema);

module.exports = Order;
