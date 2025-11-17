import { useState, useEffect } from "react";
import { Menu, X, NotebookText, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function Navbar({ scrollToSection }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [username, setUsername] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const sections = [
    "home",
    "rooms",
    "amenities",
    "testimonials",
    "faq",
    "about",
    "contact",
  ];

  // ✔ Check if logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:3000/customer/me", {
          withCredentials: true,
        });

        if (res.data.success && res.data.customer) {
          setIsAuthenticated(true);
          setUsername(res.data.customer.fullname);
        }
      } catch {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  // ✔ Logout
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/customer/logout",
        {},
        { withCredentials: true }
      );
      setIsAuthenticated(false);
      setDropdownOpen(false);
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  // ✔ Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✔ Scroll or Navigate
  const handleClick = (section) => {
    setMobileMenuOpen(false);
    if (isHomePage && scrollToSection) {
      scrollToSection(section);
    } else {
      navigate(`/?scroll=${section}`);
    }
  };

  // ✔ First initial of username
  const initial = username ? username.charAt(0).toUpperCase() : "U";

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
            className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent cursor-pointer"
          >
            Serenity Hotel
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {isHomePage &&
              sections.map((s) => (
                <button
                  key={s}
                  onClick={() => handleClick(s)}
                  className="relative text-gray-700 hover:text-amber-600 transition-colors font-medium group"
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-600 group-hover:w-full transition-all duration-300"></span>
                </button>
              ))}

            {/* IF LOGGED IN → AVATAR DROPDOWN */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-10 h-10 bg-amber-600 text-white rounded-full flex items-center justify-center font-bold cursor-pointer"
                >
                  {initial}
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-44 bg-white shadow-lg border rounded-lg py-2">
                    <button
                      onClick={() => {
                        navigate("/booking-history");
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-amber-50 flex items-center gap-2"
                    >
                      <NotebookText size={18} />
                      Booking History
                    </button>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button
                  onClick={() => navigate("/customer-login")}
                  className="bg-gradient-to-r from-amber-600 to-orange-500 text-white px-6 py-2.5 rounded-full"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/customer-register")}
                  className="border-2 border-amber-600 text-amber-600 px-6 py-2.5 rounded-full"
                >
                  Register
                </button>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="px-4 py-4 space-y-3">
            {/* Sections */}
            {isHomePage &&
              sections.map((s) => (
                <button
                  key={s}
                  onClick={() => handleClick(s)}
                  className="block w-full text-left text-gray-700 hover:text-amber-600 hover:bg-amber-50 px-4 py-3 rounded-lg"
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}

            {isAuthenticated && (
              <>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate("/booking-history");
                  }}
                  className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-amber-50"
                >
                  <NotebookText size={20} />
                  Booking History
                </button>

                <button
                  onClick={handleLogout}
                  className="block w-full bg-red-500 text-white py-3 rounded-lg"
                >
                  Logout
                </button>
              </>
            )}

            {!isAuthenticated && (
              <>
                <button
                  onClick={() => navigate("/customer-login")}
                  className="block w-full bg-amber-600 text-white py-3 rounded-lg"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/customer-register")}
                  className="block w-full border border-amber-600 text-amber-600 py-3 rounded-lg"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
