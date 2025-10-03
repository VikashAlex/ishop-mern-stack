const { orderplace, orderSuccess, findOrder } = require('../controllers/order.controller');
const authMiddleware = require('../middleware/authmiddleware');

const orderRoutes = require('express').Router();

orderRoutes.post('/order-place',orderplace)
orderRoutes.post('/order-success',authMiddleware,orderSuccess)
orderRoutes.get('/order-find/:id',findOrder)

module.exports = orderRoutes;