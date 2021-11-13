const { Schema, model } = require("mongoose");

const producerSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: {} }
);

const producerModel = model("producers", producerSchema);

module.exports = producerModel;
