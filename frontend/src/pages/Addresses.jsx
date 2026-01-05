import React, { useState } from "react";

const Addresses = ({
  addresses,
  setAddresses,
  handleAddAddress,
  handleChange,
  formData,
  setFormData,
  editingAddress,
  setEditingAddress,
}) => {
  const handleEditClick = (address) => {
    setEditingAddress(address);
    setFormData(address);
  };

  const handleDeleteAddress = (id) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));
  };

  return (
    <div className="max-2-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">My Addresses</h2>

      {/* Address List */}
      <div className="space-y-4">
        {addresses.length === 0 && (
          <p className="text-gray-500">No addresses added yet.</p>
        )}

        {addresses.map((address) => (
          <div
            key={address.id}
            className="border rounded-lg p-4 bg-white shadow-sm"
          >
            <p className="font-semibold">{address.name}</p>
            <p className="text-sm text-gray-600">
              {address.street}, {address.city}, {address.state} -{" "}
              {address.pincode}
            </p>
            <p className="text-sm text-gray-600">Phone: {address.phone}</p>
            <span className="text-xs bg-gray-200 px-2 py-1 rounded">
              {address.type}
            </span>

            <div className="flex gap-4 mt-2 text-sm">
              <button
                onClick={() => handleEditClick(address)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteAddress(address.id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* form */}
      <form
        onSubmit={handleAddAddress}
        className="mt-8 bg-white p-6 rounded-lg shadow-sm space-y-4"
      >
        <h3 className="text-lg font-semibold">
          {editingAddress ? "Edit Address" : "Add New Address"}
        </h3>

        <input
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />

        <input
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />

        <input
          name="street"
          placeholder="Street Address"
          value={formData.street}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="border px-4 py-2 rounded"
            required
          />

          <input
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            className="border px-4 py-2 rounded"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            name="pincode"
            placeholder="Pincode"
            value={formData.pincode}
            onChange={handleChange}
            className="border px-4 py-2 rounded"
            required
          />

          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="border px-4 py-2 rounded"
          >
            <option>Home</option>
            <option>Work</option>
          </select>
        </div>

        <button className="bg-[#1F3A8A] text-white px-6 py-2 rounded hover:bg-[#1E40AF]" >
          {editingAddress ? "Update Address" : "Save Address"}
        </button>
      </form>
    </div>
  );
};

export default Addresses;
