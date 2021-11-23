const { Router } = require("express");
const discountController = require("./../controllers/discounts.controller");
const authMiddleware = require("./../middlewares/auth.middleware");

const discountRoute = Router();

discountRoute.post(
  "/add",
  authMiddleware.verifyToken,
  discountController.createDiscount
);
discountRoute.delete(
  "/delete/:discountId",
  authMiddleware.verifyToken,
  discountController.deleteDiscount
);

discountRoute.put(
  "/update/:discountId",
  authMiddleware.verifyToken,
  discountController.updateDiscount
);

discountRoute.get(
  "/get-all",
  authMiddleware.verifyToken,
  discountController.getDiscount
);

discountRoute.get(
  "/get-discount/:id",
  authMiddleware.verifyToken,
  discountController.getDiscount
);
discountRoute.put(
  "/add-product/:id",
  authMiddleware.verifyToken,
  discountController.addProduct
);

module.exports = discountRoute;
