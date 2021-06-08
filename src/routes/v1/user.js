// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');
const { userController } = require('../../controllers');

const router = express.Router();

router.post('/', userController.createUserWithRole);
router.get('/customers', userController.listCustomers);
router.get('/:id', userController.listCustomerById);
router.post('/:id', userController.updateUserAdmin);
router.delete('/:id', userController.deleteUserAdmin);

module.exports = router;
