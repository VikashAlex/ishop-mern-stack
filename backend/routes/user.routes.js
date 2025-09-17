const userRoutes = require('express').Router();
const { login,register } = require('../controllers/user.controller');

userRoutes.post('/create',register);
userRoutes.post('/login',login);

module.exports = userRoutes;
