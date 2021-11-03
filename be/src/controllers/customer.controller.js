const { validationResult } = require("express-validator");
const { SHA256 } = require('crypto-js');
const customerModel = require("../models/customers.model.js");

const register = async (req, res) => {
    const user = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        await customerModel.create({ ...user, password: SHA256(user.password).toString()});
        res.status(200).json({ msg: 'Success' });
    } catch {
        res.status(500).json({ msg: 'Internal Server Error' })
    }
}

module.exports = {
    register
}
