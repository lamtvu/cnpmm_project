const { body } = require("express-validator");
const customerModel = require("../models/customers.model.js");

const registerValidator = () => {
    return [
        body('email')
            .notEmpty().withMessage('required email').bail()
            .isEmail().withMessage('invalid email').bail()
            .custom(value => {
                return customerModel.findOne({ email: value }).then(customer => {
                    if (customer) Promise.reject('E-mail already in use')
                })
            }),
        body('phoneNumber')
            .notEmpty().withMessage('required phoneNumber').bail()
            .isMobilePhone().withMessage('invalid phoneNumber').bail(),
        body('name')
            .notEmpty().withMessage('required name').bail(),
        body('password')
            .notEmpty().withMessage('required password').bail()
            .isLength({ min: 8 }).withMessage('The min password length is 8').bail()
    ]
}

module.exports = {
    registerValidator
}