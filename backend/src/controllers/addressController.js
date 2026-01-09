import User from "../models/User.js";

export const getAddresses = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    res.json(
      user.addresses.map((addr) => ({
        id: addr._id,
        name: addr.name,
        phone: addr.phone,
        street: addr.street,
        city: addr.city,
        state: addr.state,
        pincode: addr.pincode,
        type: addr.type,
      }))
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch addresses" });
  }
};

export const addAddress = async (req, res) => {
  try {
    const { name, phone, street, city, state, pincode, type } = req.body;

    if (!name || !phone || !street || !city || !state || !pincode) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findById(req.user._id);

    user.addresses.push({
      name,
      phone,
      street,
      city,
      state,
      pincode,
      type,
    });

    await user.save();

    res.status(201).json(
      user.addresses.map((addr) => ({
        id: addr._id,
        name: addr.name,
        phone: addr.phone,
        street: addr.street,
        city: addr.city,
        state: addr.state,
        pincode: addr.pincode,
        type: addr.type,
      }))
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add address" });
  }
};

export const updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, street, city, state, pincode, type } = req.body;

    const user = await User.findById(req.user._id);

    const address = user.addresses.id(id);

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    address.name = name ?? address.name;
    address.phone = phone ?? address.phone;
    address.street = street ?? address.street;
    address.city = city ?? address.city;
    address.state = state ?? address.state;
    address.pincode = pincode ?? address.pincode;
    address.type = type ?? address.type;

    await user.save();

    res.json(
      user.addresses.map((addr) => ({
        id: addr._id,
        name: addr.name,
        phone: addr.phone,
        street: addr.street,
        city: addr.city,
        state: addr.state,
        pincode: addr.pincode,
        type: addr.type,
      }))
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update address" });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(req.user._id);

    const address = user.addresses.id(id);

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    address.deleteOne();
    await user.save();

    res.json(
      user.addresses.map((addr) => ({
        id: addr._id,
        name: addr.name,
        phone: addr.phone,
        street: addr.street,
        city: addr.city,
        state: addr.state,
        pincode: addr.pincode,
        type: addr.type,
      }))
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete address" });
  }
};
