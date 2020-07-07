const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const categorySchema = mongoose.Schema({
  Name: { type: String, required: true }
});

module.exports = mongoose.model("categories", categorySchema, "categories");
