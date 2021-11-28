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

discountRoute.delete(
  "/remove-product",
  authMiddleware.verifyToken,
  discountController.removeProduct
);

discountRoute.put(
  "/update/:discountId",
  authMiddleware.verifyToken,
  discountController.updateDiscount
);

discountRoute.get(
  "/get-all",
  authMiddleware.verifyToken,
  discountController.getDiscounts
);

discountRoute.get(
  "/get-products/:id",
  authMiddleware.verifyToken,
  discountController.getProducts
);

discountRoute.get(
  '/get-discount/:id',
  authMiddleware.verifyToken,
  discountController.getDiscount
)

discountRoute.put(
  "/add-products/:id",
  authMiddleware.verifyToken,
  discountController.addProduct
);

module.exports = discountRoute;
