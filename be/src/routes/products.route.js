const { Router } = require("express");
const productController = require("./../controllers/products.controller");
const productValidator = require("./../validators/products.validator");
const authMiddleware = require("./../middlewares/auth.middleware");
var multer = require("multer");
const path = require("path");
const productRoute = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname +
        "-" +
        Date.now() +
        Math.floor(Math.random() * 100) +
        path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });
var cpUpload = upload.fields([{ name: "image", maxCount: 100 }]);

productRoute.post(
  "/add",
  cpUpload,
  authMiddleware.verifyToken,
  productController.createProduct
);
productRoute.delete("/delete/:productId", productController.deleteProduct);
productRoute.put(
  "/update/:productId",
  cpUpload,
  productController.updateProduct
);
productRoute.get("/get-all", productController.getProduct);
productRoute.post("/get", productController.getProducts);
productRoute.post("/get-by-ids", productController.getByIds);
productRoute.get("/search", productController.searchProducts);
productRoute.get("/get-product/:id", productController.getProduct);
module.exports = productRoute;
