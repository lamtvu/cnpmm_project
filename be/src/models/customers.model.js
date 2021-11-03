const { Schema, model } = require('mongoose');

const customerSchema = new Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true }
}, { timestamps: {} })

const customerModel = model('custormers', customerSchema);
module.exports = customerModel;

