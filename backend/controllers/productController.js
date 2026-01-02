import Product from "../models/Product.js";

// @desc    Get all products (optionally filter by seller)
// @route   GET /api/products
// @access  Private (or Public depending on needs)
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Get logged in user's products
// @route   GET /api/products/my
export const getMyProducts = async (req, res) => {
    try {
        const products = await Product.find({ seller: req.user.id });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private (Farmer/Admin)
export const createProduct = async (req, res) => {
    const { name, description, category, images } = req.body;

    try {
        const product = new Product({
            name,
            description,
            category,
            seller: req.user.id,
            images: images || [],
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
