const orderModel = require("./../models/orders.model");
const discountModel = require("./../models/discounts.model");
const productModel = require("./../models/products.model");
const { validationResult } = require("express-validator");

const getMoneyDiscount = async (Orders) => {
  const data = await Promise.all(
    Orders.map(async (order) => {
      const discounts = await discountModel.find({ products: order.product });
      const totalDiscount = discounts.reduce((previousValue, currentValue) => {
        return previousValue + currentValue.value;
      }, 0);
      const product = await productModel.findById(order.product);
      return {
        product: order.product,
        count: order.count,
        discount: totalDiscount,
        price: (product.price - totalDiscount * product.price) * order.count,
      };
    })
  );
  return data;
};

const createOrder = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 400, ...errors });
  }
  const orders = await getMoneyDiscount(req.body.orders);
  console.log(orders);
  const newOrder = {
    customer: req.userData._id,
    address: req.body.address,
    orders: orders,
    receiver: req.body.receiver,
    phoneReceiver: req.body.phoneReceiver,
    status: 1,
    totalPrice: orders.reduce((previousValue, currentValue) => {
      return previousValue + currentValue.price;
    }, 0),
  };

  orderModel.create(newOrder, (err) => {
    if (err) {
      return res.status(400).json({ status: 400, errors: [{ msg: err }] });
    }
    return res.status(200).json({ status: 200, data: null });
  });
};

const calculatorOrderPrice = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 400, ...errors });
  }
  try {
    const { orders } = req.body;
    const orderPrices = await Promise.all(
      orders.map(async (order) => {
        const discounts = await discountModel.find({ products: order.product });

        const totalDiscount = discounts.reduce((previousValue, currentValue) => {
          return previousValue + currentValue.value;
        }, 0);
        const product = await productModel.findById(order.product);
        return {
          product: product,
          count: order.count,
          discount: totalDiscount,
          price: (product.price - totalDiscount * product.price) * order.count,
        };
      }))

    const data = {
      orders: orderPrices,
      totalPrice: orderPrices.reduce((previousValue, currentValue) => {
        return previousValue + currentValue.price;
      }, 0),
    }
    return res.status(200).json(data);
  } catch {
    return res.status(500).json({ msg: 'Internal Server Error' })
  }
}

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
  const orderId = req.params.id;

  await orderModel
    .updateOne({ _id: orderId }, req.body, {
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
};

const getOrders = async (req, res) => {
  try {
    const orderDetails = await orderModel.find().populate('orders.product').populate('customer');
    console.log(orderDetails)
    res.status(200).json(orderDetails)
  } catch (e) {
    console.log(e)
    res.status(500).send({ msg: "Internal Server Error" });
  }
}

const getMyOrders = async (req, res) => {
  const userId = req.userData._id;
  try {
    const orderDetails = await orderModel.find({ customer: userId }).populate('orders.product');
    res.status(200).json(orderDetails)
  } catch (e) {
    res.status(500).send({ msg: "Internal Server Error", e });
  }
}

module.exports = {
  createOrder,
  deleteOrder,
  updateOrder,
  getOrder,
  getOrders,
  getMyOrders,
  calculatorOrderPrice,
};
