// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');
const passport = require('passport');
const { authController } = require('../../controllers');
// const validate = require('../../middlewares/validate');
// const userValidation = require('../../validations/user.validation');
const router = express.Router();

router.post('/', authController.login);
router.get('/', passport.authenticate('jwt', { session: false }), authController.profile);

module.exports = router;
