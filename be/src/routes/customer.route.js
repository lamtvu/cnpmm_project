const { Router } = require("express");
const customerController = require("./../controllers/customer.controller.js");
const customerValidator = require("./../validators/customer.validator.js");
const authMiddleware = require('./../middlewares/auth.middleware');

const customerRoute = Router();

customerRoute.post(
  "/register",
  customerValidator.registerValidator(),
  customerController.register
);

customerRoute.get('/info',
  authMiddleware.verifyToken,
  customerController.getInfo);

customerRoute.get('/',
  authMiddleware.verifyToken,
  customerController.getCustomers);

module.exports = customerRoute;
