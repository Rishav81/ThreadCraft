import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const shopLinks = [
    "Men",
    "Women",
    "New Arrivals",
    "Featured Collection",
    "Accessories",
  ];

  const supportLinks = [
    "Contact Us",
    "Shipping Policy",
    "Returns & Exchange",
    "FAQs",
    "Order Tracking",
  ];

  const companyLinks = [
    "About ThreadCraft",
    "Careers",
    "Privacy Policy",
    "Terms & Conditions",
  ];

  return (
    <footer className="bg-[#111111] text-white ">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Section */}
          <div>
            <h2 className="text-3xl font-bold tracking-wide">
              Thread<span className="text-[#C19A6B]">Craft</span>
            </h2>

            <p className="mt-5 text-sm leading-7 text-gray-400 max-w-xs">
              Premium clothing designed for modern lifestyles. Discover timeless
              fashion, quality fabrics, and effortless everyday style.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="h-10 w-10 flex items-center justify-center rounded-full border border-gray-700 hover:border-[#C19A6B] transition"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="h-10 w-10 flex items-center justify-center rounded-full border border-gray-700 hover:border-[#C19A6B] transition"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="h-10 w-10 flex items-center justify-center rounded-full border border-gray-700 hover:border-[#C19A6B] transition"
              >
                <FaTwitter />
              </a>

              <a
                href="#"
                className="h-10 w-10 flex items-center justify-center rounded-full border border-gray-700 hover:border-[#C19A6B] transition"
              >
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-lg font-semibold mb-5">Shop</h3>

            <ul className="space-y-3">
              {shopLinks.map((item) => (
                <li
                  key={item}
                  className="text-sm text-gray-400 hover:text-[#C19A6B] cursor-pointer transition"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-5">Customer Support</h3>

            <ul className="space-y-3">
              {supportLinks.map((item) => (
                <li
                  key={item}
                  className="text-sm text-gray-400 hover:text-[#C19A6B] cursor-pointer transition"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-5">Company</h3>

            <ul className="space-y-3">
              {companyLinks.map((item) => (
                <li
                  key={item}
                  className="text-sm text-gray-400 hover:text-[#C19A6B] cursor-pointer transition"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-sm text-gray-500 text-center">
            © 2026 ThreadCraft. All rights reserved.
          </p>

          <p className="text-sm text-gray-500">
            Crafted with passion for modern fashion.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
