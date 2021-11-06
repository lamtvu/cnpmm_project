const { body } = require("express-validator");

const createProductValidator = () => {
  return [
    body("name").withMessage("required name").notEmpty().bail(),
    body("description").withMessage("required description").notEmpty().bail(),
    body("detail").withMessage("required detail").notEmpty().bail(),
    body("image").withMessage("required image").notEmpty().bail(),
    body("price").withMessage("required price").notEmpty().bail(),
  ];
};
module.exports = {
  createProductValidator,
};
