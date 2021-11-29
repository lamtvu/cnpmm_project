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
        const user = await customerModel.findOne({ _id: userId });
        res.status(200).json(user);
    } catch {
        res.status(500).json({ msg: 'Internal Server Error' });
    }
}

const changeInfor = async (req, res) => {
    const userId = req.userData._id;
    const { address, name, phoneNumber } = req.body;
    try {
        const user = await customerModel.findOneAndUpdate({ _id: userId },
            { address, name, phoneNumber }, { new: true });
        res.status(200).json(user);
    } catch {
        res.status(500).json({ msg: 'Internal Server Error' });
    }
}

const changePassword = async (req, res) => {
    const userId = req.userData._id;
    const { password, oldPassword } = req.body;

    if (!password) {
        return res.status(400).json({ msg: 'required password' });
    }
    if (!oldPassword) {
        return res.status(400).json({ msg: 'required password' });
    }
    try {
        const userTemp = await customerModel.findById(req.userData._id);
        if (userTemp.password !== SHA256(oldPassword).toString()) {
            return res.status(400).json({ msg: 'invalid old password' });
        }
        const user = await customerModel.findOneAndUpdate({ _id: userId }, { password: SHA256(password).toString() });
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

    const ptemp = parseInt(page);
    const ltemp = parseInt(limit);
    try {
        const customers = await customerModel
            .aggregate()
            .match(query)
            .facet({
                count: [{ $count: 'count' }],
                results: [{ $skip: ltemp * ptemp }, { $limit: ltemp }]
            })
            .addFields({
                count: { $arrayElemAt: ['$count.count', 0] }
            })
        res.status(200).json(customers[0]);
    } catch(e) {
        res.status(500).json({ msg: 'Internal Server Error' });
    }
}

module.exports = {
    register,
    getInfo,
    getCustomers,
    changeInfor,
    changePassword
}
