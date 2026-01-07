import Product from "../models/Product.js";

//?GET   /api/products
export const getProducts = async (req, res) => {
  try {
    const { search, category, minRating } = req.query;

    const query = {};

    // Search by title
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    // filter by category
    if (category) {
      query.category = category.toLowerCase();
    }

    // filter by rating
    if (minRating) {
      query.rating = { $gte: Number(minRating) };
    }

    const products = await Product.find(query).sort({ createdAt: -1});

    //* Shape response for frontend
    const formattedProducts = products.map((product) => ({
      id: product._id,
      title: product.title,
      price: product.price,
      category:
        product.category.charAt(0).toUpperCase() + product.category.slice(1),
      description: product.description,
      image: product.images[0],
      rating: product.rating,
      reviews: product.reviewsCount,
    }));

    res.json(formattedProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

//?GET   /api/products/:id
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      id: product._id,
      title: product.title,
      price: product.price,
      category:
        product.category.charAt(0).toUpperCase() + product.category.slice(1),
      description: product.description,
      images: product.images,
      rating: product.rating,
      reviews: product.reviewsCount,
    });
  } catch (error) {
    res.status(400).json({ message: "Invalid product ID" });
  }
};
