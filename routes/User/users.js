const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const config = require("config");
const { check, validationResult } = require("express-validator");

// @ route POST api/users
// @desc   Register a new User
// @access Public
router.post(
  "/",
  [
    check("fullName", "Please Add Name")
      .not()
      .isEmpty(),
    check("email", "Please Enter a valid Email").isEmail(),
    check("mobileNumber", "Please Add Mobile Number")
      .not()
      .isEmpty(),
    check(
      "password",
      "Please Enter a Password With 6 or more Characters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { fullName, email, password, mobileNumber } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        res.status(400).json({ msg: "User Already Exists" });
      }
      user = new User({
        fullName,
        email,
        password,

        mobileNumber
      });
      //encrypting password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      //json web token for login
      const payload = {
        user: {
          id: user.id
        }
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("server error");
    }
  }
);

module.exports = router;
