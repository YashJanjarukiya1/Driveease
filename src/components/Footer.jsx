import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube, ArrowRight } from "lucide-react";

const footerLinks = {
  Company: [
    { label: "About DriveEase", path: "/about" },
    { label: "Our Fleet", path: "/fleet" },
    { label: "Locations", path: "/locations" },
    { label: "Careers", path: "/about" },
    { label: "Press & Media", path: "/about" },
  ],
  Services: [
    { label: "Airport Pickup", path: "/booking" },
    { label: "Long-Term Rental", path: "/booking" },
    { label: "Business Rentals", path: "/booking" },
    { label: "Luxury Vehicles", path: "/fleet" },
    { label: "SUV & Trucks", path: "/fleet" },
  ],
  Support: [
    { label: "FAQ", path: "/contact" },
    { label: "Roadside Assistance", path: "/contact" },
    { label: "Cancellation Policy", path: "/contact" },
    { label: "Insurance Info", path: "/contact" },
    { label: "Contact Us", path: "/contact" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/5">
      {/* Newsletter strip */}
      <div className="bg-brand-red/10 border-b border-brand-red/20">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-heading text-xl font-700 uppercase tracking-wider text-white">
              Get exclusive deals in your inbox
            </h4>
            <p className="text-brand-silver text-sm mt-1">
              Weekly deals, new fleet arrivals & special promotions.
            </p>
          </div>
          <div className="flex gap-0 w-full md:w-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="input-field flex-1 md:w-72 px-4 py-3 text-sm rounded-l-sm"
            />
            <button className="btn-primary px-5 py-3 text-sm rounded-r-sm flex items-center gap-2">
              Subscribe <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 bg-brand-red flex items-center justify-center rounded-sm">
                <span className="font-display text-white text-lg leading-none">D</span>
              </div>
              <span className="font-display text-2xl text-white tracking-wider">
                DRIVE<span className="text-brand-red">EASE</span>
              </span>
            </Link>
            <p className="text-brand-silver text-sm leading-relaxed mb-6 max-w-xs">
              America's premier car rental service. From coast to coast, 
              we put the keys to freedom in your hands with transparent pricing and zero hidden fees.
            </p>
            <div className="space-y-3">
              <a href="tel:+18005550123" className="flex items-center gap-3 text-brand-silver hover:text-white text-sm transition-colors">
                <div className="w-8 h-8 rounded-sm bg-brand-steel flex items-center justify-center">
                  <Phone size={13} />
                </div>
                1-800-555-0123
              </a>
              <a href="mailto:hello@driveease.com" className="flex items-center gap-3 text-brand-silver hover:text-white text-sm transition-colors">
                <div className="w-8 h-8 rounded-sm bg-brand-steel flex items-center justify-center">
                  <Mail size={13} />
                </div>
                hello@driveease.com
              </a>
              <div className="flex items-center gap-3 text-brand-silver text-sm">
                <div className="w-8 h-8 rounded-sm bg-brand-steel flex items-center justify-center">
                  <MapPin size={13} />
                </div>
                500+ Locations Nationwide
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h5 className="font-heading text-sm uppercase tracking-widest text-white mb-5 font-700">
                {category}
              </h5>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-brand-silver hover:text-white text-sm transition-colors link-underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-brand-silver text-xs">
            © {new Date().getFullYear()} DriveEase, Inc. All rights reserved. |{" "}
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>{" "}
            |{" "}
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
          </p>
          <div className="flex items-center gap-4">
            {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-8 h-8 rounded-sm bg-brand-steel hover:bg-brand-red flex items-center justify-center transition-colors"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
