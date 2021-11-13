const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    category: { type: Schema.Types.ObjectId, ref: "categories" }, //link to categories
    name: { type: String, required: true },
    description: { type: String, required: true },
    detail: { type: String, required: true },
    image: [{ type: String }],
    price: { type: Number, required: true },
  },
  { timestamps: {} }
);

const productModel = model("products", productSchema);
module.exports = productModel;
