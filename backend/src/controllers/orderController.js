import Order from "../models/Order.js";
import User from "../models/User.js";

export const placeOrder = async (req, res) => {
  try {
    const { addressId, paymentMethod } = req.body;

    if (!addressId || !paymentMethod) {
      return res
        .status(400)
        .json({ message: "Address and payment method are required" });
    }

    // get user with populated cart
    const user = await User.findById(req.user._id).populate("cart.product");

    // Validate cart
    if (!user.cart || user.cart.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // find selected address
    const address = user.addresses.id(addressId);
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    // build order items snapshot
    const items = user.cart.map((item) => ({
      productId: item.product._id,
      title: item.product.title,
      price: item.product.price,
      image: item.product.images[0],
      quantity: item.quantity,
    }));

    // build shipping address snapshot
    const shippingAddress = {
      name: address.name,
      phone: address.phone,
      street: address.street,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      type: address.type,
    };

    // create order
    const order = await Order.create({
      user: req.user._id,
      items,
      shippingAddress,
      paymentMethod,
    });

    // clear cart
    user.cart = [];
    await user.save();

    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to place order" });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort("-createdAt");

    const formattedOrders = orders.map((order) => ({
      id: order._id,
      createdAt: order.createdAt,
      status: order.status,
      totalItems: order.items.reduce((sum, item) => sum + item.quantity, 0),
      totalAmount: order.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
    }));

    res.json(formattedOrders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({
      id: order._id,
      createdAt: order.createdAt,
      status: order.status,
      paymentMethod: order.paymentMethod,
      items: order.items,
      shippingAddress: order.shippingAddress,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch order" });
  }
};
