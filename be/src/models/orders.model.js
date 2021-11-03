const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
    customer: { type: Schema.Types.ObjectId, ref: 'customers' }, // link to custormer
    product: { type: Schema.Types.ObjectId, ref: 'products', required: true }, // link to product
    count: { type: Number, required: true },
    address: { type: String, required: true },
    receiver: { type: String, required: true },
    phoneReceiver: { type: String, required: true },
    status: { type: Number, required: true, default: 0 },
    totalPrice: { type: Number, required: true }
}, { timestamps: {} })

const orderModel = model('orders', orderSchema);
module.exports = orderModel;