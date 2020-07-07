const express = require("express");
const router = express.Router();
const Category = require("../../models/Catgory");
const Product = require("../../models/Product");
const auth = require("../../middleware/auth");

// @ route get api/categories/products
// @desc   view All Products
// @access Public
router.get(
  "/",

  async (req, res) => {
    try {
      let products = await Product.find();
      if (!products) {
        res.status(400).json({ msg: "No product Available" });
      }

      res.json(products);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("server error");
    }
  }
);

// @ route Delete api/categories/:product id
// @desc   delete a product
// @access Auth Admin
router.delete(
  "/:id",
  auth,

  async (req, res) => {
    if (req.user.isAdmin === true) {
      console.log(req.user);
      try {
        let product = await Product.findOneAndDelete({ _id: req.params.id });
        if (!product) {
          res.status(400).json({ msg: "Product Does Not Exists" });
        }

        res.json("Product Deleted");
      } catch (error) {
        console.error(error.message);
        res.status(500).send("server error");
      }
    } else {
      res.send("No admin Access");
      console.log(req.user);
    }
  }
);

// @ route Post api/categories/product/:categoryid
// @desc   Add Product to categoy
// @access Auth Admin

router.post("/:id", auth, async (req, res) => {
  if (req.user.isAdmin === true) {
    const { name, price, category, productImage } = req.body;

    try {
      var categ = await Category.findById(req.params.id);
      const id = categ.id;
      if (!categ) return res.status(404).json({ msg: "Category not valid" });

      const newProduct = new Product({
        category: id,
        name,
        price,
        productImage
      });
      const product = await newProduct.save();
      res.json(product);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  } else {
    res.send("No Admin Access");
  }
});

//@desc   :: View Products Category Wise
//@request:: Get /api/categories/:category_id
//privacy :: Public
router.get("/:id", async (req, res) => {
  try {
    var categ = await Category.findById(req.params.id);
    const id = categ.id;
    if (!categ)
      return res
        .status(404)
        .json({ msg: "No prodcuts in this category found" });
    else {
      const products = await Product.find({ category: id }).sort({
        date: -1
      });
      res.json(products);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     PUT api/categories/products/:category_id/:product_id
// @desc      Update contact
// @access    Private
router.put("/:c_id/:p_id", auth, async (req, res) => {
  if (req.user.isAdmin === true) {
    const { name, price, productImage } = req.body;

    // Build contact object
    const productFields = {};
    if (name) productFields.name = name;
    if (price) productFields.price = price;
    if (productImage) productFields.phone = productImage;

    try {
      let categ = await Category.findById(req.params.c_id);

      if (!categ) return res.status(404).json({ msg: "category not found" });

      let product = await Product.findById(req.params.p_id);

      product = await Product.findByIdAndUpdate(
        req.params.p_id,
        { $set: productFields },
        { new: true }
      );

      res.json(product);
    } catch (err) {
      console.error(er.message);
      res.status(500).send("Server Error");
    }
  } else {
    res.send("No Admin Access");
  }
});

module.exports = router;
