const cartRoutes = require('express').Router();
const { moveToDb, addToCart } = require('../controllers/cart.controller');

cartRoutes.post('/snyc',moveToDb);
cartRoutes.post('/add-to-cart',addToCart);

module.exports = cartRoutes;
