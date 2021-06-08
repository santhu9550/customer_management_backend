// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');
const { orderController } = require('../../controllers');
// const validate = require('../../middlewares/validate');
// const userValidation = require('../../validations/user.validation');

const router = express.Router();

router.post('/', orderController.createOrder);
router.get('/', orderController.listOrders);
router.post('/:id', orderController.updateOrder);
router.delete('/:id', orderController.deleteOrder);

module.exports = router;
