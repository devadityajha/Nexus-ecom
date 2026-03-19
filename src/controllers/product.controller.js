const productschema = require("../models/product.model");

const createProduct = async (req, res) => {
  const { title, category } = req.body;
  if (!title || !category || !req.file) {
    return res
      .status(400)
      .json({ message: "All fields are mandatory", success: false });
  }

  const productData = await productschema.create({
    title,
    category,
    fileUrl: req.file.path,
  });

  return res.status(201).json({ data: productData });
};

const getProduct = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const safePage = Math.max(page, 1);
  const search = req.query.search || "";
  const category = req.query.category || "";
  const sort = req.query.sort || "newest";
  const limit = 10;
  const skip = (safePage - 1) * limit;

  const query = {};
  const totalCounts = await productschema.countDocuments(query);

  if (search) {
    query.title = { $regex: search, $options: "i" };
  }

  if (category) {
    const categriesList = category.split(",").map((item) => item.trim());
    query.category = { $in: categriesList };
  }

  let sortby = {};

  if (sort === "newest") {
    sortby = { createdAt: -1 };
  } else if (sort === "oldest") {
    sortby = { createdAt: 1 };
  } else if (sort === "a to z") {
    sortby = { title: 1 };
  } else if (sort === "z to a") {
    sortby = { title: -1 };
  } else {
    sortby = { createdAt: -1 };
  }

  const productdata = await productschema
    .find(query)
    .sort(sortby)
    .skip(skip)
    .limit(limit);

  return res.json({
    page: safePage,
    totalPages: Math.ceil(totalCounts / limit),
    totalCounts,
    data: productdata,
    success: true,
  });
};

module.exports = { createProduct, getProduct };
