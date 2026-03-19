const express = require("express");
const app = express.Router();
const {
  getProduct,
  createProduct,
} = require("../controllers/product.controller");
const fileValidation = require("../middleware/fileValidation.middleware");
const upload = require("../middleware/multer.middleware");

app.post(
  "/createproduct",
  upload.single("image"),
  fileValidation,
  createProduct,
);
app.get("/getproduct", getProduct);

module.exports = app;
