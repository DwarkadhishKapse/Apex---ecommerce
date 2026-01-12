import Product from "../models/Product.js";

// GET /api/products
export const getProducts = async (req, res) => {
  try {
    const { search, category, minRating } = req.query;
    const query = {};

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    if (category) {
      query.category = category.toLowerCase();
    }

    if (minRating) {
      query.rating = { $gte: Number(minRating) };
    }

    const products = await Product.find(query).sort({ createdAt: -1 });

    res.json(
      products.map((p) => ({
        id: p._id,
        title: p.title,
        price: p.price,
        category: p.category,
        description: p.description,
        image: p.images[0],
        rating: p.rating,
        reviews: p.reviewsCount,
      }))
    );
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

// GET /api/products/:id
export const getProductById = async (req, res) => {
  try {
    const p = await Product.findById(req.params.id);

    if (!p) return res.status(404).json({ message: "Product not found" });

    res.json({
      id: p._id,
      title: p.title,
      price: p.price,
      category: p.category,
      description: p.description,
      images: p.images,
      rating: p.rating,
      reviews: p.reviewsCount,
    });
  } catch {
    res.status(400).json({ message: "Invalid product ID" });
  }
};
