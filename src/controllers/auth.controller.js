/* eslint-disable import/no-unresolved */
const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userService = require('../services/userService');
const catchAsync = require('../utils/catchAsync');
const ac = require('../validations/accessControl');

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.getUserByEmail(email);
  if (!user) {
    return res.status(404).json('Invalid Email Address');
  }
  bcrypt.compare(password, user.password).then((isMatch) => {
    if (isMatch) {
      // User matched
      // Create JWT Payload
      const payload = { id: user.id, name: user.name };
      // Sign token{ expiresIn: '30m' }
      jwt.sign(payload, process.env.SECRET, { expiresIn: '30m' }, (err, token) => {
        if (err) {
          return res.json(err.message);
        }
        res.json({ success: true, id: user.id, token: `Bearer ${token}` });
      });
    } else {
      return res.status(400).json('Invalid Credentials..');
    }
  });
});

const profile = catchAsync(async (req, res) => {
  return res.status(200).json(req.user);
});

module.exports = {
  login,
  profile
};
