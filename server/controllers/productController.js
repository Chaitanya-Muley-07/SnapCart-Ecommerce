const Product = require("../models/Product");
const { ROLES } = require("../utils/constants");
const cloudinary = require("../utils/cloudinary");

const createProduct = async (req, res) => {
  if (req.role !== ROLES.admin) {
    return res.status(403).json({ success: false, message: "Access Denied" });
  }

  try {
    const { name, price, description, stock, colors, category } = req.body;
    const uploadedImages = [];

    // Upload all images first
    for (const file in req.files) {
      const result = await cloudinary.uploader.upload(req.files[file].path, {
        folder: "products",
      });

      uploadedImages.push({
        url: result.secure_url,
        id: result.public_id,
      });
    }

    // Then create the product after uploading all images
    const product = new Product({
      name,
      price,
      description,
      stock,
      colors,
      category,
      images: uploadedImages,
    });

    await product.save();

    return res.status(201).json({
      success: true,
      message: "Product added successfully",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
const updateProduct = async (req, res) => {
  if (req.role !== ROLES.admin) {
    return res.status(403).json({ success: false, message: "Access Denied" });
  }
  try {
    const { ...data } = req.body;
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(id, data, { new: true });
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  if (req.role !== ROLES.admin) {
    return res.status(403).json({ success: false, message: "Access Denied" });
  }
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Product Deleted successfully",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
const getProducts = async (req, res) => {
  try {
    let { page, limit, category, price, search } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 9;
    //empty query object creation
    let query = {};
    // fields of query

    //category
   if (category && category.toLowerCase() !== "all") {
  query.category = category.toLowerCase();
}

    //search

    //     $regex: search
    // Tells MongoDB to match name fields using regular expressions.

    // If search = "phone", MongoDB looks for "phone" anywhere in the product name.

    // $options: 'i'
    // This makes the search case-insensitive.

    // So it matches "Phone", "phone", "PHONE", "PhoNe", etc.
    if (search) query.name = { $regex: search, $options: "i" };

    //price
    if (Number(price) > 0) query.price = { $lte: Number(price) };
   
    //fetching
    const totalProducts = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalProducts / limit);
    // skip for skipping the elements before the current page, limit is for remaining elements
    const products = await Product.find(query)
      .select("name price images rating description blacklisted")
      .skip((page - 1) * limit)
      .limit(limit);

    let newProductsArray = [];
    products.forEach((product) => {
      //Send a pure JSON response (without Mongoose overhead)
      const productObj = product.toObject();
      productObj.image = productObj.images[0];
      delete productObj.images;
      newProductsArray.push(productObj); //
    });
    if (!products.length) {
      return res
        .status(404)
        .json({ success: false, message: "No products found" });
    }
    return res.status(200).json({
      success: true,
      message: "Products fetched",
      data: newProductsArray,
      pagination: {
        totalProducts,
        totalPages,
        currentPage: page,
        pageSize: limit,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
const getProductByName = async (req, res) => {
  const { name } = req.params;

  try {
    const product = await Product.findOne({ name 
      :{
        $regex:new RegExp(name,"i"),
      }
    });

    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    return res
      .status(200)
      .json({ success: true, message: "Product found", data: product });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const blacklistProduct = async (req, res) => {
  if (req.role !== ROLES.admin) {
    return res.status(403).json({ success: false, message: "Access Denied" });
  }
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { blacklisted: true },
      { new: true }
    );

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: `The product ${product.name} is Blacklisted`, data: product });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
const removeFromBlacklist = async (req, res) => {
  if (req.role !== ROLES.admin) {
    return res.status(403).json({ success: false, message: "Access Denied" });
  }

  const { id } = req.params;

  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { blacklisted: false },
      { new: true }
    );

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    return res.status(200).json({
      success: true,
      message: `The product ${product.name} is removed from blacklist`,
      data: product,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductByName,
  blacklistProduct,
  removeFromBlacklist,
  getProducts,
};
