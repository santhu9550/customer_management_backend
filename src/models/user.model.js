/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose');
const searchable = require('mongoose-regex-search');
const timestamps = require('mongoose-timestamp');
// Create Schema
const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  name: {
    type: String,
    searchable: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  lastname: {
    type: String,
    required: true
  },
  address: {
    line1: {
      type: String
    },
    line2: String,
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    pincode: {
      type: String
    }
  },
  email: {
    type: String,
    required: true,
    searchable: true,
    unique: true
  },
  role: {
    type: String,
    enum: ['Manager', 'Agent', 'User Admin', 'Customer'],
    default: 'User Admin'
  },
  photo: {
    type: String
  },
  mobile: {
    type: String
  },
  orders: [
    {
      order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'orders'
      }
    }
  ]
});
userSchema.plugin(timestamps);

userSchema.plugin(searchable);
const User = mongoose.model('users', userSchema);

module.exports = User;
