const { Schema, model } = require("mongoose");

const discountSchema = new Schema(
  {
    products: [{ type: Schema.Types.ObjectId, ref: "products" }],
    value: { type: Number, required: true },
    endDate: { type: Number, required: true },
  },
  { timestamps: {} }
);

const discountModel = model("discounts", discountSchema);
module.exports = discountModel;
