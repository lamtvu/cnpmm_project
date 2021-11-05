const authRoute = require("./auth.route.js");
const customerRoute = require("./customer.route.js");
const categoryRoute = require("./categories.route");

const initRouter = (app) => {
  app.use("/api/auth", authRoute);
  app.use("/api/customer", customerRoute);
  app.use("/api/category", categoryRoute);
};

module.exports = initRouter;
