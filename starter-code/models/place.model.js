const { Schema, model } = require("mongoose");

const placeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["coffee shop", "bookstore"],
      required: true,
    },
    location: { type: { type: String }, coordinates: [Number] }
  },
  {
    timestamps: true,
  }
);

module.exports = model("Place", placeSchema);