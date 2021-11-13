const productModel = require("./../models/products.model");
const { validationResult } = require("express-validator");
const { uploadImage } = require("../services/uploadimage.service");

const createProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 400, ...errors });
  }
  if (req.files["Image"] != null) {
    var addImage = req.files["Image"][0];
    const urlImage = await uploadImage(addImage.filename, "upload/");
    const newProduct = {
      category: req.body.category,
      name: req.body.name,
      description: req.body.description,
      detail: req.body.detail,
      image: urlImage,
      price: req.body.price,
    };
    await productModel.create(newProduct, (err) => {
      if (err) {
        return res.status(400).json({ status: 400, errors: [{ msg: err }] });
      }
      return res.status(200).json({ status: 200, data: null });
    });
  }
};

const deleteProduct = async (req, res) => {
  const productId = req.params.productId;
  await productModel.deleteOne(productId, (err) => {
    if (err) {
      return res.status(400).json({ status: 400, errors: [{ msg: err }] });
    }
    return res.status(200).json({ status: 200, data: null });
  });
  await productModel.updateMany({ _id: productId });
};
const updateProduct = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({ msg: "Data to update can not empty" });
  }
  const productId = req.params.productId;

  await productModel
    .updateOne(productId, req.body, {
      useFindAndModify: false,
    })
    .then((data) => {
      if (!data) {
        res.status(400).send({ msg: "Cannot update product" });
      } else {
        res.status(200).send({ msg: "Update successful !!!" });
      }
    })
    .catch((err) => {
      res.status(500).send({ msg: "Error update" });
    });
};

const getProduct = (req, res) => {
  if (req.params.id) {
    productModel
      .findById(req.params.id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ msg: "Not found category" });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res
          .status(500)
          .send({ msg: "Error retriving data with id: " + req.params.id });
      });
  } else {
    productModel
      .find()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res
          .status(500)
          .send({ msg: err.message || "Error occurred while retriving data" });
      });
  }
};
// const getCategoryById = async (req, res) => {
//   const categoryId = req.params.categoryId;
//   await categoryModel
//     .findById(categoryId)
//     .then((data) => {
//       if (!data) {
//         res.status(404).send({ msg: "Not found category" });
//       } else {
//         res.send(data);
//       }
//     })
//     .catch((err) => {
//       res
//         .status(500)
//         .send({ msg: "Error retriving data with id: " + categoryId });
//     });
// };

module.exports = {
  createProduct,
  deleteProduct,
  updateProduct,
  getProduct,
};
