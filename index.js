const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 4000;
const multer = require("multer");
const cookieParser = require("cookie-parser");
const fs = require("fs");
app.use(express.static(__dirname + "/"));
app.use(cookieParser());

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Angler_360_Backend API is  working" });
});

//Loop of allowed origins
const allowedOrigins = [
  "http://localhost:3001",
  "http://localhost:3000",
  "http://localhost:4000",
  "http://192.168.1.104:3000",
  "http://192.168.1.104:3000/login",
  "https://angler-360-frontend-dashboard.vercel.app/",
  "*",
];

//CORS policy access
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

const connectDB = require("./config/database");
connectDB();

app.use("/api/getuser", require("./routes/user_register"));

// singup API
app.use("/api/signup", require("./routes/user_register"));

// login api
app.use("/api/login", require("./routes/login"));

// logout api
app.use("/api/logout", require("./routes/logout"));

// Profile req and res
app.use("/api/profile", require("./Profile/Userprofile"));

// route for product categories
app.use("/api/productcategories", require("./routes/Product_Category"));

// route for  products
app.use("/api/products", require("./routes/Product"));

// route for orders
app.use("/api/orders", require("./routes/Orders"));

// route for cart
app.use("/api/cart", require("./routes/Cart"));
// image upload

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:4000`);
});
