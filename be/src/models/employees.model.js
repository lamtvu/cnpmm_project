const { Schema, model } = require('mongoose');

const employeeSchema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true }
}, { timestamps: {} })

const employeeModel = model('employees', employeeSchema);
module.exports = employeeModel;
