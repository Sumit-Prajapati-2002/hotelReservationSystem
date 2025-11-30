"use client";

import { useState } from "react";
import { Mail, Key, X } from "lucide-react"; // Changed icon from CreditCard to Key
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminLogin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BACKEND_URL; // ✅ Use environment backend URL
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Admin login API
      const res = await axios.post(
        `${BASE_URL}/admin/login`, // ✅ use URL variable
        formData,
        { withCredentials: true }
      );

      if (res.data.success) {
        navigate("/admin-dashboard"); // Redirect to admin dashboard
      } else {
        setError(res.data.message || "Login failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 px-4 py-12">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 transform hover:scale-105 transition-transform duration-300">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-r from-amber-600 to-orange-500 p-4 rounded-2xl mb-4 shadow-lg">
            <Mail size={32} className="text-white" />
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent mb-2 p-5">
            Admin Login
          </h2>
          <p className="text-gray-600">Sign in to manage the system</p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg animate-shake">
            <p className="text-red-700 flex items-center gap-2">
              <X size={20} /> {error}
            </p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="group">
            <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
              <Mail size={18} className="text-amber-600" /> Admin Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="admin@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-300 transition-all duration-300"
              required
            />
          </div>

          <div className="group">
            <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
              <Key size={18} className="text-amber-600" /> Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-300 transition-all duration-300"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-amber-600 transition-colors"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Forgot password?{" "}
            <button
              onClick={() => navigate("/admin-forgot-password")}
              className="text-amber-600 font-semibold hover:text-amber-700 transition-colors"
            >
              Reset here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
