const discountModel = require("./../models/discounts.model");
const { validationResult } = require("express-validator");
const productModel = require("../models/products.model");
const monogose = require("mongoose");

const addProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 400, ...errors });
  }
  const discountId = req.params.id;
  try {
    await productModel.updateMany({ _id: { $in: req.body.products } }, { discount: discountId });
    return res.status(200).json({ status: 200, data: null });
  } catch (err) {
    return res.status(500);
  }
};

const removeProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 400, ...errors });
  }
  try {
    await productModel.updateOne({ _id: req.query.productId }, { $unset: { discount: 1 } });
    return res.status(200).json({ status: 200, data: null });
  } catch (err) {
    return res.status(500);
  }
};

const createDiscount = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 400, ...errors });
  }
  const newDiscount = {
    value: req.body.value,
    endDate: req.body.endDate,
  };

  try {
    const discount = await discountModel.insertMany(newDiscount);
    await productModel.updateMany({ _id: { $in: req.body.products } }, { discount: discount[0]._id });
    res.status(200).json({ msg: 'success' });
  } catch (err) {
    res.status(500).json({ msg: 'Internal Server Error' });
  }
};

const deleteDiscount = async (req, res) => {
  const discountId = req.params.discountId;
  try {
    const discount = await discountModel.findOneAndDelete({ _id: discountId });
    await productModel.updateMany({ discount: discount._id }, { discount: null });
    res.status(200).json({ msg: 'success' });
  } catch {
    res.status(500).json({ msg: 'Internal Server Error' });
  }
};

const updateDiscount = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ msg: "Data to update can not empty" });
  }
  const discountId = req.params.discountId;

  discountModel
    .updateOne({ _id: discountId }, req.body, {
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

const getDiscounts = async (req, res) => {
  try {
    const discounts = await discountModel.find();
    res.status(200).json(discounts);
  } catch (err) {
    res.status(500).json({ msg: 'Internal Server Error' });
  }
};

const getDiscount = async (req, res) => {
  try {
    const discounts = await discountModel.findById(req.params.id);
    res.status(200).json(discounts);
  } catch (err) {
    res.status(500).json({ msg: 'Internal Server Error' });
  }
};

const getProducts = async (req, res) => {
  const { id } = req.params;
  const { page, limit, searchString } = req.query;

  const searchValue = searchString.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(searchValue, "i");
  const idQuery = /^[a-f\d]{24}$/i.test(searchValue) ? searchString : undefined;

  const ptemp = parseInt(page);
  const ltemp = parseInt(limit);

  try {
    const items = await productModel.aggregate()
      .match({
        $and: [
          { discount: monogose.Types.ObjectId(id) },
          {
            $or: [
              { _id: idQuery },
              { name: { $regex: regex } },
            ]
          }
        ]
      })
      .facet({
        count: [{ $count: 'count' }],
        results: [{ $skip: ptemp * ltemp }, { $limit: ltemp }]
      })
      .addFields({
        count: { $arrayElemAt: ['$count.count', 0] }
      })
    res.status(200).json(items[0]);
  } catch (e) {
    res.status(500).json({ msg: 'Internal Server Error' });
  }
}



module.exports = {
  createDiscount,
  deleteDiscount,
  updateDiscount,
  getDiscounts,
  getDiscount,
  addProduct,
  removeProduct,
  getProducts,
};
