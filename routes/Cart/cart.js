const express = require("express");
const router = express.Router();
const Cart = require("../../models/Cart");
const auth = require("../../middleware/auth");

// @route  get api/user/cart/:product_id
// @desc   Add product to cart
// @access user Auth

router.get("/:p_id", auth, async (req, res) => {
  try {
    var cart = await Cart.findOne({ user: req.user.id });
    console.log(req.user.id);

    let newproduct = {
      product: req.params.p_id
    };
    if (!cart) {
      let cart = new Cart({
        user: req.user.id
      });
      cart.products.unshift(newproduct);
      await cart.save();
      res.json(cart);
    } else {
      cart.products.unshift(newproduct);
      cart.save();
      res.json(cart);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  get api/user/cart
// @desc   Add product to cart
// @access user Auth

router.get("/", auth, async (req, res) => {
  try {
    var cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      let cart = new Cart({
        user: req.user.id
      });
      await cart.save();
      res.json(cart);
    } else {
      res.json(cart);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
