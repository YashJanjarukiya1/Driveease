import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, Phone, ChevronDown } from "lucide-react";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Our Fleet", path: "/fleet" },
  { label: "Locations", path: "/locations" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-brand-dark/95 backdrop-blur-xl shadow-2xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      {/* Top bar */}
      <div className="hidden md:flex items-center justify-between px-8 py-1.5 border-b border-white/5 bg-black/20">
        <p className="text-xs text-brand-silver font-body tracking-wide">
          🇺🇸 Serving All 50 States — Free Cancellation Up to 48 Hours
        </p>
        <div className="flex items-center gap-6 text-xs text-brand-silver">
          <a href="tel:+18005550123" className="flex items-center gap-1.5 hover:text-brand-red transition-colors">
            <Phone size={11} />
            1-800-555-0123
          </a>
          <span>|</span>
          <span>24/7 Roadside Assistance</span>
        </div>
      </div>

      {/* Main nav */}
      <nav className="flex items-center justify-between px-6 md:px-10 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-brand-red flex items-center justify-center rounded-sm group-hover:scale-105 transition-transform">
            <span className="font-display text-white text-xl leading-none">D</span>
          </div>
          <div>
            <span className="font-display text-2xl text-white tracking-wider">DRIVE</span>
            <span className="font-display text-2xl text-brand-red tracking-wider">EASE</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `font-heading font-600 text-sm uppercase tracking-widest link-underline transition-colors duration-200 ${
                    isActive ? "text-brand-red" : "text-brand-silver hover:text-white"
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => navigate("/booking")}
            className="btn-primary px-6 py-2.5 text-sm rounded-sm"
          >
            Book Now
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-400 overflow-hidden ${
          menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ background: "rgba(10,10,15,0.98)", backdropFilter: "blur(20px)" }}
      >
        <ul className="flex flex-col px-6 py-6 gap-5 border-t border-white/10">
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `font-heading text-lg uppercase tracking-widest ${
                    isActive ? "text-brand-red" : "text-brand-silver"
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
          <li>
            <button
              onClick={() => { navigate("/booking"); setMenuOpen(false); }}
              className="btn-primary w-full py-3 text-sm rounded-sm mt-2"
            >
              Book Now
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
