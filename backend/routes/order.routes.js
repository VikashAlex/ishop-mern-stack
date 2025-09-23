const { orderplace } = require('../controllers/order.controller');

const orderRoutes = require('express').Router();

orderRoutes.post('/order-place',orderplace)

module.exports = orderRoutes;