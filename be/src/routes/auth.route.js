const { Router } = require('express');
const authController = require('../controllers/auth.controller');
const authValidator = require('../validators/auth.validator');

const authRoute = Router();

authRoute.post('/login', authValidator.loginValidator(), authController.login);

module.exports = authRoute;