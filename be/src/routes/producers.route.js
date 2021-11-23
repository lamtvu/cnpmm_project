const { Router } = require("express");
const producerController = require("./../controllers/producers.controller");
const authMiddleware = require("./../middlewares/auth.middleware");
const producerRoute = Router();

producerRoute.post(
  "/add",
  authMiddleware.verifyToken,
  producerController.createProducer
);
producerRoute.delete("/delete/:producerId", producerController.deleteProducer);
producerRoute.put("/update/:producerId", producerController.updateProducer);
producerRoute.get("/get-all", producerController.getProducer);
producerRoute.get("/get-producer/:producerId", producerController.getProducer);

module.exports = producerRoute;
