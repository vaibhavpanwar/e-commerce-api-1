const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: "categories", required: true },
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "products"
      }
    }
  ]
});
module.exports = mongoose.model("cart", CartSchema, "cart");
