const { Router } = require("express");
const customerController = require('./../controllers/customer.controller.js');
const customerValidator = require('./../validators/customer.validator.js');

const customerRoute = Router();
customerRoute.post('/register', customerValidator.registerValidator(), customerController.register)

module.exports = customerRoute;
