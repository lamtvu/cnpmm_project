const { Router } = require("express");
const productController = require("./../controllers/products.controller");
const productValidator = require("./../validators/products.validator");

const productRoute = Router();

productRoute.post(
  "/add",
  // productValidator.createProductValidator(),
  productController.createProduct
);
productRoute.delete("/delete/:id", productController.deleteProduct);
productRoute.put("/update/:id", productController.updateProduct);
productRoute.get("/get-all", productController.getProduct);
productRoute.get("/get-product/:id", productController.getProduct);
module.exports = productRoute;
