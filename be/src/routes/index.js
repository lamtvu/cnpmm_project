const authRoute = require("./auth.route.js");
const customerRoute = require("./customer.route.js");
const categoryRoute = require("./categories.route");
const productRoute = require("./products.route.js");
const orderRoute = require("./orders.route.js");
const producerRoute = require("./producers.route.js");
const discountRoute = require("./discounts.route.js");

const initRouter = (app) => {
  app.use("/api/auth", authRoute);
  app.use("/api/customer", customerRoute);
  app.use("/api/category", categoryRoute);
  app.use("/api/product", productRoute);
  app.use("/api/order", orderRoute);
  app.use("/api/producer", producerRoute);
  app.use("/api/discount", discountRoute);
};

module.exports = initRouter;
