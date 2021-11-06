const { Router } = require("express");
const orderController = require("./../controllers/orders.controller");

const orderRoute = Router();

orderRoute.post("/add", orderController.createOrder);
orderRoute.delete("/delete/:id", orderController.deleteOrder);
orderRoute.put("/update/:id", orderController.updateOrder);
orderRoute.get("/get-all", orderController.getOrder);
orderRoute.get("/get-order/:id", orderController.getOrder);

module.exports = orderRoute;
