const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
    name: { type: String, required: true }
}, { timestamps: {} });

const categoryModel = model('categories', categorySchema);

module.exports = categoryModel
