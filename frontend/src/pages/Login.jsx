import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setIsAuthenticated(true);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold text-gray-900">Welcome Back</h2>
          <p className="text-sm text-gray-500 mt-1">
            Login to continue shopping
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
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
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3A8A]"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#1F3A8A] text-white py-3 rounded-lg font-semibold hover:bg-[#1E40AF] transition"
          >
            Login
          </button>
        </form>

        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-sm text-gray-500">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <div className="space-y-3">
          <button className="w-full border py-3 rounded-lg hover:bg-gray-50 font-medium">
            Continue with Google
          </button>

          <button className="w-full border py-3 rounded-lg hover:bg-gray-50 font-medium">
            Continue with Phone
          </button>
        </div>

        <p className="text-sm text-center text-gray-600 mt-8">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-[#1F3A8A] font-semibold">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
