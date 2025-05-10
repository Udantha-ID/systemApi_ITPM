const Product = require('../models/ProductModel');
const path = require('path');
const fs = require('fs');

// @desc    Create a new product
// @route   POST /api/products
// @access  Public (you can change this as needed)

// Helper function to handle file upload
const uploadImage = (file) => {
  if (!file) return '';
  
  const uploadDir = path.join(__dirname, '../../public/uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
  const ext = path.extname(file.originalname);
  const filename = `product-${uniqueSuffix}${ext}`;
  const filepath = path.join(uploadDir, filename);

  fs.writeFileSync(filepath, file.buffer);
  return `/uploads/${filename}`;
};

// Create product with image upload
const createProduct = async (req, res) => {
  try {
    const { name, category, price, stock, threshold, description } = req.body;
    const imageUrl = req.file ? uploadImage(req.file) : '';

    const product = new Product({
      name,
      category,
      price,
      stock,
      threshold,
      imageUrl,
      description
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({
      message: 'Product creation failed',
      error: error.message
    });
  }
};

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching products',
      error: error.message
    });
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching product',
      error: error.message
    });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Public (adjust as needed)
// Update product with optional image update
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Delete old image if new one is uploaded
    if (req.file && product.imageUrl) {
      const oldImagePath = path.join(__dirname, '../../public', product.imageUrl);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    product.name = req.body.name || product.name;
    product.category = req.body.category || product.category;
    product.price = req.body.price || product.price;
    product.stock = req.body.stock || product.stock;
    product.threshold = req.body.threshold || product.threshold;
    product.description = req.body.description || product.description;
    product.imageUrl = req.file ? uploadImage(req.file) : product.imageUrl;
    product.lastUpdated = Date.now();

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({
      message: 'Product update failed',
      error: error.message
    });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Public (adjust as needed)
// Delete product with image cleanup
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Delete associated image
    if (product.imageUrl) {
      const imagePath = path.join(__dirname, '../../public', product.imageUrl);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    res.json({ message: 'Product removed successfully' });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting product',
      error: error.message
    });
  }
};


// @desc    Get products by category
// @route   GET /api/products/category/:category
// @access  Public
const getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category });
    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching products by category',
      error: error.message
    });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByCategory
};