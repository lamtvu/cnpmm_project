const { Router } = require("express");
const orderController = require("./../controllers/orders.controller");
const authMiddleware = require("./../middlewares/auth.middleware");

const orderRoute = Router();

orderRoute.post(
  "/add",
  authMiddleware.verifyToken,
  orderController.createOrder
);
orderRoute.delete(
  "/delete/:id",
  authMiddleware.verifyToken,
  orderController.deleteOrder
);
orderRoute.put(
  "/update/:id",
  authMiddleware.verifyToken,
  orderController.updateOrder
);
orderRoute.get(
  "/get-all",
  authMiddleware.verifyToken,
  orderController.getOrders
);

orderRoute.get(
  "/my-orders",
  authMiddleware.verifyToken,
  orderController.getMyOrders
);
orderRoute.get(
  "/get-order/:id",
  authMiddleware.verifyToken,
  orderController.getOrder
);
orderRoute.post(
  '/calculator',
  orderController.calculatorOrderPrice
)


module.exports = orderRoute;
