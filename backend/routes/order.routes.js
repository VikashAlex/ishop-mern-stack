const { orderplace, orderSuccess } = require('../controllers/order.controller');
const authMiddleware = require('../middleware/authmiddleware');

const orderRoutes = require('express').Router();

orderRoutes.post('/order-place',orderplace)
orderRoutes.post('/order-success',authMiddleware,orderSuccess)

module.exports = orderRoutes;