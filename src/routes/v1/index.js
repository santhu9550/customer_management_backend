// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');
const passport = require('passport');
const userRoute = require('./user');
const orderRoute = require('./order');
const authRoute = require('./auth');

const router = express.Router();

router.use('/auth', authRoute);
router.use('/users', passport.authenticate('jwt', { session: false }), userRoute);
router.use('/orders', passport.authenticate('jwt', { session: false }), orderRoute);

module.exports = router;
