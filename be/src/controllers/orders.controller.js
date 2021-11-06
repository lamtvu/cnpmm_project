const orderModel = require("./../models/orders.model");
const { validationResult } = require("express-validator");

const createOrder = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 400, ...errors });
  }
  const newOrder = new orderModel({
    customer: req.body.customer,
    product: req.body.product,
    count: req.body.count,
    address: req.body.address,
    receiver: req.body.receiver,
    phoneReceiver: req.body.phoneReceiver,
    status: req.body.status,
    totalPrice: req.body.totalPrice,
  });
  await orderModel.create(newOrder, (err) => {
    if (err) {
      return res.status(400).json({ status: 400, errors: [{ msg: err }] });
    }
    return res.status(200).json({ status: 200, data: null });
  });
};

const deleteOrder = async (req, res) => {
  const orderId = req.params.orderId;
  await orderModel.deleteOne(orderId, (err) => {
    if (err) {
      return res.status(400).json({ status: 400, errors: [{ msg: err }] });
    }
    return res.status(200).json({ status: 200, data: null });
  });
  await orderModel.updateMany({ _id: orderId });
};
const updateOrder = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({ msg: "Data to update can not empty" });
  }
  const orderId = req.params.orderId;

  await orderModel
    .updateOne(orderId, req.body, {
      useFindAndModify: false,
    })
    .then((data) => {
      if (!data) {
        res.status(400).send({ msg: "Cannot update order" });
      } else {
        res.status(200).send({ msg: "Update successful !!!" });
      }
    })
    .catch((err) => {
      res.status(500).send({ msg: "Error update" });
    });
};

const getOrder = (req, res) => {
  if (req.params.id) {
    orderModel
      .findById(req.params.id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ msg: "Not found order" });
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
    orderModel
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
  createOrder,
  deleteOrder,
  updateOrder,
  getOrder,
};
