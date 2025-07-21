import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json({ success: true, products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, message: "Error fetching products" });
  }
};

// Get single product by ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
    });

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, product });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ success: false, message: "Error fetching product" });
  }
};

// Create new product (admin only)
export const createProduct = async (req, res) => {
  try {
    const { name, image, price, category } = req.body;

    // Validate required fields
    if (!name || !image || !price || !category) {
      return res.status(400).json({
        success: false,
        message: "Name, image, price, and category are required",
      });
    }

    // Validate price is a positive number
    if (typeof price !== "number" || price <= 0) {
      return res.status(400).json({
        success: false,
        message: "Price must be a positive number",
      });
    }

    const product = await prisma.product.create({
      data: {
        name,
        image,
        price,
        category,
      },
    });

    res.status(201).json({ success: true, product });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ success: false, message: "Error creating product" });
  }
};

// Update product (admin only)
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, price, category } = req.body;

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Validate price if provided
    if (price !== undefined && (typeof price !== "number" || price <= 0)) {
      return res.status(400).json({
        success: false,
        message: "Price must be a positive number",
      });
    }

    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        name: name || existingProduct.name,
        image: image || existingProduct.image,
        price: price || existingProduct.price,
        category: category || existingProduct.category,
      },
    });

    res.json({ success: true, product: updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ success: false, message: "Error updating product" });
  }
};

// Delete product (admin only)
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Check if product is in any cart
    const cartItems = await prisma.cartItem.findMany({
      where: { productId: parseInt(id) },
    });

    if (cartItems.length > 0) {
      // Delete cart items first
      await prisma.cartItem.deleteMany({
        where: { productId: parseInt(id) },
      });
    }

    await prisma.product.delete({
      where: { id: parseInt(id) },
    });

    res.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ success: false, message: "Error deleting product" });
  }
}; 