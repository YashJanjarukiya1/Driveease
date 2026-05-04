import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star, Users, Zap, Fuel, Settings } from "lucide-react";

export default function CarCard({ car, featured = false }) {
  const navigate    = useNavigate();
  const [imgErr, setImgErr] = useState(false);

  return (
    <div
      className={`car-card glass-card rounded-sm overflow-hidden group cursor-pointer relative ${
        featured ? "ring-1 ring-brand-red/50" : ""
      }`}
      onClick={() => navigate("/booking")}
    >
      {/* Badges */}
      {car.badge && (
        <span className="badge-new absolute top-3 left-3 z-10 px-2.5 py-1 rounded-sm text-white">
          {car.badge}
        </span>
      )}
      {car.popular && (
        <span className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-sm text-white text-xs font-heading font-700 uppercase tracking-wider bg-amber-500">
          Popular
        </span>
      )}

      {/* ── Real car photo */}
      <div className="relative h-52 overflow-hidden bg-brand-steel">
        {car.image && !imgErr ? (
          <img
            src={car.image}
            alt={car.name}
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            onError={() => setImgErr(true)}
            loading="lazy"
          />
        ) : (
          /* Elegant fallback if image fails */
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-steel to-brand-navy">
            <span className="font-display text-6xl" style={{ color: car.color || "#E8261A", opacity: 0.4 }}>
              {car.name.charAt(0)}
            </span>
          </div>
        )}

        {/* Gradient overlay — always visible at bottom for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-transparent to-transparent" />

        {/* Category chip on photo */}
        <span className="absolute bottom-3 left-3 text-xs font-heading uppercase tracking-wider text-white/80 bg-black/40 backdrop-blur px-2.5 py-1 rounded-full">
          {car.category}
        </span>

        {/* Hover tint */}
        <div className="absolute inset-0 bg-brand-red/0 group-hover:bg-brand-red/8 transition-all duration-300" />
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-heading text-xl font-700 text-white tracking-wide leading-tight">
            {car.name}
          </h3>
          <div className="text-right flex-shrink-0 ml-3">
            <span className="font-display text-2xl text-brand-red">${car.pricePerDay}</span>
            <span className="text-brand-silver text-xs">/day</span>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={12}
              className={i < Math.floor(car.rating) ? "star-filled fill-current" : "text-gray-600"} />
          ))}
          <span className="text-brand-silver text-xs ml-1">
            {car.rating} ({car.reviews.toLocaleString()} reviews)
          </span>
        </div>

        {/* Specs grid */}
        <div className="grid grid-cols-4 gap-2 mb-5">
          {[
            { icon: Users,    label: `${car.seats} seats` },
            { icon: Settings, label: car.transmission },
            { icon: Fuel,     label: car.fuel },
            { icon: Zap,      label: car.mpg },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-1 bg-white/5 rounded-sm p-2">
              <Icon size={13} className="text-brand-red" />
              <span className="text-brand-silver text-xs text-center leading-tight">{label}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button className="btn-primary w-full py-3 text-sm rounded-sm">
          Book This Car
        </button>
      </div>
    </div>
  );
}
