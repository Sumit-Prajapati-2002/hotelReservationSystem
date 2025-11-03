import { useState } from "react";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  scrollToSection: (id: string) => void;
}

export default function Navbar({ scrollToSection }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleClick = (section: string) => {
    scrollToSection(section);
    setMobileMenuOpen(false);
  };

  const sections = [
    "home",
    "rooms",
    "amenities",
    "testimonials",
    "faq",
    "about",
    "contact",
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="text-2xl font-bold text-amber-600">
            Serenity Hotel
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {sections.map((s) => (
              <button
                key={s}
                onClick={() => scrollToSection(s)}
                className="text-gray-700 hover:text-amber-600 transition"
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-3 space-y-3">
            {sections.map((s) => (
              <button
                key={s}
                onClick={() => handleClick(s)}
                className="block w-full text-left text-gray-700 hover:text-amber-600"
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
