const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["electronics", "tech", "clothes", "toys"],
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("products", productSchema);
