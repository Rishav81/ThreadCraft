import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaArrowUp,
  FaChevronRight,
} from "react-icons/fa";

const Footer = () => {
  const shopLinks = [
    { label: "Men", path: "/men" },
    { label: "Women", path: "/women" },
    { label: "Kids", path: "/kids" },
    { label: "New Arrivals", path: "/new-Arrival" },
    { label: "Collections", path: "/collections" },
    { label: "Accessories", path: "/category/accessories" },
  ];

  const supportLinks = [
    { label: "Customer Support", path: "/customer-support" },
    { label: "Shipping Policy", path: "/customer-support#shipping" },
    { label: "Returns & Exchange", path: "/customer-support#returns" },
    { label: "FAQs", path: "/customer-support#faqs" },
    { label: "Order Tracking", path: "/orders" },
  ];
  const companyLinks = [
    {
      label: "About ThreadCraft",
      path: "/company#about",
    },
    {
      label: "Careers",
      path: "/company#careers",
    },
    {
      label: "Privacy Policy",
      path: "/company#privacy",
    },
    {
      label: "Terms & Conditions",
      path: "/company#terms",
    },
  ];

  const socialLinks = [
    {
      label: "Instagram",
      icon: <FaInstagram />,
      url: "#",
    },
    {
      label: "Facebook",
      icon: <FaFacebookF />,
      url: "#",
    },
    {
      label: "Twitter",
      icon: <FaTwitter />,
      url: "#",
    },
    {
      label: "YouTube",
      icon: <FaYoutube />,
      url: "#",
    },
  ];

  return (
    <footer className="bg-[#111111] text-white">
      {/* =========================
          MAIN FOOTER
      ========================== */}
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-16">
          {/* =========================
              BRAND
          ========================== */}
          <div className="lg:pr-8">
            <Link
              to="/"
              aria-label="ThreadCraft Home"
              className="inline-block text-3xl font-bold tracking-wide"
            >
              Thread
              <span className="text-[#C19A6B]">Craft</span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-gray-400">
              Premium clothing designed for modern lifestyles. Discover timeless
              fashion, quality fabrics, and effortless everyday style.
            </p>

            {/* Social Media */}
            <div className="mt-7 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  aria-label={`ThreadCraft on ${social.label}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 text-gray-400 transition-all duration-300 hover:-translate-y-1 hover:border-[#C19A6B] hover:text-[#C19A6B]"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* =========================
              SHOP
          ========================== */}
          <div>
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-[0.2em]">
              Shop
            </h3>

            <ul className="space-y-3">
              {shopLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className="group inline-flex items-center text-sm text-gray-400 transition-colors duration-300 hover:text-[#C19A6B]"
                  >
                    <span>{item.label}</span>

                    <FaChevronRight className="ml-2 h-2.5 w-2.5 -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* =========================
              CUSTOMER SUPPORT
          ========================== */}
          <div>
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-[0.2em]">
              Customer Support
            </h3>

            <ul className="space-y-3">
              {supportLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className="group inline-flex items-center text-sm text-gray-400 transition-colors duration-300 hover:text-[#C19A6B]"
                  >
                    <span>{item.label}</span>

                    <FaChevronRight className="ml-2 h-2.5 w-2.5 -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* =========================
              COMPANY
          ========================== */}
          <div>
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-[0.2em]">
              Company
            </h3>

            <ul className="space-y-3">
              {companyLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className="group inline-flex items-center text-sm text-gray-400 transition-colors duration-300 hover:text-[#C19A6B]"
                  >
                    <span>{item.label}</span>

                    <FaChevronRight className="ml-2 h-2.5 w-2.5 -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* =========================
          BOTTOM FOOTER
      ========================== */}
      <div className="border-t border-gray-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-6 sm:px-6 md:flex-row lg:px-8">
          {/* Copyright */}
          <p className="text-center text-xs text-gray-500 md:text-left">
            © 2026 ThreadCraft. All rights reserved.
          </p>

          {/* Tagline */}
          <p className="text-xs tracking-wide text-gray-500">
            Crafted with passion for modern fashion.
          </p>

          {/* Back To Top */}
          <button
            type="button"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            aria-label="Back to top"
            className="group flex items-center gap-2 text-xs uppercase tracking-widest text-gray-500 transition-colors duration-300 hover:text-[#C19A6B]"
          >
            Back to top
            <FaArrowUp className="transition-transform duration-300 group-hover:-translate-y-1" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
