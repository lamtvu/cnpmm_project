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
        await customerModel.create({ ...user, password: SHA256(user.password).toString() });
        res.status(200).json({ msg: 'Success' });
    } catch {
        res.status(500).json({ msg: 'Internal Server Error' })
    }
}

const getInfo = async (req, res) => {
    const userId = req.userData._id;

    try {
        const user = await customerModel.findOne({_id: userId});
        res.status(200).json(user);
    } catch {
        res.status(500).json({ msg: 'Internal Server Error' });
    }
}

const getCustomers = async (req, res) => {
    const { searchString = '', page = 0, limit = 20 } = req.query;
    const temp = searchString.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(temp, 'i');
    const query = {
        $or: [{ name: { $regex: regex } },
        { email: { $regex: regex } }
        ]
    }

    try {
        const customers = await customerModel.find(searchString ? query : null)
            .sort({ createdAt: 1 }).skip(page * limit).limit(limit);
        res.status(200).json(customers);
    } catch {
        res.status(500).json({ msg: 'Internal Server Error' });
    }
}

module.exports = {
    register,
    getInfo,
    getCustomers
}
