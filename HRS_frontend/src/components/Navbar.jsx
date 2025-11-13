import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Navbar({ scrollToSection }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  const sections = [
    "home",
    "rooms",
    "amenities",
    "testimonials",
    "faq",
    "about",
    "contact",
  ];

  // ✅ Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:3000/customer/me", {
          withCredentials: true,
        });
        setIsAuthenticated(res.data.success === true);
      } catch (err) {
        setIsAuthenticated(false);
        if (err.response?.status !== 401) {
          console.error("Auth check failed:", err);
        }
      }
    };
    checkAuth();
  }, []);

  // ✅ Logout function
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/customer/logout",
        {},
        { withCredentials: true }
      );
      setIsAuthenticated(false);
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  // ✅ Scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (section) => {
    if (scrollToSection) scrollToSection(section);
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-lg py-2"
          : "bg-white/95 backdrop-blur-md shadow-sm py-3"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <div
            onClick={() => navigate("/")}
            className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent cursor-pointer hover:scale-105 transition-transform"
          >
            Serenity Hotel
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {sections.map((s) => (
              <button
                key={s}
                onClick={() => handleClick(s)}
                className="relative text-gray-700 hover:text-amber-600 transition-colors font-medium group"
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-600 group-hover:w-full transition-all duration-300"></span>
              </button>
            ))}

            {/* Auth Buttons */}
            {!isAuthenticated ? (
              <div className="flex items-center space-x-3 ml-4">
                <button
                  onClick={() => navigate("/customer-login")}
                  className="bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600 text-white px-6 py-2.5 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/customer-register")}
                  className="border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white px-6 py-2.5 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  Register
                </button>
              </div>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-2.5 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {mobileMenuOpen ? (
              <X size={24} className="text-gray-800" />
            ) : (
              <Menu size={24} className="text-gray-800" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg animate-slideDown">
          <div className="px-4 py-4 space-y-3">
            {sections.map((s) => (
              <button
                key={s}
                onClick={() => handleClick(s)}
                className="block w-full text-left text-gray-700 hover:text-amber-600 hover:bg-amber-50 px-4 py-3 rounded-lg transition-colors font-medium"
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}

            {/* Auth buttons for mobile */}
            {!isAuthenticated ? (
              <div className="space-y-2 pt-4 border-t">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate("/customer-login");
                  }}
                  className="block w-full bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600 text-white py-3 rounded-lg font-semibold transition-all shadow-md"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate("/customer-register");
                  }}
                  className="block w-full border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white py-3 rounded-lg font-semibold transition-all"
                >
                  Register
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="block w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-3 rounded-lg font-semibold transition-all shadow-md mt-4 border-t pt-4"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
