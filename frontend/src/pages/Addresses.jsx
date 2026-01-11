import React, { useEffect } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

const Addresses = ({
  addresses,
  setAddresses,
  formData,
  setFormData,
  editingAddress,
  setEditingAddress,
}) => {
  useEffect(() => {
    api
      .get("/addresses")
      .then((res) => setAddresses(res.data))
      .catch(() => toast.error("Failed to load addresses"));
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      pincode: "",
      type: "Home",
    });
    setEditingAddress(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingAddress) {
        const res = await api.put(`/addresses/${editingAddress._id}`, formData);
        setAddresses(res.data);
        toast.success("Address updated");
      } else {
        const res = await api.post("/addresses", formData);
        setAddresses(res.data);
        toast.success("Address added");
      }

      resetForm();
    } catch (error) {
      toast.error("Failed to save address");
    }
  };

  const handleEdit = (address) => {
    setEditingAddress(address);
    setFormData({
      name: address.name,
      phone: address.phone,
      street: address.street,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      type: address.type,
    });
  };

  const handleDelete = async (id) => {
    try {
      const res = await api.delete(`/addresses/${id}`);
      setAddresses(res.data);
      toast.success("Address deleted");
    } catch {
      toast.error("Failed to delete address");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold mb-6">My Addresses</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl border p-6 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <input
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="border px-4 py-3 rounded-lg"
        />

        <input
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="border px-4 py-3 rounded-lg"
        />

        <input
          name="street"
          placeholder="Street"
          value={formData.street}
          onChange={handleChange}
          required
          className="border px-4 py-3 rounded-lg md:col-span-2"
        />

        <input
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          required
          className="border px-4 py-3 rounded-lg"
        />

        <input
          name="state"
          placeholder="State"
          value={formData.state}
          onChange={handleChange}
          required
          className="border px-4 py-3 rounded-lg"
        />

        <input
          name="pincode"
          placeholder="Pincode"
          value={formData.pincode}
          onChange={handleChange}
          required
          className="border px-4 py-3 rounded-lg"
        />

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="border px-4 py-3 rounded-lg"
        >
          <option value="Home">Home</option>
          <option value="Work">Work</option>
        </select>

        <button
          type="submit"
          className="md:col-span-2 bg-[#6d5dfc] text-white py-3 rounded-xl font-medium hover:opacity-90"
        >
          {editingAddress ? "Update Address" : "Add Address"}
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((address) => (
          <div key={address._id} className="bg-white rounded-2xl border p-5">
            <p className="font-medium">{address.name}</p>
            <p className="text-sm text-gray-600">
              {address.street}, {address.city}, {address.state} -{" "}
              {address.pincode}
            </p>
            <p className="text-sm text-gray-600">Phone: {address.phone}</p>

            <div className="flex gap-4 mt-4">
              <button
                onClick={() => handleEdit(address)}
                className="text-sm text-blue-600 hover:underline"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(address._id)}
                className="text-sm text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Addresses;
