import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  try {
    console.log("📦 Fetching products from MongoDB...");
    const products = await Product.find();
    console.log(`✅ Found ${products.length} products.`);
    res.json(products);
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const addProduct = async (req, res) => {
  try {
    console.log("📝 req.body received:", req.body); // Debug: print incoming data

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Request body is empty. Check Content-Type header." });
    }

    const product = new Product(req.body);
    const saved = await product.save();

    console.log("✅ Product saved to MongoDB:", saved._id);
    res.status(201).json({ message: "Product added successfully", product: saved });
  } catch (error) {
    console.error("❌ Error saving product:", error.message);
    res.status(500).json({ message: "Failed to save product", error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    console.log(`🗑️ Deleted product: ${req.params.id}`);
    res.json({ message: "Deleted" });
  } catch (error) {
    console.error("❌ Error deleting product:", error.message);
    res.status(500).json({ message: "Failed to delete product", error: error.message });
  }
};