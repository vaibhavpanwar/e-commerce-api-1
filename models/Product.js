const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId, ref: "categories" },
  productImage: { type: String }
});

module.exports = mongoose.model("product", productSchema);
