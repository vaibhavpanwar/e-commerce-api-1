const express = require("express");
const router = express.Router();
const Category = require("../../models/Catgory");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

// @ route POST api/categories
// @desc   Register a category
// @access Public
router.post(
  "/",
  auth,
  [check("Name", "Please Add Name").not()],
  async (req, res) => {
    if (req.user.isAdmin === true) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { Name } = req.body;
      try {
        let category = await Category.findOne({ Name });
        if (category) {
          res.status(400).json({ msg: "Category Already Exists" });
        } else {
          category = new Category({
            Name
          });
        }
        const newCategory = await category.save();

        res.json(newCategory);
      } catch (error) {
        console.error(error.message);
        res.status(500).send("server error");
      }
    } else {
      res.send("No Admin Access");
    }
  }
);
// @ route Delete api/categories
// @desc   delete a category
// @access Auth Admin
router.delete(
  "/:id",
  auth,

  async (req, res) => {
    if (req.user.isAdmin === true) {
      try {
        let category = await Category.findOneAndDelete({ _id: req.params.id });
        if (!category) {
          res.status(400).json({ msg: "Category Does Not Exists" });
        }

        res.json("Category Deleted");
      } catch (error) {
        console.error(error.message);
        res.status(500).send("server error");
      }
    } else {
      res.send("No Admin Access");
    }
  }
);

// @ route Get api/categories
// @desc   List all categories
// @access Public
router.get(
  "/",

  async (req, res) => {
    try {
      let categories = await Category.find();
      if (!categories) {
        res.status(400).json({ msg: "Categories are empty" });
      }

      res.json(categories);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("server error");
    }
  }
);

module.exports = router;
