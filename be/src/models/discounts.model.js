const { Schema, model } = require("mongoose");

const discountSchema = new Schema(
  {
    value: { type: Number, required: true },
    endDate: { type: Number, required: true },
  },
  { timestamps: {} }
);

const discountModel = model("discounts", discountSchema);
module.exports = discountModel;
