const { SHA256 } = require('crypto-js');
const customerModel = require('./../models/customers.model.js');
const employeeModel = require('./../models/employees.model.js');
const { generateToken } = require('./../services/jwt.service');

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        //employee
        const employee = await employeeModel.findOne({ username });
        if (!employee) {
            // custormer
            const customer = await customerModel.findOne({ email: username });

            if (!customer) return res.status(400).json({ msg: 'Invalid gmail' });
            if (customer.password != SHA256(password).toString()) return res.status(400).json({ msg: 'Invalid password' });

            const token = await generateToken({ _id: customer._id, role: 1 }, process.env.SECRET_KEY, process.env.TOKEN_LIFE);
            return res.status(200).json({ msg: 'Success', data: { token, role: 1 } });
        }

        if (employee.password != SHA256(password).toString()) return res.status(400).json({ msg: 'Invalid password' });
        
        const token = await generateToken({ _id: employee._id, role: 0 }, process.env.SECRET_KEY, process.env.TOKEN_LIFE);
        return res.status(200).json({ msg: 'Success', data: { token, role: 0 } });
    } catch {
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
}

module.exports = {
    login
}