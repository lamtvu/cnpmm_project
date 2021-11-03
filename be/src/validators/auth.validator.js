const { body } = require("express-validator");

const loginValidator = () => {
    return [
        body('username', 'required username').notEmpty(),
        body('phoneNumber', 'required username').notEmpty(),
    ]
}
module.exports = {
    loginValidator
}
