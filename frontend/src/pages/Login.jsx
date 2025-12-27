import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-sm w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form className="space-y-4" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3A8A]"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3A8A]"
          />
          <button
            type="submit"
            className="w-full bg-[#1F3A8A] text-white py-3 rounded-lg hover:bg-[#1E40AF] transition"
          >
            Login
          </button>
        </form>

        <div className="mt-6 space-y-3">
          <button className="w-full border py-3 rounded-lg hover:bg-gray-50">
            Continue with Google
          </button>
          <button className="w-full border py-3 rounded-lg hover:bg-gray-50">
            Continue with Phone
          </button>

          <p className="text-sm text-center text-gray-600 mt-6">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#1F3A8A] font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
