const { Router } = require("express");
const categoryController = require("./../controllers/categories.controller");
const categoryValidator = require("./../validators/categories.validator");
const authMiddleWare = require("./../middlewares/auth.middleware");

const categoryRoute = Router();
categoryRoute.post(
  "/add",
  // authMiddleWare.verifyToken,
  categoryValidator.createCategoryValidator(),
  categoryController.createCategory
);
categoryRoute.delete("/delete/:id", categoryController.deleteCategory);
categoryRoute.put(
  "/update/:id",
  categoryValidator.createCategoryValidator(),
  categoryController.updateCategory
);
categoryRoute.get("/get-category", categoryController.getCategory);
categoryRoute.get("/get-category/:id", categoryController.getCategory);
module.exports = categoryRoute;
