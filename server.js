require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

const attemptConnection = require("./src/config/db");
const productRoutes = require("./src/routes/product.route");

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

attemptConnection();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/product", productRoutes);

const port = process.env.PORT || 6969;
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
