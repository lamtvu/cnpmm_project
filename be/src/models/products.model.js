const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    category: { type: Schema.Types.ObjectId, ref: "categories" },
    producer: { type: Schema.Types.ObjectId, ref: "producers" },
    name: { type: String, required: true },
    description: { type: String, required: true },
    detail: { type: String, required: true },
    image: [{ type: String }],
    price: { type: Number, required: true },
    discount: { type: Schema.Types.ObjectId, ref: "discounts" },
  },
  { timestamps: {} }
);

const productModel = model("products", productSchema);
module.exports = productModel;
