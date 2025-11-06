export default function Footer({ scrollToSection }) {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold text-amber-500 mb-4">
              Serenity Hotel
            </h3>
            <p className="text-gray-400">Your home away from home.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button
                  onClick={() => scrollToSection("rooms")}
                  className="hover:text-amber-500 transition"
                >
                  Rooms
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("amenities")}
                  className="hover:text-amber-500 transition"
                >
                  Amenities
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("about")}
                  className="hover:text-amber-500 transition"
                >
                  About
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Policies</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-amber-500 transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-500 transition">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-500 transition">
                  Cancellation Policy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-amber-500 transition"
              >
                Facebook
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-amber-500 transition"
              >
                Instagram
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-amber-500 transition"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Serenity Hotel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
