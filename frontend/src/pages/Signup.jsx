import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";

const Signup = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState(""); // UI-only (not sent)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault(); // 🔥 REQUIRED

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/signup", {
        email,
        password, // ✅ match backend exactly
      });

      localStorage.setItem("token", res.data.token);
      setIsAuthenticated(true);

      toast.success("Account created successfully");
      navigate("/");
    } catch (error) {
      console.error("Signup failed:", error);

      const message =
        error.response?.data?.message || "Signup failed";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold text-gray-900">
            Create Account
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Sign up to start shopping
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3A8A]"
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3A8A]"
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3A8A]"
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3A8A]"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#1F3A8A] text-white hover:bg-[#1E40AF]"
            }`}
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-8">
          Already have an account?{" "}
          <Link to="/login" className="text-[#1F3A8A] font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
