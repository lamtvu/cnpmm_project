const discountModel = require("./../models/discounts.model");
const { validationResult } = require("express-validator");

const addProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ status: 400, ...errors });
  }
  const discountId = req.params.id;
  try {
    await discountModel.updateOne(
      { _id: discountId },
      {
        $push: { products: req.body.product },
      }
    );
    return res.status(200).json({ status: 200, data: null });
  } catch (err) {
    return res.status(500);
  }
};

const createDiscount = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 400, ...errors });
  }
  const newDiscount = {
    products: req.body.products,
    value: req.body.value,
    endDate: req.body.endDate,
  };
  discountModel.create(newDiscount, (err) => {
    if (err) {
      return res.status(400).json({ status: 400, errors: [{ msg: err }] });
    }
    return res.status(200).json({ status: 200, data: null });
  });
};

const deleteDiscount = (req, res) => {
  const discountId = req.params.discountId;
  discountModel.deleteOne(discountId, (err) => {
    if (err) {
      return res.status(400).json({ status: 400, errors: [{ msg: err }] });
    }
    return res.status(200).json({ status: 200, data: null });
  });
};
const updateDiscount = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ msg: "Data to update can not empty" });
  }
  const discountId = req.params.discountId;

  discountModel
    .updateOne(discountId, req.body, {
      useFindAndModify: false,
    })
    .then((data) => {
      if (!data) {
        res.status(400).send({ msg: "Cannot update discount" });
      } else {
        res.status(200).send({ msg: "Update successful !!!" });
      }
    })
    .catch((err) => {
      res.status(500).send({ msg: "Error update" });
    });
};

const getDiscount = (req, res) => {
  if (req.params.id) {
    discountModel
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
    discountModel
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

module.exports = {
  createDiscount,
  deleteDiscount,
  updateDiscount,
  getDiscount,
  addProduct,
};
