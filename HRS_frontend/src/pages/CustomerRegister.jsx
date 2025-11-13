"use client";

import { useState } from "react";
import { Mail, CreditCard, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CustomerRegister() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone_no: "",
    password: "",
    guestCheckout: false,
    nationality: "",
    citizenship: "",
  });
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:3000/customer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Registration failed");

      navigate("/customer-login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 px-4 py-12">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTEsMTkxLDM2LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>

      <div className="relative bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md transform hover:scale-105 transition-transform duration-300">
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-r from-amber-600 to-orange-500 p-4 rounded-2xl mb-4 shadow-lg">
            <Mail size={32} className="text-white" />
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent mb-2">
            Create Account
          </h2>
          <p className="text-gray-600">Sign up to start your booking</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg animate-shake">
            <p className="text-red-700 flex items-center gap-2">
              <X size={20} />
              {error}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              value={formData.firstname}
              onChange={handleChange}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-amber-600 transition-all duration-300"
              required
            />
            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              value={formData.lastname}
              onChange={handleChange}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-amber-600 transition-all duration-300"
              required
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-amber-600 transition-all duration-300"
            required
          />

          <input
            type="tel"
            name="phone_no"
            placeholder="Phone Number"
            value={formData.phone_no}
            onChange={handleChange}
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-amber-600 transition-all duration-300"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-amber-600 transition-all duration-300"
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="nationality"
              placeholder="Nationality"
              value={formData.nationality}
              onChange={handleChange}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-amber-600 transition-all duration-300"
            />
            <input
              type="text"
              name="citizenship"
              placeholder="Citizenship Number"
              value={formData.citizenship}
              onChange={handleChange}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-amber-600 transition-all duration-300"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Registering...
              </span>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/customer-login")}
              className="text-amber-600 font-semibold hover:text-amber-700 transition-colors"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
