export default function Footer({ scrollToSection }) {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-amber-500 to-orange-400 bg-clip-text text-transparent mb-4">
              Serenity Hotel
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Your home away from home. Experience luxury and comfort like never
              before.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-5 text-lg text-amber-500">
              Quick Links
            </h4>
            <ul className="space-y-3 text-gray-400">
              {["rooms", "amenities", "about"].map((section) => (
                <li key={section}>
                  <button
                    onClick={() => scrollToSection(section)}
                    className="hover:text-amber-500 transition-colors hover:translate-x-1 inline-block transform duration-200"
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-5 text-lg text-amber-500">Policies</h4>
            <ul className="space-y-3 text-gray-400">
              {[
                "Privacy Policy",
                "Terms & Conditions",
                "Cancellation Policy",
              ].map((policy) => (
                <li key={policy}>
                  <a
                    href="#"
                    className="hover:text-amber-500 transition-colors hover:translate-x-1 inline-block transform duration-200"
                  >
                    {policy}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-5 text-lg text-amber-500">Follow Us</h4>
            <div className="flex space-x-4">
              {["Facebook", "Instagram", "Twitter"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-gray-400 hover:text-amber-500 transition-colors transform hover:scale-110 duration-200"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-400">
            &copy; 2025 Serenity Hotel. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
