const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { verifyToken } = require('../middleware/authMiddleware');

// Any authenticated user (Visitor) can buy
router.post('/', verifyToken, orderController.placeOrder);

module.exports = router;
