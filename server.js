const express = require("express");
const app = express();
const mongoose = require("mongoose");
const connectDb = require("./config/db");

//Connect to database
connectDb();
//init middleware
app.use(express.json({ extended: false }));

//Define Routes
//user routes
app.use("/api/users", require("./routes/User/users"));
app.use("/api/auth", require("./routes/User/auth"));

//products and categories Routes
app.use(
  "/api/categories",
  require("./routes/CategoriesAndProducts/categories")
);
app.use(
  "/api/categories/products",
  require("./routes/CategoriesAndProducts/products")
);

//user cart routes
app.use("/api/user/cart", require("./routes/Cart/cart"));

//declaring PORT variable
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Started on ${PORT}`);
});
