const { body } = require("express-validator");

const createCategoryValidator = () => {
  return [body("name", "required name").notEmpty()];
};
module.exports = {
  createCategoryValidator,
};
