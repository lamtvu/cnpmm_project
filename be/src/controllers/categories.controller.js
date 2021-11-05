const categoryModel = require("./../models/categories.model");
const { validationResult } = require("express-validator");

const createCategory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 400, ...errors });
  }
  const newCategory = new categoryModel({
    name: req.body.name,
  });
  await categoryModel.create(newCategory, (err) => {
    if (err) {
      return res.status(400).json({ status: 400, errors: [{ msg: err }] });
    }
    return res.status(200).json({ status: 200, data: null });
  });
};

const deleteCategory = async (req, res) => {
  const categoryId = req.params.categoryId;
  await categoryModel.deleteOne(categoryId, (err) => {
    if (err) {
      return res.status(400).json({ status: 400, errors: [{ msg: err }] });
    }
    return res.status(200).json({ status: 200, data: null });
  });
  await categoryModel.updateMany({ _id: categoryId });
};
const updateCategory = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({ msg: "Data to update can not empty" });
  }
  const categoryId = req.params.categoryId;

  await categoryModel
    .updateOne(categoryId, req.body, {
      useFindAndModify: false,
    })
    .then((data) => {
      if (!data) {
        res.status(400).send({ msg: "Cannot update category" });
      } else {
        res.status(200).send({ msg: "Update successful !!!" });
      }
    })
    .catch((err) => {
      res.status(500).send({ msg: "Error update" });
    });
};

const getCategory = (req, res) => {
  if (req.params.id) {
    categoryModel
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
          .send({ msg: "Error retriving data with id: " + categoryId });
      });
  } else {
    categoryModel
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
  createCategory,
  deleteCategory,
  updateCategory,
  getCategory,
};
